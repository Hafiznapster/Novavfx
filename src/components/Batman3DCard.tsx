import React from 'react';
import styled from 'styled-components';

interface Batman3DCardProps {
  coverImage: string;
  titleImage?: string;
  characterImage?: string;
  title: string;
  description: string;
  category: string;
}

const Batman3DCard = ({
  coverImage,
  titleImage,
  characterImage,
  title,
  description,
  category
}: Batman3DCardProps) => {
  // For debugging
  console.log('Batman3DCard rendering with images:', { coverImage, titleImage, characterImage });

  return (
    <CardContainer>
      <Card>
        <Wrapper>
          <CoverImage src={coverImage} alt={title} />
        </Wrapper>
        {/* Use the poster image as a fallback if titleImage is not available */}
        <TitleImage
          src={titleImage || coverImage}
          alt={title}
          className="title"
        />
        {/* Use a div with background for character if image is not available */}
        {characterImage ? (
          <CharacterImage
            src={characterImage}
            alt={title}
            className="character"
          />
        ) : (
          <CharacterPlaceholder className="character" />
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
    height: 150px; /* Increased height for better gradient effect */
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
    transform: translate3d(-50%, -40px, 60px);
    filter: drop-shadow(0 0 20px rgba(0, 229, 255, 0.5));
  }
`;

const CharacterImage = styled.img`
  width: 100%;
  max-width: 300px;
  position: absolute;
  bottom: -20%;
  left: 50%;
  transform: translateX(-50%);
  z-index: 4;
  opacity: 0;
  transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
  filter: drop-shadow(0 10px 20px rgba(0, 0, 0, 0.7));

  ${Card}:hover & {
    opacity: 1;
    transform: translate3d(-50%, -20%, 100px);
    filter: drop-shadow(0 20px 30px rgba(0, 0, 0, 0.7));
  }
`;

const CharacterPlaceholder = styled.div`
  width: 90%; /* Reduced from 100% */
  max-width: 280px; /* Reduced from 320px */
  height: 60%; /* Reduced from 70% */
  position: absolute;
  bottom: -5%; /* Adjusted from -10% */
  left: 50%;
  transform: translateX(-50%);
  z-index: 3;
  opacity: 0;
  transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
  background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
  border-radius: 50% 50% 0 0;
  box-shadow: 0 20px 30px rgba(0, 0, 0, 0.5);

  ${Card}:hover & {
    opacity: 1;
    transform: translate3d(-50%, -15%, 120px); /* Adjusted from -20%, 150px */
    box-shadow: 0 30px 40px rgba(0, 0, 0, 0.5);
  }
`;

const ContentOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 2rem 1.5rem;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.95), rgba(0, 0, 0, 0.6), transparent);
  z-index: 4; /* Higher z-index to ensure it's above other elements */
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.5s cubic-bezier(0.23, 1, 0.32, 1), transform 0.5s cubic-bezier(0.23, 1, 0.32, 1);
  transform-style: preserve-3d;

  ${Card}:hover & {
    opacity: 1;
    transform: translateY(0) translateZ(50px); /* Move forward in 3D space */
  }
`;

const Category = styled.span`
  display: inline-block;
  font-size: 0.8rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: #00e5ff;
  margin-bottom: 10px;
  text-shadow: 0 0 10px rgba(0, 229, 255, 0.5);
  transform: translateZ(5px); /* Subtle 3D effect */
  transition: all 0.3s ease;

  ${Card}:hover & {
    text-shadow: 0 0 15px rgba(0, 229, 255, 0.8);
  }
`;

const Title = styled.h3`
  font-size: 1.3rem;
  font-weight: 700;
  margin-bottom: 10px;
  color: white;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.8);
  transform: translateZ(10px); /* More pronounced 3D effect */
  transition: all 0.3s ease;

  ${Card}:hover & {
    text-shadow: 0 2px 15px rgba(0, 0, 0, 0.8);
  }
`;

const Description = styled.p`
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.6;
  text-shadow: 0 1px 8px rgba(0, 0, 0, 0.6);
  transform: translateZ(5px); /* Subtle 3D effect */
  transition: all 0.3s ease;

  ${Card}:hover & {
    color: rgba(255, 255, 255, 1);
  }
`;

export default Batman3DCard;
