import { useEffect, useState, memo } from 'react';
import styled from 'styled-components';

interface ScrollProgressBarProps {
  color?: string;
  height?: number;
  position?: 'top' | 'bottom';
}

// Optimized ScrollProgressBar using CSS transitions instead of anime.js
const ScrollProgressBar = memo(({
  color = 'linear-gradient(90deg, #00e5ff, #d500f9)',
  height = 4,
  position = 'top'
}: ScrollProgressBarProps) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Use throttled scroll handler for better performance
    let ticking = false;
    let lastKnownScrollPosition = 0;

    const handleScroll = () => {
      lastKnownScrollPosition = window.scrollY;

      if (!ticking) {
        // Use requestAnimationFrame for smoother performance
        window.requestAnimationFrame(() => {
          const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
          if (totalHeight <= 0) return; // Prevent division by zero

          const currentProgress = Math.min(100, Math.max(0, (lastKnownScrollPosition / totalHeight) * 100));
          setProgress(currentProgress);
          ticking = false;
        });

        ticking = true;
      }
    };

    // Add passive event listener for better performance
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Initial calculation
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <ProgressBarContainer position={position} height={height}>
      <ProgressBar
        style={{
          background: color,
          width: `${progress}%`,
          height: `${height}px`
        }}
      />
    </ProgressBarContainer>
  );
});

const ProgressBarContainer = styled.div<{ position: 'top' | 'bottom', height: number }>`
  position: fixed;
  ${props => props.position === 'top' ? 'top: 0;' : 'bottom: 0;'}
  left: 0;
  width: 100%;
  height: ${props => props.height}px;
  background: rgba(0, 0, 0, 0.2);
  z-index: 1000;
  pointer-events: none;
`;

const ProgressBar = styled.div`
  height: 100%;
  width: 0%;
  transition: width 0.2s ease-out;
  will-change: width;
  box-shadow: 0 0 10px rgba(0, 229, 255, 0.5);
`;

export default ScrollProgressBar;