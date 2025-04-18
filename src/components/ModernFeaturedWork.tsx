import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Batman3DCard from './Batman3DCard';
import GreenKnight3DCard from './GreenKnight3DCard';
import Superman3DCard from './Superman3DCard';

// Import the works data from the original FeaturedWork component
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
    image: '/poster/spiderman.jpg',
    category: 'VFX',
    title: 'Spider-Man',
    description: 'Web-slinging action with cutting-edge visual effects'
  },
  {
    id: 4,
    image: '/poster/superman.jpg',
    titleImage: '/superman_text.svg',
    category: 'Film',
    title: 'Man of Steel',
    description: 'Epic superhero cinematography with stunning visual effects'
  },
  {
    id: 5,
    image: '/greenknight_cover.png',
    titleImage: '/greenknight_text.png',
    category: 'Design',
    title: 'The Green Knight',
    description: 'Visually stunning medieval fantasy with unique art direction'
  },

  {
    id: 6,
    image: '/poster/avatar.jpg',
    titleImage: '/avatar-text.png',
    characterImage: '/avatar_3d.png',
    category: 'VFX',
    title: 'Avatar: The Way of Water',
    description: 'Groundbreaking visual effects and immersive world-building'
  },
  {
    id: 7,
    image: '/poster/thallumaala.jpg',
    titleImage: '/thallumalla_text.png',
    characterImage: '/thallumalla_3d.png',
    category: 'Film',
    title: 'Thallumaala',
    description: 'High-energy action choreography with dynamic visual effects'
  },
  {
    id: 8,
    image: '/poster/minalmurali.jpg',
    titleImage: '/minalmurali_logo.png',
    characterImage: '/minalmurali_3d.png',
    category: 'Film',
    title: 'Minnal Murali',
    description: 'Superhero origin story with stunning visual effects and action sequences'
  }
];

// Get unique categories from works
const categories = ['All', ...Array.from(new Set(works.map(work => work.category)))];

const Card3D = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springConfig = { damping: 20, stiffness: 300 };
  const rotateX = useSpring(useTransform(y, [-100, 100], [10, -10]), springConfig);
  const rotateY = useSpring(useTransform(x, [-100, 100], [-10, 10]), springConfig);
  const scale = useSpring(1, springConfig);
  const brightness = useTransform(y, [-100, 0, 100], [1.1, 1, 0.9]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const mouseX = (e.clientX - centerX) * 0.5;
    const mouseY = (e.clientY - centerY) * 0.5;
    x.set(mouseX);
    y.set(mouseY);
    scale.set(1.05);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    scale.set(1);
  };

  return (
    <motion.div
      ref={cardRef}
      className={className}
      style={{
        rotateX,
        rotateY,
        scale,
        filter: `brightness(${brightness})`,
        transformStyle: 'preserve-3d',
        perspective: 1000,
        transformOrigin: 'center center'
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ zIndex: 10 }}
      transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
    >
      {children}
    </motion.div>
  );
};

