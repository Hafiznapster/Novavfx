import React from 'react';
import styled from 'styled-components';
import Batman3DCard from './Batman3DCard';
import GreenKnight3DCard from './GreenKnight3DCard';

interface GridItemProps {
  gridArea: string;
}

const PortfolioGrid = () => {
  return (
    <GridContainer>
      <GridItem gridArea="1 / 1 / 2 / 2">
        <Batman3DCard
          coverImage="/poster/batman.jpg"
          titleImage="/batman_text.jpg"
          characterImage="/batman_3d.png"
          title="Batman"
          description="The Dark Knight rises again"
          category="Superhero"
        />
      </GridItem>
      <GridItem gridArea="1 / 2 / 2 / 3">
        <Superman3DCard
          coverImage="/poster/superman_poster.jpg"
          titleImage="/superman-logo.png"
          characterImage="/superman_3d.png"
          title="Superman"
          description="The Man of Steel returns"
          category="Superhero"
        />
      </GridItem>
      <GridItem gridArea="1 / 3 / 3 / 4" className="large">
        <Batman3DCard
          coverImage="/poster/spiderman.jpg"
          titleImage="/spiderman_text.jpg"
          characterImage="/miles_3d.png"
          title="Spider-Man"
          description="Across the Spider-Verse"
          category="Animation"
        />
      </GridItem>
      <GridItem gridArea="2 / 1 / 3 / 3">
        <Batman3DCard
          coverImage="/poster/avatar.jpg"
          titleImage="/avatar-text.png"
          characterImage="/avatar_3d.png"
          title="Avatar"
          description="Return to Pandora"
          category="Science Fiction"
        />
      </GridItem>
    </GridContainer>
  );
};

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 2rem;
  padding: 2rem;
  width: 100%;
  max-width: 1600px;
  margin: 0 auto;
  min-height: 800px;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: auto;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    padding: 1rem;
  }
`;

const GridItem = styled.div<GridItemProps>`
  grid-area: ${props => props.gridArea};
  width: 100%;
  height: 100%;
  min-height: 380px;
  transition: transform 0.3s ease;

  &.large {
    height: 100%;
  }

  @media (max-width: 1200px) {
    grid-area: auto;
    &.large {
      height: auto;
    }
  }
`;

export default PortfolioGrid;