import React, { useEffect } from 'react';

interface LoadingScreenProps {
  onLoadingComplete?: () => void;
}

// Empty component that immediately calls onLoadingComplete
const LoadingScreen: React.FC<LoadingScreenProps> = ({ onLoadingComplete }) => {
  useEffect(() => {
    // Immediately call the completion callback
    if (onLoadingComplete) {
      onLoadingComplete();
    }
  }, [onLoadingComplete]);

  // Return null (render nothing)
  return null;
};

export default LoadingScreen;