const ModernFeaturedWork = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);

  const filteredWorks = activeCategory === 'All'
    ? works
    : works.filter(work => work.category === activeCategory);

  return (
    <PortfolioContainer>
      <PortfolioHeader
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, type: "spring", stiffness: 100, damping: 15 }}
      >
        <PortfolioTitle>Our Portfolio</PortfolioTitle>
        <PortfolioSubtitle>
          Explore our award-winning visual effects and animation work
        </PortfolioSubtitle>
      </PortfolioHeader>

      <FilterContainer
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7, delay: 0.3, type: "spring", stiffness: 100, damping: 15 }}
      >
        {categories.map((category, index) => (
          <FilterButton
            key={category}
            $active={category === activeCategory}
            onClick={() => setActiveCategory(category)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.4,
              delay: 0.3 + index * 0.1,
              type: "spring",
              stiffness: 200
            }}
          >
            {category}
          </FilterButton>
        ))}
      </FilterContainer>

      <PortfolioGridContainer
        variants={{
          hidden: { opacity: 0 },
          show: {
            opacity: 1,
            transition: {
              staggerChildren: 0.12,
              delayChildren: 0.1
            }
          }
        }}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-50px" }}
      >
        <AnimatePresence>
          {filteredWorks.map((work, index) => (
            <PortfolioItemWrapper
              key={work.id}
              variants={{
                hidden: { opacity: 0, y: 70, scale: 0.95 },
                show: {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: {
                    type: "spring",
                    stiffness: 80,
                    damping: 15,
                    mass: 1.2
                  }
                }
              }}
            >
              {work.title === 'The Batman' ? (
                // Special 3D card for Batman
                <Batman3DCard
                  coverImage="/poster/batman.jpg"
                  titleImage="/batman_text.jpg"
                  characterImage="/batman_3d.png"
                  title={work.title}
                  description={work.description}
                  category={work.category}
                />
              ) : work.title === 'Spider-Man' ? (
                // Special 3D card for Spider-Man
                <Batman3DCard
                  coverImage="/poster/spiderman.jpg"
                  titleImage="/spiderman_text.jpg"
                  characterImage="/miles_3d.png"
                  title={work.title}
                  description={work.description}
                  category={work.category}
                />
              ) : work.title === 'Arcane' ? (
                // Special 3D card for Arcane
                <Batman3DCard
                  coverImage="/poster/arcane.jpg"
                  titleImage="/arcane_text.jpg"
                  characterImage="/jinx_3d.png"
                  title={work.title}
                  description={work.description}
                  category={work.category}
                />
              ) : work.title === 'Man of Steel' ? (
                // Special 3D card for Superman
                <Superman3DCard
                  coverImage="/poster/superman_poster.jpg"
                  titleImage="/superman-logo.png"
                  characterImage="/superman_3d.png"
                  title={work.title}
                  description={work.description}
                  category={work.category}
                />
              ) : work.title === 'Avatar: The Way of Water' ? (
                // Special 3D card for Avatar
                <Batman3DCard
                  coverImage={work.image}
                  titleImage={work.titleImage}
                  characterImage={work.characterImage}
                  title={work.title}
                  description={work.description}
                  category={work.category}
                />
              ) : work.title === 'Thallumaala' ? (
                // Special 3D card for Thallumaala
                <Batman3DCard
                  coverImage={work.image}
                  titleImage={work.titleImage}
                  characterImage={work.characterImage}
                  title={work.title}
                  description={work.description}
                  category={work.category}
                />
              ) : work.title === 'Minnal Murali' ? (
                // Special 3D card for Minnal Murali
                <Batman3DCard
                  coverImage={work.image}
                  titleImage={work.titleImage}
                  characterImage={work.characterImage}
                  title={work.title}
                  description={work.description}
                  category={work.category}
                />
              ) : work.title === 'The Green Knight' ? (
                // Special 3D card for Green Knight
                <GreenKnight3DCard
                  coverImage={work.image}
                  titleImage={work.titleImage}
                  title={work.title}
                  description={work.description}
                  category={work.category}
                />
              ) : (
                // Regular 3D card for other items
                <Card3D>
                  <PortfolioItem
                    onHoverStart={() => setHoveredItem(work.id)}
                    onHoverEnd={() => setHoveredItem(null)}
                  >
                    <ItemImageContainer>
                      <ItemImage
                        src={work.image}
                        alt={work.title}
                        style={{
                          scale: hoveredItem === work.id ? 1.1 : 1,
                          transition: "scale 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)"
                        }}
                      />
                      <ItemOverlay
                        style={{
                          opacity: hoveredItem === work.id ? 1 : 0,
                          transition: "opacity 0.3s ease"
                        }}
                      >
                        <ItemViewButton
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          View Project
                        </ItemViewButton>
                      </ItemOverlay>
                    </ItemImageContainer>

                    <ItemContent>
                      <ItemCategory>{work.category}</ItemCategory>
                      <ItemTitle>{work.title}</ItemTitle>
                      <ItemDescription>{work.description}</ItemDescription>
                    </ItemContent>
                  </PortfolioItem>
                </Card3D>
              )}
            </PortfolioItemWrapper>
          ))}
        </AnimatePresence>
      </PortfolioGridContainer>

      <ViewMoreButtonContainer
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, delay: 0.5, type: "spring", stiffness: 80, damping: 15 }}
      >
        <ViewMoreButton
          whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(0, 229, 255, 0.4)" }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          View All Projects
        </ViewMoreButton>
      </ViewMoreButtonContainer>
    </PortfolioContainer>
  );
};

const PortfolioContainer = styled.section`
  padding: 140px 5% 160px;
  background: ${({ theme }) => theme.colors.background};
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background:
      radial-gradient(circle at 20% 30%, rgba(0, 229, 255, 0.08) 0%, transparent 50%),
      radial-gradient(circle at 80% 70%, rgba(213, 0, 249, 0.08) 0%, transparent 50%),
      radial-gradient(circle at 50% 50%, rgba(0, 0, 0, 0.05) 0%, transparent 70%);
    pointer-events: none;
  }

  /* Add a subtle animated gradient at the top */
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 200px;
    background: linear-gradient(180deg, rgba(0, 0, 0, 0.1) 0%, transparent 100%);
    pointer-events: none;
    opacity: 0.5;
  }
`;

const PortfolioHeader = styled(motion.div)`
  text-align: center;
  margin-bottom: 70px;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -30px;
    left: 50%;
    transform: translateX(-50%);
    width: 100px;
    height: 3px;
    background: linear-gradient(90deg, #00e5ff, #d500f9);
    border-radius: 3px;
    box-shadow: 0 0 20px rgba(0, 229, 255, 0.5);
  }
`;

