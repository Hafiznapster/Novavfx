import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import ExpertiseIcon3D from './ExpertiseIcon3D';

interface ServiceProps {
  title: string;
  description: string;
  icon: string;
  color: string;
  index: number;
}

const Services3D = ({ services }: { services: any[] }) => {
  return (
    <ServicesContainer>
      <ServicesHeader
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <ServicesTitle>Our Expertise</ServicesTitle>
        <ServicesSubtitle>
          Crafting visual magic for films, TV shows, commercials, and digital content
        </ServicesSubtitle>
      </ServicesHeader>

      <ServicesGrid>
        {services.map((service, index) => (
          <ServiceCard key={service.title} service={service} index={index} />
        ))}
      </ServicesGrid>
    </ServicesContainer>
  );
};

const ServiceCard = ({ service, index }: { service: any, index: number }) => {
  const [isHovered, setIsHovered] = useState(false);

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.6,
        ease: [0.215, 0.61, 0.355, 1]
      }
    })
  };

  return (
    <ServiceCardContainer
      custom={index}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{ y: -15, scale: 1.02 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      style={{
        borderColor: service.color,
        boxShadow: isHovered ? `0 20px 40px rgba(0, 0, 0, 0.3), 0 0 30px ${service.color}40` : 'none'
      }}
    >
      <ServiceIconContainer style={{ color: service.color }}>
        <ExpertiseIcon3D color={service.color} icon={service.icon} size={80} />
      </ServiceIconContainer>
      <ServiceContent>
        <ServiceTitle>{service.title}</ServiceTitle>
        <ServiceDescription>{service.description}</ServiceDescription>
      </ServiceContent>
      <ServiceNumber style={{ color: `${service.color}30` }}>0{index + 1}</ServiceNumber>

      {/* Animated glow effect on hover */}
      <AnimatePresence>
        {isHovered && (
          <GlowEffect
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{ background: `radial-gradient(circle at center, ${service.color}20 0%, transparent 70%)` }}
          />
        )}
      </AnimatePresence>
    </ServiceCardContainer>
  );
};

const ServicesContainer = styled.section`
  padding: 120px 5% 140px;
  background: #0a0a0f;
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
      radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.03) 0%, transparent 70%);
    pointer-events: none;
    filter: blur(80px);
    transform: scale(1.2);
  }
`;

const ServicesHeader = styled(motion.div)`
  text-align: center;
  margin-bottom: 80px;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
`;

const ServicesTitle = styled.h2`
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 20px;
  background: linear-gradient(90deg, #00e5ff, #d500f9);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
  letter-spacing: -0.5px;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const ServicesSubtitle = styled.p`
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.6;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 30px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ServiceCardContainer = styled(motion.div)`
  background: rgba(15, 15, 25, 0.7);
  backdrop-filter: blur(12px);
  border-radius: 24px;
  padding: 40px 30px;
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  height: 100%;
  display: flex;
  flex-direction: column;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, transparent 100%);
    pointer-events: none;
    opacity: 0.5;
    transition: opacity 0.3s ease;
  }

  &:hover::before {
    opacity: 0.8;
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 24px;
    padding: 2px;
    background: linear-gradient(135deg, var(--color), transparent);
    -webkit-mask:
      linear-gradient(#fff 0 0) content-box,
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover::after {
    opacity: 1;
  }
`;

const ServiceIconContainer = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 25px;
  position: relative;
  z-index: 2;
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
  letter-spacing: 1px;
  color: white;
  background: linear-gradient(90deg, #fff, rgba(255, 255, 255, 0.7));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
`;

const ServiceDescription = styled.p`
  font-size: 1rem;
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.7);
  transition: color 0.3s ease;

  ${ServiceCardContainer}:hover & {
    color: rgba(255, 255, 255, 0.9);
  }
`;

const ServiceNumber = styled.div`
  position: absolute;
  bottom: 20px;
  right: 20px;
  font-size: 5rem;
  font-weight: 800;
  opacity: 0.2;
  line-height: 1;
`;

const GlowEffect = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  pointer-events: none;
`;

export default Services3D;