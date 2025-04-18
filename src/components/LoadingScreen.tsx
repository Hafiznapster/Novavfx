import { useEffect, useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import dynamic from 'next/dynamic';

// Dynamically import the StudioCameraModel component to avoid SSR issues
const StudioCameraModel = dynamic(() => import('./StudioCameraModel'), {
  ssr: false,
});

// Animation keyframes
const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const pulse = keyframes`
  0% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.05); opacity: 0.8; }
  100% { transform: scale(1); opacity: 1; }
`;

const shimmer = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
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
  transition: opacity 0.8s cubic-bezier(0.65, 0, 0.35, 1), visibility 0.8s cubic-bezier(0.65, 0, 0.35, 1);
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
  position: absolute;
  top: 40px;
  left: 50%;
  transform: translateX(-50%);
  animation: ${float} 3s ease-in-out infinite;
`;

const Logo = styled.div`
  font-size: 2rem;
  font-weight: 800;
  letter-spacing: 2px;
  background: linear-gradient(90deg, #00e5ff, #d500f9);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
  text-shadow: 0 0 20px rgba(0, 229, 255, 0.3);
`;

const ModelContainer = styled.div`
  position: relative;
  width: 100%;
  height: 50vh;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 200px;
    height: 20px;
    background: radial-gradient(ellipse at center, rgba(0, 229, 255, 0.3) 0%, transparent 70%);
    border-radius: 50%;
    filter: blur(10px);
    animation: ${pulse} 2s ease-in-out infinite;
  }
`;

const LoadingTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 1rem;
`;

const LoadingText = styled.div`
  color: #fff;
  font-size: 1.8rem;
  font-weight: 700;
  letter-spacing: 2px;
  text-transform: uppercase;
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
  letter-spacing: 1px;
  margin-bottom: 20px;
`;

const ProgressBarContainer = styled.div`
  width: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 6px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 3px;
  overflow: hidden;
  position: relative;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(5px);
`;

const Progress = styled.div<{ width: number }>`
  height: 100%;
  width: ${props => props.width}%;
  background: linear-gradient(90deg, #00e5ff, #d500f9);
  transition: width 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  box-shadow: 0 0 15px rgba(0, 229, 255, 0.7);
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
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.7);
  margin-top: 10px;
  font-weight: 500;
`;

interface LoadingScreenProps {
  onLoadingComplete?: () => void;
}

const LoadingScreen = ({ onLoadingComplete }: LoadingScreenProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [modelLoaded, setModelLoaded] = useState(false);
  const [loadingPhase, setLoadingPhase] = useState('Initializing');
  const progressInterval = useRef<NodeJS.Timeout>();

  const handleModelLoad = () => {
    setModelLoaded(true);
    setLoadingPhase('Preparing assets');
  };

  const handleRotationComplete = () => {
    setTimeout(() => {
      setIsLoading(false);
      if (onLoadingComplete) {
        onLoadingComplete();
      }
    }, 500);
  };

  // Simulate loading progress with different phases
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isLoading) {
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

          // If model is loaded, accelerate to 100%
          if (modelLoaded && prev >= 70) {
            return Math.min(100, prev + 5);
          }
          // Otherwise, increase gradually but cap at 70% until model loads
          const increment = modelLoaded ? 3 : 1.5;
          const newProgress = prev + increment * (Math.random() * 0.5 + 0.5);
          return Math.min(modelLoaded ? 100 : 70, newProgress);
        });
      }, 100);
    } else {
      // When isLoading becomes false, ensure progress reaches 100%
      setProgress(100);
      setLoadingPhase('Ready');
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isLoading, modelLoaded, loadingPhase]);

  // Handle fade out when loading is complete
  useEffect(() => {
    if (!isLoading && containerRef.current && progress >= 100) {
      // Small delay to ensure progress bar reaches 100%
      const timer = setTimeout(() => {
        containerRef.current?.classList.add('fade-out');
      }, 800);

      return () => clearTimeout(timer);
    }
  }, [isLoading, progress]);

  return (
    <LoadingContainer ref={containerRef}>
      <LogoContainer>
        <Logo>NOVA VFX</Logo>
      </LogoContainer>

      <ModelContainer>
        <StudioCameraModel
          onLoad={handleModelLoad}
          onComplete={handleRotationComplete}
          style={{
            transform: `scale(${isLoading ? 1 : 0.8})`,
            opacity: isLoading ? 1 : 0,
            transition: 'all 0.5s cubic-bezier(0.65, 0, 0.35, 1)'
          }}
        />
      </ModelContainer>

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