import styled from 'styled-components';
import { motion } from 'framer-motion';

export const Container = styled.div`
  position: relative;
  width: 100%;
  min-height: 100vh;
  overflow: hidden;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.8s cubic-bezier(0.65, 0, 0.35, 1), transform 0.8s cubic-bezier(0.65, 0, 0.35, 1);

  &.loaded.show-content {
    opacity: 1;
    transform: translateY(0);
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle at top right, rgba(245, 185, 95, 0.1), transparent 50%),
                radial-gradient(circle at bottom left, rgba(232, 169, 72, 0.1), transparent 50%);
    z-index: 0;
    pointer-events: none;
  }

  .device-frame {
    width: 100%;
    max-width: 1200px;
    height: 90vh;
    background: ${props => props.theme.colors.backgroundLight};
    border-radius: 24px;
    overflow: hidden;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    position: relative;
    border: 1px solid rgba(0, 0, 0, 0.1);
    margin-bottom: 4rem;
  }

  .device-nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 2rem;
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  }

  .device-logo {
    font-weight: 700;
    font-size: 1.2rem;
    letter-spacing: 0.05em;
  }

  .device-menu {
    display: flex;
    gap: 2rem;
    font-size: 1rem;
    color: rgba(255, 255, 255, 0.7);

    span {
      cursor: pointer;
      transition: all 0.3s ease;
      position: relative;

      &:hover {
        color: #fff;
      }

      &.active {
        color: #00bfff;
        font-weight: 600;

        &:after {
          width: 100%;
        }
      }

      &:after {
        content: '';
        position: absolute;
        bottom: -5px;
        left: 0;
        width: 0;
        height: 2px;
        background-color: #00bfff;
        transition: width 0.3s ease;
      }
    }
  }

  .device-actions {
    display: flex;
    align-items: center;
    gap: 1.5rem;
  }

  .connect-btn {
    background: ${props => props.theme.colors.primary};
    color: ${props => props.theme.colors.backgroundLight};
    padding: 0.5rem 1rem;
    border-radius: 50px;
    font-weight: 600;
    font-size: 0.9rem;
    transition: all 0.3s ease;

    &:hover {
      background: #111;
      transform: translateY(-2px);
    }
  }

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    padding: 1rem;

    .device-frame {
      height: auto;
      min-height: 80vh;
    }

    .device-nav {
      padding: 1rem;
    }

    .device-menu {
      display: none;
    }
  }
`;

export const GradientBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(45deg,
    ${props => props.theme.colors.background},
    ${props => props.theme.colors.backgroundLight});
  background-size: 400% 400%;
  z-index: 0;
  pointer-events: none;
  opacity: 0.8;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url('/noise.png');
    opacity: 0.05;
    mix-blend-mode: overlay;
  }
`;

export const Content = styled.div`
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.xl};

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    gap: ${props => props.theme.spacing.lg};
  }
`;

export const HeroSection = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 2rem;
  overflow: hidden;

  .hero-content-wrapper {
    display: flex;
    flex: 1;
    width: 100%;
  }

  .hero-text-container {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    padding-right: 2rem;
  }

  .hero-visual-container {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
  }

  .hero-3d-element {
    width: 100%;
    height: 400px;
    background-image: url('/images/kiteboarding.svg');
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    transform: perspective(1000px) rotateY(-10deg);
    transition: transform 0.5s ease;

    &:hover {
      transform: perspective(1000px) rotateY(-5deg);
    }
  }

  .hero-icon-container {
    margin-bottom: 1rem;
  }

  .hero-icon {
    width: 60px;
    height: 60px;
    background-image: url('/images/checklist.svg');
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
  }

  .hero-title-line1,
  .hero-title-line2,
  .hero-title-line3 {
    text-align: left;
    line-height: 1.1;
    margin: 0;
  }

  .device-footer {
    display: flex;
    justify-content: flex-end;
    padding: 1rem 0;
  }

  .device-mode {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.9rem;
  }

  .toggle-switch {
    display: flex;
    background: #e0e0e0;
    border-radius: 1rem;
    padding: 0.2rem;
    font-size: 0.8rem;
  }

  .toggle-on {
    background: #000;
    color: #fff;
    padding: 0.2rem 0.5rem;
    border-radius: 0.8rem;
  }

  .toggle-off {
    padding: 0.2rem 0.5rem;
  }

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    padding: 1.5rem;

    .hero-content-wrapper {
      flex-direction: column;
    }

    .hero-text-container {
      padding-right: 0;
      align-items: center;
      text-align: center;
      margin-bottom: 2rem;
    }

    .hero-title-line1,
    .hero-title-line2,
    .hero-title-line3 {
      text-align: center;
    }

    .hero-icon-container {
      display: flex;
      justify-content: center;
    }
  }
`;

