import React, { useEffect } from 'react';
import styled from 'styled-components';

interface StudioCameraModelProps {
  onComplete?: () => void;
  style?: React.CSSProperties;
}

// Simple placeholder component instead of 3D model
const StudioCameraModel = ({ onComplete, style }: StudioCameraModelProps) => {
  // Call onComplete after a short delay to simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      if (onComplete) onComplete();
    }, 500);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <ModelContainer style={style}>
      <LogoCircle>
        NOVA VFX
      </LogoCircle>
    </ModelContainer>
  );
};

const ModelContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  position: relative;
`;

const LogoCircle = styled.div`
  width: 150px;
  height: 150px;
  background: linear-gradient(135deg, #00e5ff, #d500f9);
  border-radius: 50%;
  box-shadow: 0 0 30px rgba(0, 229, 255, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  padding: 20px;
  animation: pulse 2s infinite ease-in-out;

  @keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.05); }
    100% { transform: scale(1); }
  }
`;

export default StudioCameraModel;