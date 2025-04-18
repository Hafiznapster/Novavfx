import React from 'react';
import styled from 'styled-components';

interface ScrollIconProps {
  className?: string;
}

const StyledScrollIcon = styled.div`
  width: 1.2rem;
  height: 2rem;
  border: 2px solid ${props => props.theme.colors.textSecondary};
  border-radius: 1rem;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0.4rem;
    left: 50%;
    transform: translateX(-50%);
    width: 0.4rem;
    height: 0.4rem;
    background: ${props => props.theme.colors.primary};
    border-radius: 50%;
    animation: scrollDown 1.5s infinite;
  }

  @keyframes scrollDown {
    0% {
      opacity: 1;
      transform: translate(-50%, 0);
    }
    100% {
      opacity: 0;
      transform: translate(-50%, 0.8rem);
    }
  }
`;

const ScrollIcon: React.FC<ScrollIconProps> = ({ className }) => {
  return <StyledScrollIcon className={className} />;
};

export default ScrollIcon;