export const HeroImageOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  opacity: 0.15;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to bottom,
      rgba(10, 10, 20, 0.7) 0%,
      rgba(10, 10, 20, 0.4) 50%,
      rgba(10, 10, 20, 0.8) 100%);
  }
`;

export const HeroImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: blur(6px) contrast(110%) saturate(120%);
  transform: scale(1.1);
  transition: all 5s ease-out;

  &:hover {
    transform: scale(1.15);
  }
`;

export const Title = styled.h1`
  font-size: 4.5rem;
  margin: 0;
  background: linear-gradient(45deg, ${props => props.theme.colors.primary}, ${props => props.theme.colors.secondary});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 0 30px rgba(0, 229, 255, 0.3);
  letter-spacing: -0.02em;
  font-weight: ${props => props.theme.fontWeights.bold};
  line-height: 1.1;
  position: relative;
  z-index: 2;

  &::after {
    content: attr(data-text);
    position: absolute;
    left: 2px;
    top: 2px;
    z-index: -1;
    background: linear-gradient(45deg, ${props => props.theme.colors.secondary}, ${props => props.theme.colors.primary});
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    opacity: 0.4;
  }

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    font-size: 3.2rem;
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 2.5rem;
  }
`;

export const Description = styled(motion.p)`
  font-size: 1rem;
  max-width: 450px;
  margin: 1.5rem 0;
  line-height: 1.6;
  color: ${props => props.theme.colors.textSecondary};
  font-weight: ${props => props.theme.fontWeights.regular};
  position: relative;
  z-index: 2;
  text-align: left;

  strong {
    color: ${props => props.theme.colors.primary};
    font-weight: ${props => props.theme.fontWeights.medium};
  }

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    text-align: center;
    margin: 1.5rem auto;
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 0.9rem;
  }
`;

export const ServicesSection = styled.section`
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.8s ease, transform 0.8s ease;
  margin-top: 2rem;

  &.animate-in {
    opacity: 1;
    transform: translateY(0);
  }
  width: 100%;
  text-align: center;
  padding: 7rem 0 4rem;
  position: relative;
  background-color: var(--dark-bg-color);
  color: white;
  margin: 5rem 0;
  border-radius: var(--card-border-radius);
  overflow: hidden;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.2);

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 2px;
    height: 120px;
    background: linear-gradient(to bottom, ${props => props.theme.colors.secondary}, transparent);
    opacity: 0.6;
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle at top right, rgba(245, 185, 95, 0.05), transparent 60%);
    pointer-events: none;
  }
`;

export const ServiceGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2.5rem;
  margin-top: 4.5rem;
  width: 100%;
  max-width: 1400px;
  padding: 0 3rem;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 2rem;
    margin-top: 3.5rem;
    padding: 0 1.5rem;
  }
