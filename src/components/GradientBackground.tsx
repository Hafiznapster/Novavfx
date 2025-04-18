import React, { memo } from 'react';
import styled, { keyframes } from 'styled-components';

interface GradientBackgroundProps {
  className?: string;
}

// Use CSS animations instead of anime.js for better performance
const gradientMove = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const StyledGradientBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(45deg,
    ${props => props.theme.colors.background},
    ${props => props.theme.colors.backgroundLight});
  background-size: 400% 400%;
  z-index: 0;
  pointer-events: none;
  opacity: 1;
  animation: ${gradientMove} 25s ease infinite;
  will-change: background-position;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url('/noise.png');
    opacity: 0.03;
    mix-blend-mode: multiply;
  }
`;

const GradientBackground: React.FC<GradientBackgroundProps> = memo(({ className }) => {
  return <StyledGradientBackground className={className} />;
});

export default GradientBackground;