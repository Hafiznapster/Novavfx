import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

interface ServiceProps {
  title: string;
  description: string;
  icon: string;
  color: string;
  index: number;
  features?: string[];
}

// Animation keyframes
const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

const pulse = keyframes`
  0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(0, 229, 255, 0.4); }
  70% { transform: scale(1.05); box-shadow: 0 0 0 15px rgba(0, 229, 255, 0); }
  100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(0, 229, 255, 0); }
`;

const shimmer = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

const Services = ({ services }: { services: any[] }) => {
  return (
    <ServicesContainer>
      <BackgroundGlow />

      <ServicesHeader
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, type: "spring", stiffness: 100, damping: 15 }}
      >
        <ServicesTitle>Our Expertise</ServicesTitle>
        <ServicesSubtitle>
          Crafting visual magic for films, TV shows, commercials, and digital content
        </ServicesSubtitle>
        <HeaderDivider />
      </ServicesHeader>

      <ServicesGrid
        variants={{
          hidden: { opacity: 0 },
          show: {
            opacity: 1,
            transition: {
              staggerChildren: 0.08,
              delayChildren: 0.1,
              ease: "easeOut",
              duration: 0.6
            }
          }
        }}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-50px" }}
      >
        {services.map((service, index) => (
          <ServiceCard key={service.title} service={service} index={index} />
        ))}
      </ServicesGrid>
    </ServicesContainer>
  );
};

const ServiceCard = ({ service, index }: { service: any, index: number }) => {
  const [isHovered, setIsHovered] = useState(false);

  // Add some example features if they don't exist
  const features = service.features || [
    "High-quality delivery",
    "Expert team",
    "Fast turnaround",
    "Cutting-edge technology"
  ];

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 65,
        damping: 12,
        mass: 1,
        velocity: 2
      }
    }
  };

  return (
    <ServiceCardContainer
      variants={cardVariants}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{
        y: -15,
        boxShadow: `0 25px 50px rgba(0, 0, 0, 0.3), 0 0 40px ${service.color}40`,
        transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }
      }}
      style={{
        borderColor: service.color
      }}
    >
      <ServiceIconContainer
        style={{
          backgroundColor: `${service.color}15`,
          color: service.color,
          boxShadow: isHovered ? `0 0 30px ${service.color}40` : 'none'
        }}
        animate={{
          scale: isHovered ? 1.1 : 1,
          transition: { duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }
        }}
      >
        <ServiceIcon>{service.icon}</ServiceIcon>
      </ServiceIconContainer>

      <ServiceContent>
        <ServiceTitle style={{ color: isHovered ? service.color : 'white' }}>
          {service.title}
        </ServiceTitle>
        <ServiceDescription>{service.description}</ServiceDescription>

        <AnimatePresence>
          {isHovered && (
            <ServiceFeatures
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <FeaturesList>
                {features.map((feature: string, i: number) => (
                  <FeatureItem
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: i * 0.05,
                      duration: 0.3,
                      ease: [0.25, 0.46, 0.45, 0.94]
                    }}
                  >
                    <FeatureIcon style={{ color: service.color }}>✓</FeatureIcon>
                    {feature}
                  </FeatureItem>
                ))}
              </FeaturesList>
            </ServiceFeatures>
          )}
        </AnimatePresence>
      </ServiceContent>

      <ServiceNumber style={{ color: `${service.color}30` }}>0{index + 1}</ServiceNumber>

      <CardGlow
        style={{
          background: `radial-gradient(circle at center, ${service.color}20 0%, transparent 70%)`,
          opacity: isHovered ? 1 : 0,
          filter: 'blur(20px)'
        }}
      />
    </ServiceCardContainer>
  );
};

const BackgroundGlow = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
  height: 80%;
  background: radial-gradient(ellipse at center, rgba(0, 229, 255, 0.05) 0%, transparent 60%);
  filter: blur(100px);
  pointer-events: none;
  z-index: 0;
`;

const ServicesContainer = styled.section`
  padding: 140px 5% 160px;
  background: ${({ theme }) => theme.colors.backgroundDark};
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

const ServicesHeader = styled(motion.div)`
  text-align: center;
  margin-bottom: 80px;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  position: relative;
  z-index: 2;
`;

const ServicesTitle = styled.h2`
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

const ServicesSubtitle = styled.p`
  font-size: 1.3rem;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.7;
  max-width: 600px;
  margin: 0 auto 30px;

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const HeaderDivider = styled.div`
  width: 100px;
  height: 3px;
  background: linear-gradient(90deg, #00e5ff, #d500f9);
  margin: 0 auto;
  border-radius: 3px;
  box-shadow: 0 0 20px rgba(0, 229, 255, 0.5);
`;

const ServicesGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 40px;
  position: relative;
  z-index: 2;
  max-width: 1400px;
  margin: 0 auto;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 30px;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 25px;
  }
`;

const ServiceCardContainer = styled(motion.div)`
  background: rgba(25, 25, 35, 0.85);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 40px 30px;
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-top-width: 3px;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.3), 0 0 20px rgba(0, 0, 0, 0.2);
  height: 100%;
  display: flex;
  flex-direction: column;
  transition: all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  z-index: 1;

  &:hover {
    background: rgba(30, 30, 45, 0.9);
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, transparent 100%);
    pointer-events: none;
  }
`;

const CardGlow = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  transition: opacity 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  z-index: -1;
`;

const ServiceIconContainer = styled(motion.div)`
  width: 80px;
  height: 80px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 25px;
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  position: relative;
  z-index: 2;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 20px;
    background: rgba(255, 255, 255, 0.05);
    z-index: -1;
  }
`;

const ServiceIcon = styled.span`
  font-size: 2.2rem;
  animation: ${float} 3s ease-in-out infinite;
`;

const ServiceContent = styled.div`
  flex: 1;
  position: relative;
  z-index: 2;
`;

const ServiceTitle = styled.h3`
  font-size: 1.4rem;
  font-weight: 700;
  margin-bottom: 15px;
  letter-spacing: 0.5px;
  transition: color 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
`;

const ServiceDescription = styled.p`
  font-size: 1rem;
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 20px;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
`;

const ServiceFeatures = styled(motion.div)`
  overflow: hidden;
  margin-top: 10px;
`;

const FeaturesList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const FeatureItem = styled(motion.li)`
  display: flex;
  align-items: center;
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 12px;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
`;

const FeatureIcon = styled.span`
  margin-right: 10px;
  font-weight: bold;
  font-size: 1rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

const ServiceNumber = styled.div`
  position: absolute;
  bottom: 20px;
  right: 20px;
  font-size: 6rem;
  font-weight: 900;
  opacity: 0.15;
  line-height: 1;
  z-index: 1;
`;

export default Services;
