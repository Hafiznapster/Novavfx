import React from 'react';
import styled from 'styled-components';

interface Superman3DCardProps {
  coverImage: string;
  titleImage?: string;
  characterImage?: string;
  title: string;
  description: string;
  category: string;
}

const Superman3DCard = ({
  coverImage,
  titleImage,
  characterImage,
  title,
  description,
  category
}: Superman3DCardProps) => {
  return (
    <CardContainer>
      <Card>
        <Wrapper>
          <CoverImage src={coverImage} alt={title} />
        </Wrapper>
        {titleImage && (
          <TitleImage
            src={titleImage}
            alt={title}
            className="title"
          />
        )}
        {characterImage && (
          <CharacterImage
            src={characterImage}
            alt={title}
            className="character"
          />
        )}
        <ContentOverlay>
          <Category>{category}</Category>
          <Title>{title}</Title>
          <Description>{description}</Description>
        </ContentOverlay>
      </Card>
    </CardContainer>
  );
};

const CardContainer = styled.div`
  --card-height: 380px;
  --card-width: 100%;
  perspective: 2500px;
  width: 100%;
  height: 100%;
`;

const Card = styled.div`
  width: var(--card-width);
  height: var(--card-height);
  position: relative;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  padding: 0;
  perspective: 2500px;
  border-radius: 16px;
  overflow: visible;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
  transform-style: preserve-3d;

  &:hover {
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
    transform: translateY(-15px);
  }
`;

const Wrapper = styled.div`
  transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 1;
  border-radius: 16px;
  overflow: hidden;
  transform-style: preserve-3d;

  &::before,
  &::after {
    content: "";
    opacity: 0;
    width: 100%;
    height: 80px;
    transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
    position: absolute;
    left: 0;
    border-radius: 16px;
  }

  &::before {
    top: 0;
    height: 100%;
    background-image: linear-gradient(
      to top,
      transparent 46%,
      rgba(12, 13, 19, 0.5) 68%,
      rgba(12, 13, 19) 97%
    );
  }

  &::after {
    bottom: 0;
    opacity: 1;
    background-image: linear-gradient(
      to bottom,
      transparent 46%,
      rgba(12, 13, 19, 0.5) 68%,
      rgba(12, 13, 19) 97%
    );
  }

  ${Card}:hover & {
    transform: perspective(900px) translateY(-5%) rotateX(25deg) translateZ(0);
    box-shadow: 2px 35px 32px -8px rgba(0, 0, 0, 0.75);
  }

  ${Card}:hover &::before,
  ${Card}:hover &::after {
    opacity: 1;
  }

  ${Card}:hover &::after {
    height: 150px;
  }
`;

const CoverImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 16px;
`;

const TitleImage = styled.img`
  width: 70%;
  max-width: 180px;
  position: absolute;
  bottom: 25%;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;
  transition: transform 0.5s;
  filter: drop-shadow(0 0 10px rgba(0, 0, 0, 0.5));

  ${Card}:hover & {
    transform: translate3d(-50%, -60px, 80px);
    filter: drop-shadow(0 0 20px rgba(0, 0, 255, 0.5)); /* Blue glow for Superman */
  }
`;

const CharacterImage = styled.img`
  width: 110%; /* Slightly larger for Superman's dramatic pose */
  max-width: 320px;
  position: absolute;
  bottom: -25%;
  left: 50%;
  transform: translateX(-50%);
  z-index: 3;
  opacity: 0;
  transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
  filter: drop-shadow(0 10px 20px rgba(0, 0, 0, 0.7));

  ${Card}:hover & {
    opacity: 1;
    transform: translate3d(-50%, -35%, 140px); /* More dramatic lift for Superman */
    filter: drop-shadow(0 20px 30px rgba(0, 0, 0, 0.7));
  }
`;

const ContentOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 20px;
  z-index: 4;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);

  ${Card}:hover & {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Category = styled.div`
  font-size: 0.9rem;
  color: #00bfff; /* Superman blue */
  margin-bottom: 8px;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const Title = styled.h3`
  font-size: 1.5rem;
  color: #ffffff;
  margin: 0 0 8px;
  font-weight: 600;
`;

const Description = styled.p`
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.8);
  margin: 0;
  line-height: 1.4;
`;

export default Superman3DCard;