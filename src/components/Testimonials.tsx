import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

interface TestimonialProps {
  quote: string;
  author: string;
  role: string;
  image?: string;
}

const testimonials: TestimonialProps[] = [
  {
    quote: "The team at Nova VFX delivered beyond our expectations. Their visual effects transformed our project into something truly extraordinary. The attention to detail and creative solutions they provided elevated our film to a whole new level.",
    author: "Sarah Johnson",
    role: "Film Director",
    image: "/images/testimonial1.jpg"
  },
  {
    quote: "Working with this studio was a game-changer for our brand. Their creative vision and technical expertise are unmatched. They understood our concept immediately and executed it flawlessly, delivering ahead of schedule.",
    author: "Michael Chen",
    role: "Marketing Director",
    image: "/images/testimonial2.jpg"
  },
  {
    quote: "From concept to execution, they handled everything with professionalism and delivered stunning results on time. Their team's collaborative approach made the entire process smooth and enjoyable.",
    author: "Emma Rodriguez",
    role: "Creative Producer",
    image: "/images/testimonial3.jpg"
  },
  {
    quote: "The VFX work they did for our sci-fi series was mind-blowing. They took our vision and enhanced it beyond what we thought possible, all while staying within budget and timeline constraints.",
    author: "David Patel",
    role: "TV Producer",
    image: "/images/testimonial4.jpg"
  }
];

const Testimonials = () => {
  const [current, setCurrent] = useState(0);
  const [autoplay, setAutoplay] = useState(true);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (autoplay) {
      interval = setInterval(() => {
        setCurrent(prev => (prev + 1) % testimonials.length);
      }, 5000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [autoplay]);

  const handleDotClick = (index: number) => {
    setCurrent(index);
    setAutoplay(false);

    // Resume autoplay after 10 seconds of inactivity
    setTimeout(() => setAutoplay(true), 10000);
  };

  const handleNext = () => {
    setCurrent(prev => (prev + 1) % testimonials.length);
    setAutoplay(false);
    setTimeout(() => setAutoplay(true), 10000);
  };

  const handlePrev = () => {
    setCurrent(prev => (prev - 1 + testimonials.length) % testimonials.length);
    setAutoplay(false);
    setTimeout(() => setAutoplay(true), 10000);
  };

  return (
    <TestimonialsContainer>
      <TestimonialsHeader
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <TestimonialsTitle>Client Testimonials</TestimonialsTitle>
        <TestimonialsSubtitle>
          What our clients say about our work and collaboration
        </TestimonialsSubtitle>
      </TestimonialsHeader>

      <TestimonialsSlider>
        <AnimatePresence mode="wait">
          <TestimonialSlide
            key={current}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <QuoteIcon>"</QuoteIcon>
            <TestimonialQuote>{testimonials[current].quote}</TestimonialQuote>
            <TestimonialAuthorInfo>
              <TestimonialAuthor>{testimonials[current].author}</TestimonialAuthor>
              <TestimonialRole>{testimonials[current].role}</TestimonialRole>
            </TestimonialAuthorInfo>
          </TestimonialSlide>
        </AnimatePresence>

        <SliderControls>
          <SliderArrow onClick={handlePrev}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </SliderArrow>

          <SliderDots>
            {testimonials.map((_, index) => (
              <SliderDot
                key={index}
                $active={index === current}
                onClick={() => handleDotClick(index)}
              />
            ))}
          </SliderDots>

          <SliderArrow onClick={handleNext}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </SliderArrow>
        </SliderControls>
      </TestimonialsSlider>
    </TestimonialsContainer>
  );
};

const TestimonialsContainer = styled.section`
  padding: 120px 5% 140px;
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
    background: radial-gradient(circle at 80% 20%, rgba(0, 229, 255, 0.05) 0%, transparent 50%),
                radial-gradient(circle at 20% 80%, rgba(213, 0, 249, 0.05) 0%, transparent 50%);
    pointer-events: none;
  }
`;

const TestimonialsHeader = styled(motion.div)`
  text-align: center;
  margin-bottom: 80px;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
`;

const TestimonialsTitle = styled.h2`
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 20px;
  background: linear-gradient(90deg, #00e5ff, #d500f9);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const TestimonialsSubtitle = styled.p`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.6;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const TestimonialsSlider = styled.div`
  max-width: 900px;
  margin: 0 auto;
  position: relative;
`;

const TestimonialSlide = styled(motion.div)`
  background: rgba(15, 15, 20, 0.6);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 60px 40px 40px;
  position: relative;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  min-height: 300px;
  display: flex;
  flex-direction: column;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, transparent 100%);
    pointer-events: none;
    border-radius: 16px;
  }

  @media (max-width: 768px) {
    padding: 50px 30px 30px;
  }
`;

const QuoteIcon = styled.div`
  position: absolute;
  top: 20px;
  left: 30px;
  font-size: 6rem;
  font-family: Georgia, serif;
  color: rgba(0, 229, 255, 0.2);
  line-height: 1;
`;

const TestimonialQuote = styled.p`
  font-size: 1.2rem;
  line-height: 1.8;
  margin-bottom: 30px;
  flex: 1;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const TestimonialAuthorInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const TestimonialAuthor = styled.h4`
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 5px;
  color: ${({ theme }) => theme.colors.primary};
`;

const TestimonialRole = styled.p`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const SliderControls = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 40px;
`;

const SliderArrow = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.textSecondary};
  cursor: pointer;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.3s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const SliderDots = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 20px;
`;

const SliderDot = styled.button<{ $active: boolean }>`
  width: ${props => props.$active ? '12px' : '8px'};
  height: ${props => props.$active ? '12px' : '8px'};
  border-radius: 50%;
  background: ${props => props.$active ? 'linear-gradient(90deg, #00e5ff, #d500f9)' : 'rgba(255, 255, 255, 0.2)'};
  margin: 0 5px;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${props => props.$active ? 'linear-gradient(90deg, #00e5ff, #d500f9)' : 'rgba(255, 255, 255, 0.4)'};
  }
`;

export default Testimonials;
