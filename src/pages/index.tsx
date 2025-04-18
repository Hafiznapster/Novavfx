import { NextPage } from 'next';
import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import ScrollProgressBar from '@/components/ScrollProgressBar';
import AnimatedText from '@/components/AnimatedText';
import GradientBackground from '@/components/GradientBackground';
import ScrollIcon from '@/components/ScrollIcon';
import ModernFeaturedWork from '@/components/ModernFeaturedWork';
import Services from '@/components/Services';
import Testimonials from '@/components/Testimonials';
import Contact from '@/components/Contact';
import Navbar from '@/components/Navbar';
import LoadingScreen from '@/components/LoadingScreen';
// Lazy load heavy components for better initial load performance
const Background3D = dynamic(() => import('@/components/Background3D'), { ssr: false });
const ParticleEffect = dynamic(() => import('@/components/ParticleEffect'), { ssr: false });
import {
  Container,
  Content,
  HeroSection,
  Description,
  CTAButton,
  CTAButtonGroup,
  ScrollIndicator,
  ScrollText
} from '@/styles/HomeStyles';

const HomePage: NextPage = () => {
  const servicesRef = useRef<HTMLDivElement>(null);
  const portfolioRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState('hero');
  const [isLoaded, setIsLoaded] = useState(false);
  const [showContent, setShowContent] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (!element) return;
    const offset = element.offsetTop;
    window.scrollTo({
      top: offset,
      behavior: 'smooth'
    });
  };

  const handleLoadingComplete = () => {
    setShowContent(true);
    setIsLoaded(true);
  };

  // Initialize smooth scrolling and animations
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'services', 'portfolio', 'contact'].map(section => {
        const element = document.getElementById(section);
        if (!element) return { id: section, offset: 0 };
        return {
          id: section,
          offset: Math.abs(element.getBoundingClientRect().top)
        };
      });

      const closest = sections.reduce((prev, curr) =>
        prev.offset < curr.offset ? prev : curr
      );

      setActiveSection(closest.id);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Setup intersection observer for animations
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-50px',
      threshold: [0.1, 0.2, 0.3, 0.4, 0.5] // Multiple thresholds for smoother animations
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Add animate-in class with a slight delay based on intersection ratio
          const delay = Math.floor((1 - entry.intersectionRatio) * 200);
          setTimeout(() => {
            entry.target.classList.add('animate-in');
          }, delay);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);

    // Observe sections if they exist
    if (servicesRef.current) {
      observer.observe(servicesRef.current);
    }
    if (portfolioRef.current) {
      observer.observe(portfolioRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Setup smooth scrolling behavior
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = '';
    };
  }, []);

  const services = [
    {
      title: 'VISUAL EFFECTS',
      description: 'Cutting-edge VFX solutions that seamlessly blend reality and imagination, from complex compositing to photorealistic CG elements.',
      icon: '✨',
      color: '#00e5ff'
    },
    {
      title: '3D ANIMATION',
      description: 'Breathtaking character and environment animation that brings stories to life with emotion, fluidity, and cinematic quality.',
      icon: '🎬',
      color: '#d500f9'
    },
    {
      title: 'MOTION DESIGN',
      description: 'Dynamic motion graphics and kinetic typography that elevate brands and create memorable visual experiences across all platforms.',
      icon: '⚡',
      color: '#ff9100'
    },
    {
      title: 'CONCEPT ART',
      description: 'Visionary concept art and pre-visualization that transforms ideas into compelling visual narratives before production begins.',
      icon: '🎨',
      color: '#76ff03'
    },
    {
      title: 'COLOR GRADING',
      description: 'Precision color grading that enhances mood, atmosphere, and visual continuity, giving your project a distinctive cinematic look.',
      icon: '🌈',
      color: '#ff3d00'
    },
    {
      title: 'VIRTUAL PRODUCTION',
      description: 'Innovative virtual production solutions combining real-time rendering and LED technology to create immersive filming environments.',
      icon: '🌐',
      color: '#651fff'
    }
  ];

  // Portfolio items are now managed in the FeaturedWork component

  return (
    <>
      <LoadingScreen onLoadingComplete={handleLoadingComplete} />
      <Container className={`${isLoaded ? 'loaded' : ''} ${showContent ? 'show-content' : ''}`}>
        <ScrollProgressBar color="linear-gradient(90deg, #000000, #F5B95F)" height={4} position="top" />
        <Navbar />
        <Background3D />
        <ParticleEffect count={60} color="#F5B95F" size={1.5} speed={0.8} interactive={false} />
        <GradientBackground className="gradient-bg" />
        <Content>
        <div className="device-frame">
          <div className="device-nav">
            <div className="device-logo">NOVA VFX</div>
            <div className="device-menu">
              <span
                onClick={() => scrollToSection('portfolio')}
                className={activeSection === 'portfolio' ? 'active' : ''}
              >Portfolio</span>
              <span
                onClick={() => scrollToSection('services')}
                className={activeSection === 'services' ? 'active' : ''}
              >Services</span>
              <span
                onClick={() => scrollToSection('portfolio')}
                className={activeSection === 'portfolio' ? 'active' : ''}
              >Studio</span>
              <span
                onClick={() => scrollToSection('contact')}
                className={activeSection === 'contact' ? 'active' : ''}
              >Contact</span>
            </div>
            <div className="device-actions">
              <span>EN</span>
              <button className="connect-btn">Our Work</button>
            </div>
          </div>
          <HeroSection id="hero" className="hero-content">
            <div className="hero-content-wrapper">
              <div className="hero-text-container">
                <div className="hero-icon-container">
                  <div className="hero-icon"></div>
                </div>
                <AnimatedText
                  text="Bringing"
                  animation="fadeIn"
                  delay={800}
                  duration={1000}
                  fontSize="3.5rem"
                  fontWeight="700"
                  className="hero-title-line1"
                />
                <AnimatedText
                  text="Imagination"
                  animation="fadeIn"
                  delay={1000}
                  duration={1000}
                  fontSize="3.5rem"
                  fontWeight="700"
                  className="hero-title-line2"
                />
                <AnimatedText
                  text="to Life"
                  animation="fadeIn"
                  delay={1200}
                  duration={1000}
                  fontSize="3.5rem"
                  fontWeight="700"
                  className="hero-title-line3"
                />
                <Description className="hero-description animate-in delay-300">
                  Award-winning VFX studio specializing in high-end visual effects, 3D animation, and digital content creation for film, TV, and advertising.
                </Description>
                <CTAButtonGroup>
                  <CTAButton className="cta-button">
                    View Our Showreel
                  </CTAButton>
                </CTAButtonGroup>
              </div>
              <div className="hero-visual-container">
                <div className="hero-3d-element"></div>
              </div>
            </div>
            <div className="device-footer">
              <div className="device-mode">
                <span>Dark mode:</span>
                <div className="toggle-switch">
                  <span className="toggle-on">On</span>
                  <span className="toggle-off">Off</span>
                </div>
              </div>
            </div>
            <ScrollIndicator>
              <ScrollText>Scroll to explore</ScrollText>
              <ScrollIcon />
            </ScrollIndicator>
          </HeroSection>
        </div>

        <div id="services" ref={servicesRef}>
          <Services services={services} />
        </div>

        <div id="portfolio" ref={portfolioRef}>
          <ModernFeaturedWork />
        </div>

        <Testimonials />

        <div id="contact">
          <Contact />
        </div>
        </Content>
      </Container>
    </>
  );
};

export default HomePage;