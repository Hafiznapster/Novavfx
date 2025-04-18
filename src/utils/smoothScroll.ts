/**
 * Utility functions for smooth scrolling
 */

/**
 * Smoothly scrolls to a specific element on the page
 * @param elementId - The ID of the element to scroll to
 * @param offset - Optional offset from the top of the element (default: 0)
 * @param duration - Duration of the scroll animation in milliseconds (default: 800)
 */
export const scrollToElement = (elementId: string, offset = 0, duration = 800): void => {
  const element = document.getElementById(elementId);
  if (!element) return;

  const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
  const offsetPosition = elementPosition - offset;
  
  scrollTo({
    top: offsetPosition,
    behavior: 'smooth',
    duration
  });
};

/**
 * Enhanced scrollTo function with custom duration
 * @param options - ScrollToOptions with added duration parameter
 */
interface EnhancedScrollToOptions extends ScrollToOptions {
  duration?: number;
}

export const scrollTo = (options: EnhancedScrollToOptions): void => {
  const { top, left, behavior = 'smooth', duration = 800 } = options;
  
  if (behavior === 'smooth' && duration) {
    const startTime = performance.now();
    const startTop = window.pageYOffset;
    const startLeft = window.pageXOffset;
    const targetTop = top !== undefined ? top : startTop;
    const targetLeft = left !== undefined ? left : startLeft;
    const distanceTop = targetTop - startTop;
    const distanceLeft = targetLeft - startLeft;
    
    const easeInOutCubic = (t: number): number => {
      return t < 0.5
        ? 4 * t * t * t
        : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
    };
    
    const animation = (currentTime: number) => {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      const easeProgress = easeInOutCubic(progress);
      
      window.scrollTo(
        startLeft + distanceLeft * easeProgress,
        startTop + distanceTop * easeProgress
      );
      
      if (progress < 1) {
        requestAnimationFrame(animation);
      }
    };
    
    requestAnimationFrame(animation);
  } else {
    window.scrollTo({ top, left, behavior });
  }
};

/**
 * Initialize smooth scrolling for all anchor links
 * @param offset - Optional offset from the top of the target element (default: 0)
 * @param duration - Duration of the scroll animation in milliseconds (default: 800)
 */
export const initSmoothScrolling = (offset = 0, duration = 800): void => {
  document.addEventListener('click', (event) => {
    const target = event.target as HTMLElement;
    const anchor = target.closest('a[href^="#"]') as HTMLAnchorElement;
    
    if (anchor) {
      const targetId = anchor.getAttribute('href')?.substring(1);
      if (targetId) {
        event.preventDefault();
        scrollToElement(targetId, offset, duration);
      }
    }
  });
};
