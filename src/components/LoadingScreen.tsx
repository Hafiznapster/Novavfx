import { useEffect, useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';

// Animation keyframes
const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const scaleUp = keyframes`
  0% { transform: scale(0.9); opacity: 0; }
  100% { transform: scale(1); opacity: 1; }
`;

const shimmer = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

const LoadingContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: #0a0a0a;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  opacity: 1;
  transition: opacity 0.4s ease-out, visibility 0.4s ease-out;
  visibility: visible;
  overflow: hidden;
  animation: ${fadeIn} 0.3s ease-out;

  /* Ensure full height on mobile devices */
  @media (max-width: 768px) {
    height: 100vh;
  }

  &.fade-out {
    opacity: 0;
    pointer-events: none;
    visibility: hidden;
  }
`;

const LogoContainer = styled.div`
  margin-bottom: 30px;
  animation: ${scaleUp} 0.5s ease-out forwards;
`;

const Logo = styled.div`
  font-size: 2.2rem;
  font-weight: 800;
  letter-spacing: 1px;
  background: linear-gradient(90deg, #00e5ff, #d500f9);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
`;





const ProgressBarContainer = styled.div`
  width: 200px;
  margin-top: 20px;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 3px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 3px;
  overflow: hidden;
`;

const Progress = styled.div<{ width: number }>`
  height: 100%;
  width: ${props => props.width}%;
  background: linear-gradient(90deg, #00e5ff, #d500f9);
  transition: width 0.2s linear;
`;

interface LoadingScreenProps {
  onLoadingComplete?: () => void;
}

const LoadingScreen = ({ onLoadingComplete }: LoadingScreenProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  // Simplified loading simulation
  useEffect(() => {
    // Start at 0
    setProgress(0);

    // Quickly increase to 100% in 1.5 seconds
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + 4; // Faster progress

        if (newProgress >= 100) {
          clearInterval(interval);

          // Fade out and complete
          setTimeout(() => {
            containerRef.current?.classList.add('fade-out');

            setTimeout(() => {
              if (onLoadingComplete) {
                onLoadingComplete();
              }
            }, 400);
          }, 200);

          return 100;
        }

        return newProgress;
      });
    }, 50); // Faster interval

    return () => clearInterval(interval);
  }, [onLoadingComplete]);

  return (
    <LoadingContainer ref={containerRef}>
      <LogoContainer>
        <Logo>NOVA VFX</Logo>
      </LogoContainer>

      <ProgressBarContainer>
        <ProgressBar>
          <Progress width={progress} />
        </ProgressBar>
      </ProgressBarContainer>
    </LoadingContainer>
  );
};

export default LoadingScreen;