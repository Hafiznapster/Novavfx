import anime from 'animejs';

export const fadeInElements = (elements: string, delay: number = 0) => {
  return anime({
    targets: elements,
    opacity: [0, 1],
    translateY: [20, 0],
    duration: 800,
    delay: anime.stagger(100, { start: delay }),
    easing: 'easeOutExpo'
  });
};

export const scaleElements = (elements: string, delay: number = 0) => {
  return anime({
    targets: elements,
    scale: [0.9, 1],
    opacity: [0, 1],
    duration: 800,
    delay: anime.stagger(100, { start: delay }),
    easing: 'easeOutExpo'
  });
};

export const slideInElements = (elements: string, direction: 'left' | 'right', delay: number = 0) => {
  const translateX = direction === 'left' ? [-100, 0] : [100, 0];
  return anime({
    targets: elements,
    translateX,
    opacity: [0, 1],
    duration: 800,
    delay: anime.stagger(100, { start: delay }),
    easing: 'easeOutExpo'
  });
};

export const revealText = (elements: string, delay: number = 0) => {
  return anime({
    targets: elements,
    opacity: [0, 1],
    duration: 1200,
    delay: anime.stagger(20, { start: delay }),
    easing: 'easeOutExpo'
  });
};

export const floatingAnimation = (elements: string) => {
  return anime({
    targets: elements,
    translateY: [-10, 10],
    duration: 2000,
    loop: true,
    direction: 'alternate',
    easing: 'easeInOutSine'
  });
};

export const gradientAnimation = (element: string) => {
  return anime({
    targets: element,
    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
    duration: 10000,
    loop: true,
    easing: 'linear'
  });
};

export const scrollProgressAnimation = (element: string, progress: number) => {
  return anime({
    targets: element,
    width: `${progress}%`,
    duration: 300,
    easing: 'easeOutExpo'
  });
};

export const portfolioHoverAnimation = (element: string) => {
  return anime({
    targets: element,
    scale: 1.05,
    duration: 300,
    easing: 'easeOutExpo'
  });
};

export const textRevealAnimation = (element: string, delay: number = 0) => {
  return anime({
    targets: element,
    clipPath: ['polygon(0 0, 0 0, 0 100%, 0 100%)', 'polygon(0 0, 100% 0, 100% 100%, 0 100%)'],
    duration: 800,
    delay: delay,
    easing: 'easeInOutQuad'
  });
};

export const pulseAnimation = (element: string) => {
  return anime({
    targets: element,
    scale: [1, 1.05, 1],
    opacity: [0.8, 1, 0.8],
    duration: 2000,
    loop: true,
    easing: 'easeInOutSine'
  });
};

export const rotateAnimation = (element: string) => {
  return anime({
    targets: element,
    rotate: '360deg',
    duration: 10000,
    loop: true,
    easing: 'linear'
  });
};