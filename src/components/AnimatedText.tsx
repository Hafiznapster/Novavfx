import { useEffect, useRef, useState, memo } from 'react';
import styled, { keyframes, css } from 'styled-components';

interface AnimatedTextProps {
  text: string;
  animation?: 'fadeIn' | 'typewriter' | 'wave' | 'bounce' | 'glitch';
  delay?: number;
  duration?: number;
  color?: string;
  fontSize?: string;
  fontWeight?: string;
  className?: string;
}

// Optimized AnimatedText component using CSS animations instead of anime.js
const AnimatedText = memo(({
  text,
  animation = 'fadeIn',
  delay = 0,
  duration = 800,
  color,
  fontSize,
  fontWeight,
  className
}: AnimatedTextProps) => {
  const [characters, setCharacters] = useState<string[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Split text into characters
    setCharacters(text.split(''));

    // Delay showing characters for smoother initial load
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, [text]);

  // Calculate animation duration in seconds
  const durationInSeconds = duration / 1000;

  return (
    <TextContainer
      className={`${className || ''} ${isVisible ? 'visible' : ''}`}
      style={{
        color,
        fontSize,
        fontWeight
      }}
    >
      {characters.map((char, index) => (
        <Character
          key={index}
          className="character"
          animationType={animation}
          delay={delay / 1000 + index * 0.03} // Convert to seconds and stagger
          duration={durationInSeconds}
          style={{
            animationDelay: `${delay / 1000 + index * 0.03}s`,
            animationDuration: `${durationInSeconds}s`
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </Character>
      ))}
    </TextContainer>
  );
});

// Define keyframes for different animations
const fadeInAnimation = keyframes`
  0% { opacity: 0; transform: translateY(20px); }
  100% { opacity: 1; transform: translateY(0); }
`;

const typewriterAnimation = keyframes`
  0% { opacity: 0; }
  100% { opacity: 1; }
`;

const waveAnimation = keyframes`
  0%, 100% { transform: translateY(-5px); opacity: 0.5; }
  50% { transform: translateY(0); opacity: 1; }
`;

const bounceAnimation = keyframes`
  0% { transform: translateY(-15px); opacity: 0; }
  50% { transform: translateY(0); opacity: 0.5; }
  100% { transform: translateY(0); opacity: 1; }
`;

const glitchAnimation = keyframes`
  0% { transform: translate(calc(var(--random-x) * 1px), calc(var(--random-y) * 1px)); opacity: 0; color: #ff00ff; }
  50% { color: #00ffff; }
  100% { transform: translate(0, 0); opacity: 1; }
`;

const TextContainer = styled.div`
  display: inline-flex;
  flex-wrap: wrap;
  align-items: center;
  opacity: 0;
  transition: opacity 0.3s ease;

  &.visible {
    opacity: 1;
  }
`;

interface CharacterProps {
  animationType: string;
  delay: number;
  duration: number;
}

const Character = styled.span<CharacterProps>`
  display: inline-block;
  white-space: pre;
  opacity: 0;
  will-change: transform, opacity;

  ${props => {
    // Set random values for glitch effect
    if (props.animationType === 'glitch') {
      return css`
        --random-x: ${Math.floor(Math.random() * 10 - 5)};
        --random-y: ${Math.floor(Math.random() * 10 - 5)};
      `;
    }
    return '';
  }}

  ${props => {
    // Apply the appropriate animation based on the type
    switch (props.animationType) {
      case 'fadeIn':
        return css`animation: ${fadeInAnimation} ${props.duration}s forwards;`;
      case 'typewriter':
        return css`animation: ${typewriterAnimation} ${props.duration}s forwards;`;
      case 'wave':
        return css`
          animation: ${waveAnimation} ${props.duration * 2}s infinite alternate;
        `;
      case 'bounce':
        return css`animation: ${bounceAnimation} ${props.duration}s forwards;`;
      case 'glitch':
        return css`animation: ${glitchAnimation} ${props.duration}s forwards;`;
      default:
        return css`animation: ${fadeInAnimation} ${props.duration}s forwards;`;
    }
  }}
`;

export default AnimatedText;