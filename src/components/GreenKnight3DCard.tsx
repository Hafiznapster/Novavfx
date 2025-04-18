import React from 'react';
import styled from 'styled-components';

interface GreenKnight3DCardProps {
  coverImage: string;
  titleImage?: string;
  title: string;
  description: string;
  category: string;
}

const GreenKnight3DCard = ({
  coverImage,
  titleImage,
  title,
  description,
  category
}: GreenKnight3DCardProps) => {
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
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
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
  width: 80%;
  max-width: 300px;
  position: absolute;
  bottom: 30%;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;
  transition: transform 0.5s;
  filter: drop-shadow(0 0 10px rgba(0, 0, 0, 0.5));

  ${Card}:hover & {
    transform: translate3d(-50%, -80px, 100px);
    filter: drop-shadow(0 0 20px rgba(34, 197, 94, 0.5));
  }
`;

const ContentOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 4;
  padding: 20px;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
  transform: translateY(100%);
  transition: transform 0.5s cubic-bezier(0.23, 1, 0.32, 1);

  ${Card}:hover & {
    transform: translateY(0);
  }
`;

const Category = styled.span`
  color: #22c55e;
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
`;

const Title = styled.h3`
  color: white;
  margin: 8px 0;
  font-size: 1.5rem;
  font-weight: 600;
`;

const Description = styled.p`
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.875rem;
  line-height: 1.5;
  margin: 0;
`;

export default GreenKnight3DCard;