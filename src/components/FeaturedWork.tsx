import styled from 'styled-components';
import { motion } from 'framer-motion';

const FeaturedContainer = styled.section`
  padding: ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing.lg};
  background: ${({ theme }) => theme.colors.backgroundLight};

  h2 {
    font-size: 2.5rem;
    text-align: center;
    margin-bottom: 1.5rem;
    color: ${({ theme }) => theme.colors.text};
    font-weight: ${({ theme }) => theme.fontWeights.bold};
    position: relative;
    display: inline-block;
    left: 50%;
    transform: translateX(-50%);

    &:after {
      content: '';
      position: absolute;
      bottom: -10px;
      left: 50%;
      transform: translateX(-50%);
      width: 60px;
      height: 3px;
      background: ${({ theme }) => theme.colors.primary};
      border-radius: 3px;
    }
  }

  @media (max-width: 768px) {
    padding: ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing.md};

    h2 {
      font-size: 2rem;
    }
  }
`;

const WorkGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
  margin-top: ${({ theme }) => theme.spacing.xl};

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: ${({ theme }) => theme.spacing.md};
  }
`;

const WorkItem = styled(motion.div)`
  position: relative;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  overflow: hidden;
  cursor: pointer;
  box-shadow: ${({ theme }) => theme.shadows.small};
  transition: transform 0.4s cubic-bezier(0.25, 0.8, 0.25, 1), box-shadow 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
  height: 380px;

  &:hover {
    transform: translateY(-8px);
    box-shadow: ${({ theme }) => theme.shadows.medium};
  }

  &:hover .overlay {
    opacity: 1;
    transform: translateY(0);
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 1; /* Start visible by default */
    transition: transform 0.5s ease-in-out;
  }

  &:hover img {
    transform: scale(1.05);
  }

  @media (max-width: 768px) {
    height: 320px;
  }
`;

const Overlay = styled.div.attrs({ className: 'overlay' })`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 2rem 1.5rem;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.85), rgba(0, 0, 0, 0.4), transparent);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.4s ease, transform 0.4s ease;
  text-align: left;
`;

const Category = styled.span`
  color: ${({ theme }) => theme.colors.primary};
  font-size: 0.85rem;
  font-weight: ${({ theme }) => theme.fontWeights.semiBold};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  text-transform: uppercase;
  letter-spacing: 1px;
  opacity: 0.9;
  transform: translateY(10px);
  transition: transform 0.4s ease 0.1s, opacity 0.4s ease 0.1s;
  opacity: 0;

  ${WorkItem}:hover & {
    transform: translateY(0);
    opacity: 1;
  }
`;

const Title = styled.h3`
  color: white;
  margin: ${({ theme }) => theme.spacing.xs} 0;
  font-size: 1.4rem;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  transform: translateY(10px);
  transition: transform 0.4s ease 0.2s, opacity 0.4s ease 0.2s;
  opacity: 0;

  ${WorkItem}:hover & {
    transform: translateY(0);
    opacity: 1;
  }
`;

const Description = styled.p`
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.9rem;
  margin: ${({ theme }) => theme.spacing.sm} 0 0;
  line-height: 1.5;
  transform: translateY(10px);
  transition: transform 0.4s ease 0.3s, opacity 0.4s ease 0.3s;
  opacity: 0;

  ${WorkItem}:hover & {
    transform: translateY(0);
    opacity: 1;
  }
`;

const works = [
  {
    id: 1,
    image: '/poster/arcane.jpg',
    category: 'Animation',
    title: 'Arcane',
    description: 'Award-winning animated series with stunning visuals'
  },
  {
    id: 2,
    image: '/poster/batman.jpg',
    category: 'Film',
    title: 'The Batman',
    description: 'Dark and atmospheric cinematography for the caped crusader'
  },
  {
    id: 3,
    image: '/poster/interstelllar.jpg',
    category: 'VFX',
    title: 'Interstellar',
    description: 'Groundbreaking visual effects for space exploration'
  },
  {
    id: 4,
    image: '/poster/spiderman.jpg',
    category: 'VFX',
    title: 'Spider-Man',
    description: 'Web-slinging action with cutting-edge visual effects'
  },
  {
    id: 5,
    image: '/poster/shawshank redemption.jpg',
    category: 'Film',
    title: 'Shawshank Redemption',
    description: 'Timeless cinematography for a classic story'
  },
  {
    id: 6,
    image: '/poster/the green knight.jpg',
    category: 'Design',
    title: 'The Green Knight',
    description: 'Visually stunning fantasy with unique art direction'
  },
  {
    id: 7,
    image: '/poster/sunshine.jpg',
    category: 'VFX',
    title: 'Sunshine',
    description: 'Breathtaking solar visual effects and cinematography'
  },
  {
    id: 8,
    image: '/poster/carealot.jpg',
    category: 'Animation',
    title: 'Care-a-Lot',
    description: 'Colorful and vibrant animated world design'
  }
];

const FeaturedWork = () => {
  // No need for image load handler anymore as images are visible by default

  return (
    <FeaturedContainer>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        Featured Work
      </motion.h2>
      <WorkGrid>
        {works.map((work, index) => (
          <WorkItem
            key={work.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{
              duration: 0.6,
              ease: 'easeOut',
              delay: index * 0.1 // Staggered animation
            }}
          >
            <img
              src={work.image}
              alt={work.title}
            />
            <Overlay>
              <Category>{work.category}</Category>
              <Title>{work.title}</Title>
              <Description>{work.description}</Description>
            </Overlay>
          </WorkItem>
        ))}
      </WorkGrid>
    </FeaturedContainer>
  );
};

export default FeaturedWork;