import { useEffect, useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';

// Animation keyframes
const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const scaleUp = keyframes`
  0% { transform: scale(0.8); opacity: 0; }
  100% { transform: scale(1); opacity: 1; }
`;

const shimmer = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

const slideUp = keyframes`
  0% { transform: translateY(20px); opacity: 0; }
  100% { transform: translateY(0); opacity: 1; }
`;

const LoadingContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: linear-gradient(135deg, #0a0a0a 0%, #121212 100%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  opacity: 1;
  transition: opacity 0.6s cubic-bezier(0.65, 0, 0.35, 1), visibility 0.6s cubic-bezier(0.65, 0, 0.35, 1);
  visibility: visible;
  overflow: hidden;
  animation: ${fadeIn} 0.5s ease-out;

  /* Ensure full height on mobile devices */
  @media (max-width: 768px) {
    height: 100vh;
    /* Fix for mobile browsers */
    height: -webkit-fill-available;
    min-height: -webkit-fill-available;
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background:
      radial-gradient(circle at 20% 30%, rgba(0, 229, 255, 0.05) 0%, transparent 50%),
      radial-gradient(circle at 80% 70%, rgba(213, 0, 249, 0.05) 0%, transparent 50%);
    pointer-events: none;
  }

  &.fade-out {
    opacity: 0;
    pointer-events: none;
    visibility: hidden;
  }
`;

const LogoContainer = styled.div`
  margin-bottom: 40px;
  animation: ${scaleUp} 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
`;

const Logo = styled.div`
  font-size: 2.5rem;
  font-weight: 800;
  letter-spacing: 2px;
  background: linear-gradient(90deg, #00e5ff, #d500f9);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
  text-shadow: 0 0 20px rgba(0, 229, 255, 0.3);
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 40px;
    height: 3px;
    background: linear-gradient(90deg, #00e5ff, #d500f9);
    border-radius: 3px;
  }
`;



const LoadingTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 30px;
  animation: ${slideUp} 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
  animation-delay: 0.2s;
  opacity: 0;
`;

const LoadingText = styled.div`
  color: #fff;
  font-size: 1.5rem;
  font-weight: 700;
  letter-spacing: 1px;
  margin-bottom: 10px;
  background: linear-gradient(90deg, #00e5ff, #d500f9, #00e5ff);
  background-size: 200% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
  animation: ${shimmer} 3s linear infinite;
`;

const LoadingSubtext = styled.div`
  color: rgba(255, 255, 255, 0.7);
  font-size: 1rem;
  font-weight: 400;
  letter-spacing: 0.5px;
  margin-bottom: 10px;
`;

const ProgressBarContainer = styled.div`
  width: 280px;
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: ${slideUp} 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
  animation-delay: 0.3s;
  opacity: 0;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 4px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  overflow: hidden;
  position: relative;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
`;

const Progress = styled.div<{ width: number }>`
  height: 100%;
  width: ${props => props.width}%;
  background: linear-gradient(90deg, #00e5ff, #d500f9);
  transition: width 0.3s ease-out;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
    animation: ${shimmer} 2s infinite;
    background-size: 200% 100%;
  }
`;

const ProgressText = styled.div`
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.7);
  margin-top: 8px;
  font-weight: 500;
`;

interface LoadingScreenProps {
  onLoadingComplete?: () => void;
}

const LoadingScreen = ({ onLoadingComplete }: LoadingScreenProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [loadingPhase, setLoadingPhase] = useState('Initializing');

  // Simulate loading progress
  useEffect(() => {
    let interval: NodeJS.Timeout;
    let timer: NodeJS.Timeout;

    // Start at 0 and increase gradually
    setProgress(0);

    interval = setInterval(() => {
      setProgress(prev => {
        // Update loading phase based on progress
        if (prev < 30 && loadingPhase === 'Initializing') {
          setLoadingPhase('Loading assets');
        } else if (prev >= 30 && prev < 60 && loadingPhase === 'Loading assets') {
          setLoadingPhase('Preparing experience');
        } else if (prev >= 60 && prev < 85 && loadingPhase === 'Preparing experience') {
          setLoadingPhase('Almost ready');
        } else if (prev >= 85 && loadingPhase === 'Almost ready') {
          setLoadingPhase('Launching experience');
        }

        // Increase progress
        const newProgress = prev + (Math.random() * 1.5 + 1);

        // If we've reached 100%, clear interval and trigger completion
        if (newProgress >= 100) {
          clearInterval(interval);

          // Add a small delay before fading out
          timer = setTimeout(() => {
            containerRef.current?.classList.add('fade-out');

            // Call the completion callback after fade-out animation
            setTimeout(() => {
              if (onLoadingComplete) {
                onLoadingComplete();
              }
            }, 600);
          }, 400);

          return 100;
        }

        return newProgress;
      });
    }, 100);

    return () => {
      if (interval) clearInterval(interval);
      if (timer) clearTimeout(timer);
    };
  }, [onLoadingComplete]);

  return (
    <LoadingContainer ref={containerRef}>
      <LogoContainer>
        <Logo>NOVA VFX</Logo>
      </LogoContainer>

      <LoadingTextContainer>
        <LoadingText>Loading Experience</LoadingText>
        <LoadingSubtext>{loadingPhase}</LoadingSubtext>
      </LoadingTextContainer>

      <ProgressBarContainer>
        <ProgressBar>
          <Progress width={progress} />
        </ProgressBar>
        <ProgressText>{Math.round(progress)}%</ProgressText>
      </ProgressBarContainer>
    </LoadingContainer>
  );
};

export default LoadingScreen;