`;

export const ServiceCard = styled.div`
  background: var(--card-bg-color);
  border-radius: var(--card-border-radius);
  padding: 2.5rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
  position: relative;
  overflow: hidden;
  transition: var(--transition-smooth);
  z-index: 1;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.08);
  color: white;
  backdrop-filter: blur(10px);

  &:hover {
    transform: translateY(-10px);
    box-shadow: var(--card-hover-shadow);
    border-color: rgba(245, 185, 95, 0.2);
  }

  .service-number {
    position: absolute;
    bottom: 1rem;
    right: 1.5rem;
    font-size: 2.5rem;
    font-weight: 700;
    opacity: 0.15;
    color: var(--secondary-color);
    transition: var(--transition-smooth);
  }

  &:hover .service-number {
    opacity: 0.3;
    transform: scale(1.1);
  }

  h3 {
    margin: 1.5rem 0 1rem;
    font-size: 1.5rem;
    color: white;
    position: relative;
    z-index: 2;
    font-weight: 600;
    letter-spacing: -0.01em;
  }

  p {
    color: rgba(255, 255, 255, 0.7);
    margin-bottom: 0;
    position: relative;
    z-index: 2;
    font-size: 0.95rem;
    line-height: 1.6;
  }
`;

export const ServiceIcon = styled.div`
  width: 60px;
  height: 60px;
  margin: 0 0 1.8rem;
  background: var(--icon-bg-color);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 2;
  transition: var(--transition-smooth);
  box-shadow: 0 5px 15px rgba(245, 185, 95, 0.1);

  &::before {
    font-size: 28px;
    transition: var(--transition-smooth);
    color: var(--icon-color);
  }

  &.service-icon-0:before { content: '🌐'; }
  &.service-icon-1:before { content: '📊'; }
  &.service-icon-2:before { content: '🎨'; }
  &.service-icon-3:before { content: '🛒'; }
  &.service-icon-4:before { content: '📱'; }
  &.service-icon-5:before { content: '🔒'; }

  ${ServiceCard}:hover & {
    transform: translateY(-5px);
    background: var(--secondary-color);

    &::before {
      color: var(--dark-bg-color);
    }
  }
`;

export const ServiceCardOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, rgba(245, 185, 95, 0.08) 0%, rgba(232, 169, 72, 0.15) 100%);
  z-index: 0;
  opacity: 0;
  transition: var(--transition-smooth);
  border-left: 4px solid transparent;
  border-radius: var(--card-border-radius);

  ${ServiceCard}:hover & {
    opacity: 1;
    border-left: 4px solid var(--secondary-color);
  }
`;

export const PortfolioSection = styled.section`
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.8s ease, transform 0.8s ease;

  &.animate-in {
    opacity: 1;
    transform: translateY(0);
  }
  width: 100%;
  text-align: center;
  padding: 6rem 0 3rem;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 1px;
    height: 100px;
    background: linear-gradient(to bottom, ${props => props.theme.colors.secondary}, transparent);
    opacity: 0.5;
  }
`;

export const PortfolioGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, auto);
  gap: 1rem;
  margin-top: 2rem;
  width: 100%;

  /* Create a more interesting layout with different sized items */
  & > :nth-child(1) {
    grid-column: 1 / 2;
    grid-row: 1 / 2;
  }
  & > :nth-child(2) {
    grid-column: 2 / 3;
    grid-row: 1 / 2;
  }
  & > :nth-child(3) {
    grid-column: 3 / 4;
    grid-row: 1 / 2;
  }
  & > :nth-child(4) {
    grid-column: 1 / 2;
    grid-row: 2 / 3;
  }
  & > :nth-child(5) {
    grid-column: 2 / 3;
    grid-row: 2 / 3;
  }
  & > :nth-child(6) {
    grid-column: 3 / 4;
    grid-row: 2 / 3;
  }
  & > :nth-child(7) {
    grid-column: 1 / 3;
    grid-row: 3 / 4;
  }
  & > :nth-child(8) {
    grid-column: 3 / 4;
    grid-row: 3 / 4;
  }

  @media (max-width: ${props => props.theme.breakpoints.desktop}) {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: auto;
    gap: 1rem;

    & > :nth-child(n) {
      grid-column: auto;
      grid-row: auto;
    }
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

export const PortfolioItem = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: ${props => props.theme.borderRadius.medium};
  box-shadow: ${props => props.theme.shadows.small};
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
  border: 1px solid rgba(0, 0, 0, 0.05);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
  }

  .overlay {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: 1.5rem;
    background: linear-gradient(to top, rgba(245, 242, 234, 0.9), transparent);
    color: ${props => props.theme.colors.text};
    transform: translateY(100%);
    transition: transform 0.3s ease;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  h3 {
    margin: 0 0 0.5rem;
    font-size: 1.2rem;
  }

  p {
    margin: 0;
    font-size: 0.9rem;
    color: ${props => props.theme.colors.textSecondary};
  }

  &:hover {
    transform: translateY(-5px);
    box-shadow: ${props => props.theme.shadows.medium};

    img {
      transform: scale(1.05);
    }

    .overlay {
      transform: translateY(0);
    }
  }
`;

export const SectionTitle = styled.div`
  text-align: center;
  margin-bottom: 3rem;
  position: relative;
  z-index: 1;
  padding: 2rem 0;

  h2, h3 {
    font-family: var(--font-heading);
    letter-spacing: -0.02em;
    font-size: 2.8rem;
    font-weight: 700;
    background: linear-gradient(90deg, #FFFFFF, var(--secondary-color));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    display: inline-block;
  }
`;

export const SectionDivider = styled.div`
  width: 120px;
  height: 4px;
  background: linear-gradient(90deg, var(--secondary-color), rgba(255, 255, 255, 0.5));
  margin: 1rem auto 0;
  border-radius: 2px;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: -3px;
    width: 10px;
    height: 10px;
    background: var(--secondary-color);
    border-radius: 50%;
  }
`;

export const PortfolioCategories = styled.div`
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  margin: 2rem 0 3rem;
  flex-wrap: wrap;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    gap: 1rem;
    margin: 1.5rem 0 2.5rem;
  }
