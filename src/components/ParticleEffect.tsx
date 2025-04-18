import { useRef, useEffect, useState, memo } from 'react';
import styled from 'styled-components';

interface ParticleEffectProps {
  count?: number;
  color?: string;
  size?: number;
  speed?: number;
  interactive?: boolean;
}

// Optimized particle component using CSS animations instead of anime.js
const ParticleEffect = memo(({
  count = 50, // Reduced count for better performance
  color = '#00e5ff',
  size = 3,
  speed = 1,
  interactive = false // Disabled by default for better performance
}: ParticleEffectProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [particles, setParticles] = useState<Array<{
    id: number;
    x: number;
    y: number;
    size: number;
    opacity: number;
    speed: number;
    direction: number;
  }>>([]);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [isLoaded, setIsLoaded] = useState(false);

  // Initialize particles once on mount
  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const { width, height } = container.getBoundingClientRect();
    setDimensions({ width, height });

    // Create particles data
    const newParticles = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * size + size / 2,
      opacity: 0.3 + Math.random() * 0.5,
      speed: (Math.random() * 0.5 + 0.5) * speed,
      direction: Math.random() * 360
    }));

    setParticles(newParticles);

    // Delay showing particles for smoother initial load
    setTimeout(() => setIsLoaded(true), 500);

    // Handle window resize
    const handleResize = () => {
      if (!containerRef.current) return;
      const { width, height } = containerRef.current.getBoundingClientRect();
      setDimensions({ width, height });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [count, size, speed]);

  return (
    <ParticleContainer ref={containerRef} className={isLoaded ? 'loaded' : ''}>
      {particles.map((particle) => (
        <Particle
          key={particle.id}
          style={{
            left: `${particle.x}px`,
            top: `${particle.y}px`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: color,
            opacity: particle.opacity,
            animationDuration: `${10 / particle.speed}s`,
            animationDelay: `${Math.random() * 5}s`
          }}
        />
      ))}
    </ParticleContainer>
  );
});

const ParticleContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  pointer-events: none;
  overflow: hidden;
  opacity: 0;
  transition: opacity 1s ease-in-out;

  &.loaded {
    opacity: 0.7;
  }
`;

const Particle = styled.div`
  position: absolute;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0 0 10px currentColor;
  animation: float 10s infinite ease-in-out;
  will-change: transform;

  @keyframes float {
    0% {
      transform: translate(-50%, -50%);
    }
    25% {
      transform: translate(calc(-50% + 20px), calc(-50% - 20px));
    }
    50% {
      transform: translate(calc(-50% - 20px), calc(-50% + 10px));
    }
    75% {
      transform: translate(calc(-50% + 10px), calc(-50% + 20px));
    }
    100% {
      transform: translate(-50%, -50%);
    }
  }
`;

export default ParticleEffect;