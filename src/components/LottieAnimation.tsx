import { useRef, useEffect } from 'react';
import { DotLottiePlayer } from '@lottiefiles/dotlottie-react';
import styled from 'styled-components';

const LottieContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

interface LottieAnimationProps {
  src: string;
  autoplay?: boolean;
  loop?: boolean;
  speed?: number;
  onComplete?: () => void;
  style?: React.CSSProperties;
}

const LottieAnimation = ({
  src,
  autoplay = true,
  loop = false,
  speed = 1,
  onComplete,
  style,
}: LottieAnimationProps) => {
  const playerRef = useRef<any>(null);

  useEffect(() => {
    if (playerRef.current && onComplete && !loop) {
      playerRef.current.addEventListener('complete', onComplete);
      
      return () => {
        if (playerRef.current) {
          playerRef.current.removeEventListener('complete', onComplete);
        }
      };
    }
  }, [onComplete, loop]);

  return (
    <LottieContainer style={style}>
      <DotLottiePlayer
        ref={playerRef}
        src={src}
        autoplay={autoplay}
        loop={loop}
        speed={speed}
        style={{ width: '100%', height: '100%' }}
      />
    </LottieContainer>
  );
};

export default LottieAnimation;