`;

export const PortfolioCategory = styled.button<{ active?: boolean }>`
  padding: 0.6rem 1.2rem;
  background: ${props => props.active ? 'rgba(0, 229, 255, 0.15)' : 'rgba(255, 255, 255, 0.03)'};
  border: 1px solid ${props => props.active ? props.theme.colors.primary : 'rgba(255, 255, 255, 0.1)'};
  border-radius: ${props => props.theme.borderRadius.pill};
  color: ${props => props.active ? props.theme.colors.primary : props.theme.colors.textSecondary};
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.95rem;
  font-weight: ${props => props.active ? props.theme.fontWeights.medium : props.theme.fontWeights.regular};
  box-shadow: ${props => props.active ? props.theme.shadows.small : 'none'};
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(45deg,
      rgba(0, 229, 255, 0.1),
      rgba(213, 0, 249, 0.1));
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover {
    background: rgba(0, 229, 255, 0.08);
    border-color: ${props => props.theme.colors.primary};
    color: ${props => props.theme.colors.text};
    transform: translateY(-2px);
    box-shadow: ${props => props.theme.shadows.small};

    &::before {
      opacity: 1;
    }
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    padding: 0.5rem 1rem;
    font-size: 0.85rem;
  }
`;

export const PortfolioItemButton = styled.button`
  background: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.backgroundLight};
`;

export const ViewMoreButton = styled.button`
  margin: 4rem auto 0;
  padding: 1rem 2.5rem;
  background: transparent;
  border: 2px solid ${props => props.theme.colors.primary};
  border-radius: ${props => props.theme.borderRadius.pill};
  color: ${props => props.theme.colors.text};
  cursor: pointer;
  transition: all 0.3s ease;
  display: block;
  font-size: 1.1rem;
  font-weight: ${props => props.theme.fontWeights.medium};
  letter-spacing: 0.5px;
  position: relative;
  overflow: hidden;
  z-index: 1;
  box-shadow: ${props => props.theme.shadows.small};

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(45deg,
      rgba(0, 229, 255, 0.1),
      rgba(213, 0, 249, 0.1));
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: -1;
  }

  &:hover {
    background: rgba(0, 229, 255, 0.05);
    transform: translateY(-3px);
    box-shadow: ${props => props.theme.shadows.medium};

    &::before {
      opacity: 1;
    }
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    margin: 3rem auto 0;
    padding: 0.8rem 2rem;
    font-size: 1rem;
  }