const PortfolioTitle = styled.h2`
  font-size: 3.5rem;
  font-weight: 800;
  margin-bottom: 20px;
  background: linear-gradient(90deg, #00e5ff, #d500f9);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
  letter-spacing: -0.5px;
  text-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const PortfolioSubtitle = styled.p`
  font-size: 1.3rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.7;
  max-width: 600px;
  margin: 0 auto;

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const FilterContainer = styled(motion.div)`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 15px;
  margin-bottom: 60px;
  position: relative;
  z-index: 10;

  &::before {
    content: '';
    position: absolute;
    top: -20px;
    left: 50%;
    transform: translateX(-50%);
    width: 200px;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -20px;
    left: 50%;
    transform: translateX(-50%);
    width: 200px;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
  }
`;

const FilterButton = styled(motion.button)<{ $active: boolean }>`
  padding: 12px 24px;
  background: ${props => props.$active ? 'linear-gradient(90deg, #00e5ff, #d500f9)' : 'rgba(15, 15, 20, 0.6)'};
  border: none;
  border-radius: 30px;
  color: ${props => props.$active ? '#fff' : 'rgba(255, 255, 255, 0.7)'};
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1);
  box-shadow: ${props => props.$active ? '0 8px 20px rgba(0, 229, 255, 0.3)' : '0 4px 10px rgba(0, 0, 0, 0.1)'};
  backdrop-filter: blur(10px);
  letter-spacing: 0.5px;

  &:hover {
    background: ${props => props.$active ? 'linear-gradient(90deg, #00e5ff, #d500f9)' : 'rgba(30, 30, 40, 0.8)'};
    color: #fff;
    transform: translateY(-3px);
    box-shadow: ${props => props.$active ? '0 12px 25px rgba(0, 229, 255, 0.4)' : '0 8px 15px rgba(0, 0, 0, 0.2)'};
  }

  &:active {
    transform: translateY(0);
    box-shadow: ${props => props.$active ? '0 5px 15px rgba(0, 229, 255, 0.3)' : '0 2px 5px rgba(0, 0, 0, 0.1)'};
  }

  &:focus {
    outline: none;
  }
`;

const PortfolioGridContainer = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 40px;
  max-width: 1400px;
  margin: 0 auto;
  padding: 20px 0;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 30px;
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 25px;
  }
`;

const PortfolioItemWrapper = styled(motion.div)`
  height: 100%;
  transform-style: preserve-3d;
  perspective: 1200px;
  border-radius: 16px;
  transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);

  &:hover {
    z-index: 10;
  }
`;

const ItemCategory = styled.span`
  display: inline-block;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 10px;
`;

const ItemTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.colors.text};
`;

const ItemDescription = styled.p`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.5;
`;

const PortfolioItem = styled(motion.div)`
  background: rgba(15, 15, 20, 0.6);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  height: 100%;
  transform-style: preserve-3d;

  /* Add depth to elements inside the card */
  ${ItemTitle}, ${ItemCategory}, ${ItemDescription} {
    transform: translateZ(20px);
  }

  /* Add a subtle shine effect */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.1) 0%,
      rgba(255, 255, 255, 0) 100%
    );
    z-index: 2;
    pointer-events: none;
    border-radius: 16px;
  }
`;

const ItemImageContainer = styled.div`
  position: relative;
  height: 220px;
  overflow: hidden;
  transform-style: preserve-3d;
  transform: translateZ(10px);
  border-radius: 16px 16px 0 0;
`;

const ItemImage = styled(motion.img)`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ItemOverlay = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transform-style: preserve-3d;
  transform: translateZ(20px);
  border-radius: 16px 16px 0 0;
`;

const ItemViewButton = styled(motion.button)`
  padding: 10px 20px;
  background: linear-gradient(90deg, #00e5ff, #d500f9);
  border: none;
  border-radius: 30px;
  color: #fff;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  transform: translateZ(30px);
  transform-style: preserve-3d;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateZ(40px);
    box-shadow: 0 15px 25px rgba(0, 0, 0, 0.4);
  }
`;

const ItemContent = styled.div`
  padding: 20px;
  transform-style: preserve-3d;
  transform: translateZ(15px);
  position: relative;
  z-index: 2;
`;

const ViewMoreButtonContainer = styled(motion.div)`
  display: flex;
  justify-content: center;
  margin-top: 80px;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: -30px;
    left: 50%;
    transform: translateX(-50%);
    width: 100px;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
  }
`;

const ViewMoreButton = styled(motion.button)`
  padding: 16px 40px;
  background: linear-gradient(90deg, #00e5ff, #d500f9);
  border: none;
  border-radius: 12px;
  color: #fff;
  font-size: 1.1rem;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 10px 25px rgba(0, 229, 255, 0.3);
  transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
  letter-spacing: 0.5px;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: all 0.6s ease;
  }

  &:hover::before {
    left: 100%;
  }

  &:hover {
    box-shadow: 0 15px 30px rgba(0, 229, 255, 0.4);
    transform: translateY(-3px);
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 8px 15px rgba(0, 229, 255, 0.3);
  }

  &:focus {
    outline: none;
  }
`;

export default ModernFeaturedWork;