`;

export const CTAButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
  z-index: 2;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    justify-content: center;
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    width: 100%;
    justify-content: center;
  }
`;

export const CTAButton = styled.button`
  background: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.backgroundLight};
  font-weight: ${props => props.theme.fontWeights.semiBold};
  font-size: 0.9rem;
  padding: 0.75rem 1.5rem;
  border-radius: ${props => props.theme.borderRadius.pill};
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  z-index: 1;

  &:hover {
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.15);
    transform: translateY(-3px);
    background: #111111;
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }
`;

export const CTAButtonSecondary = styled.button`
  background: transparent;
  color: ${props => props.theme.colors.primary};
  font-weight: ${props => props.theme.fontWeights.semiBold};
  font-size: 1rem;
  padding: 0.75rem 2rem;
  border-radius: ${props => props.theme.borderRadius.pill};
  border: 2px solid ${props => props.theme.colors.primary};
  transition: all 0.3s ease;

  &:hover {
    background: rgba(0, 0, 0, 0.05);
    transform: translateY(-3px);
  }

  &:active {
    transform: translateY(0);
  }
`;

export const ScrollIndicator = styled.div`
  position: absolute;
  bottom: 1.5rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  opacity: 0.7;
  transition: opacity 0.3s ease;
  z-index: 10;

  &:hover {
    opacity: 1;
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    bottom: 1rem;
  }
`;

export const ScrollText = styled.span`
  font-size: 0.8rem;
  font-weight: ${props => props.theme.fontWeights.medium};
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: ${props => props.theme.colors.textSecondary};
`;

export const ScrollIcon = styled.div`
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

export const TestimonialsSection = styled(motion.section)`
  margin-top: 6rem;
  text-align: center;
  padding: 4rem 0;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 10px;
`;

export const TestimonialGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
  padding: 0 2rem;
`;

export const TestimonialCard = styled.div`
  padding: 2rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
  transition: all 0.3s ease;
  position: relative;

  &:before {
    content: '"';
    position: absolute;
    top: 1rem;
    left: 1rem;
    font-size: 4rem;
    color: rgba(0, 255, 255, 0.2);
    font-family: serif;
    line-height: 1;
  }

  &:hover {
    transform: translateY(-5px);
    background: rgba(255, 255, 255, 0.1);
  }
`;

export const TestimonialQuote = styled.p`
  font-style: italic;
  margin-bottom: 1.5rem;
  line-height: 1.6;
`;

export const TestimonialAuthor = styled.p`
  font-weight: bold;
  color: ${props => props.theme.colors.primary};
`;

export const ContactSection = styled(motion.section)`
  margin-top: 6rem;
  text-align: center;
  padding-bottom: 4rem;
`;

export const ContactContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 3rem;
  margin-top: 3rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const ContactInfo = styled.div`
  text-align: left;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
`;

export const ContactInfoItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;

  p {
    margin-left: 1rem;
  }
`;

export const ContactInfoIcon = styled.div`
  width: 40px;
  height: 40px;
  background: linear-gradient(45deg, ${props => props.theme.colors.primary}, ${props => props.theme.colors.secondary});
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;

  &.location-icon:before { content: '📍'; }
  &.email-icon:before { content: '✉️'; }
  &.phone-icon:before { content: '📱'; }
`;

export const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
`;

export const SocialLink = styled.a`
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: linear-gradient(45deg, ${props => props.theme.colors.primary}, ${props => props.theme.colors.secondary});
    transform: translateY(-3px);
  }

  &.instagram:before { content: '📸'; }
  &.twitter:before { content: '🐦'; }
  &.vimeo:before { content: '🎬'; }
  &.linkedin:before { content: '💼'; }
`;

export const ContactForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  text-align: left;
`;

export const ContactInput = styled.input`
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 5px;
  color: white;
  font-size: 1rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
    background: rgba(255, 255, 255, 0.1);
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
`;

export const ContactTextarea = styled.textarea`
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 5px;
  color: white;
  font-size: 1rem;
  min-height: 150px;
  resize: vertical;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
    background: rgba(255, 255, 255, 0.1);
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
`;
