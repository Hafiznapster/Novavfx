import React from 'react';
import styled, { keyframes } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

// Animation keyframes
const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

const pulse = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(0, 229, 255, 0.4); }
  70% { box-shadow: 0 0 0 15px rgba(0, 229, 255, 0); }
  100% { box-shadow: 0 0 0 0 rgba(0, 229, 255, 0); }
`;

const shimmer = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

const Contact = () => {
  return (
    <ContactContainer>
      <DecorativeCircle className="circle-1" />
      <DecorativeCircle className="circle-2" />
      <DecorativeCircle className="circle-3" />

      <ContactHeader
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <ContactTitle>Let's Create Together</ContactTitle>
        <ContactSubtitle>
          Ready to bring your vision to life? Get in touch with our team.
        </ContactSubtitle>
      </ContactHeader>

      <ContactContent>
        <ContactInfoSection
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <ContactInfoCard>
            <ContactInfoHeader>
              <ContactInfoTitle>Contact Information</ContactInfoTitle>
              <ContactInfoSubtitle>
                Reach out to us through any of these channels
              </ContactInfoSubtitle>
            </ContactInfoHeader>

            <ContactInfoList>
              <ContactInfoItem>
                <ContactInfoIcon>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.364 3.63604C20.0518 5.32387 21 7.61305 21 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </ContactInfoIcon>
                <ContactInfoText>
                  <ContactInfoLabel>Studio Location</ContactInfoLabel>
                  <ContactInfoValue>8721 Sunset Blvd, Los Angeles, CA 90069</ContactInfoValue>
                </ContactInfoText>
              </ContactInfoItem>

              <ContactInfoItem>
                <ContactInfoIcon>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22 16.92V19.92C22.0011 20.1985 21.9441 20.4742 21.8325 20.7294C21.7209 20.9845 21.5573 21.2136 21.3521 21.4019C21.1468 21.5901 20.9046 21.7335 20.6407 21.8227C20.3769 21.9119 20.0974 21.9451 19.82 21.92C16.7428 21.5856 13.787 20.5341 11.19 18.85C8.77383 17.3147 6.72534 15.2662 5.19 12.85C3.49998 10.2412 2.44824 7.27097 2.12 4.18C2.09501 3.90347 2.12788 3.62476 2.2165 3.36162C2.30513 3.09849 2.44757 2.85669 2.63477 2.65162C2.82196 2.44655 3.04981 2.28271 3.30379 2.17052C3.55778 2.05833 3.83234 2.00026 4.11 2H7.11C7.59531 1.99522 8.06579 2.16708 8.43376 2.48353C8.80173 2.79999 9.04208 3.23945 9.11 3.72C9.23662 4.68007 9.47145 5.62273 9.81 6.53C9.94455 6.88792 9.97366 7.27691 9.89391 7.65088C9.81415 8.02485 9.62886 8.36811 9.36 8.64L8.09 9.91C9.51356 12.4135 11.5865 14.4864 14.09 15.91L15.36 14.64C15.6319 14.3711 15.9752 14.1858 16.3491 14.1061C16.7231 14.0263 17.1121 14.0554 17.47 14.19C18.3773 14.5286 19.3199 14.7634 20.28 14.89C20.7658 14.9585 21.2094 15.2032 21.5265 15.5775C21.8437 15.9518 22.0122 16.4296 22 16.92Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </ContactInfoIcon>
                <ContactInfoText>
                  <ContactInfoLabel>Phone</ContactInfoLabel>
                  <ContactInfoValue>+1 (323) 555-1234</ContactInfoValue>
                </ContactInfoText>
              </ContactInfoItem>

              <ContactInfoItem>
                <ContactInfoIcon>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M22 6L12 13L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </ContactInfoIcon>
                <ContactInfoText>
                  <ContactInfoLabel>Email</ContactInfoLabel>
                  <ContactInfoValue>hello@novavfx.com</ContactInfoValue>
                </ContactInfoText>
              </ContactInfoItem>
            </ContactInfoList>

            <SocialLinks>
              <SocialLink href="#" aria-label="Instagram">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17 2H7C4.23858 2 2 4.23858 2 7V17C2 19.7614 4.23858 22 7 22H17C19.7614 22 22 19.7614 22 17V7C22 4.23858 19.7614 2 17 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M16 11.37C16.1234 12.2022 15.9813 13.0522 15.5938 13.799C15.2063 14.5458 14.5932 15.1514 13.8416 15.5297C13.0901 15.9079 12.2385 16.0396 11.4078 15.9059C10.5771 15.7723 9.80977 15.3801 9.21485 14.7852C8.61993 14.1902 8.22774 13.4229 8.09408 12.5922C7.96042 11.7615 8.09208 10.9099 8.47034 10.1584C8.8486 9.40685 9.4542 8.79374 10.201 8.40624C10.9478 8.01874 11.7978 7.87659 12.63 8C13.4789 8.12588 14.2649 8.52146 14.8717 9.12831C15.4785 9.73515 15.8741 10.5211 16 11.37Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M17.5 6.5H17.51" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </SocialLink>
              <SocialLink href="#" aria-label="Twitter">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M23 3C22.0424 3.67548 20.9821 4.19211 19.86 4.53C19.2577 3.83751 18.4573 3.34669 17.567 3.12393C16.6767 2.90116 15.7395 2.9572 14.8821 3.28445C14.0247 3.61171 13.2884 4.1944 12.773 4.95372C12.2575 5.71303 11.9877 6.61234 12 7.53V8.53C10.2426 8.57557 8.50127 8.18581 6.93101 7.39545C5.36074 6.60508 4.01032 5.43864 3 4C3 4 -1 13 8 17C5.94053 18.398 3.48716 19.0989 1 19C10 24 21 19 21 7.5C20.9991 7.22145 20.9723 6.94359 20.92 6.67C21.9406 5.66349 22.6608 4.39271 23 3V3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </SocialLink>
              <SocialLink href="#" aria-label="Vimeo">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22 7C22 7 21 11 17 11C13 11 13 7 13 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M20 11V19C20 19.5304 19.7893 20.0391 19.4142 20.4142C19.0391 20.7893 18.5304 21 18 21H6C5.46957 21 4.96086 20.7893 4.58579 20.4142C4.21071 20.0391 4 19.5304 4 19V5C4 4.46957 4.21071 3.96086 4.58579 3.58579C4.96086 3.21071 5.46957 3 6 3H14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </SocialLink>
              <SocialLink href="#" aria-label="LinkedIn">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16 8C17.5913 8 19.1174 8.63214 20.2426 9.75736C21.3679 10.8826 22 12.4087 22 14V21H18V14C18 13.4696 17.7893 12.9609 17.4142 12.5858C17.0391 12.2107 16.5304 12 16 12C15.4696 12 14.9609 12.2107 14.5858 12.5858C14.2107 12.9609 14 13.4696 14 14V21H10V14C10 12.4087 10.6321 10.8826 11.7574 9.75736C12.8826 8.63214 14.4087 8 16 8V8Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M6 9H2V21H6V9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M4 6C5.10457 6 6 5.10457 6 4C6 2.89543 5.10457 2 4 2C2.89543 2 2 2.89543 2 4C2 5.10457 2.89543 6 4 6Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </SocialLink>
            </SocialLinks>
          </ContactInfoCard>
        </ContactInfoSection>

        <ContactFormSection
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <ContactFormCard>
            <ContactForm>
              <FormRow>
                <FormGroup>
                  <FormLabel>Name</FormLabel>
                  <FormInput type="text" placeholder="Your name" />
                </FormGroup>
                <FormGroup>
                  <FormLabel>Email</FormLabel>
                  <FormInput type="email" placeholder="Your email" />
                </FormGroup>
              </FormRow>

              <FormGroup>
                <FormLabel>Project Type</FormLabel>
                <FormSelect>
                  <option value="">Select project type</option>
                  <option value="vfx">Visual Effects</option>
                  <option value="animation">3D Animation</option>
                  <option value="motion">Motion Design</option>
                  <option value="concept">Concept Art</option>
                  <option value="color">Color Grading</option>
                  <option value="virtual">Virtual Production</option>
                  <option value="other">Other</option>
                </FormSelect>
              </FormGroup>

              <FormGroup>
                <FormLabel>Message</FormLabel>
                <FormTextarea placeholder="Tell us about your project" rows={5} />
              </FormGroup>

              <FormButton
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                Send Message
              </FormButton>
            </ContactForm>
          </ContactFormCard>
        </ContactFormSection>
      </ContactContent>
    </ContactContainer>
  );
};

const ContactContainer = styled.section`
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
    filter: blur(60px);
    transform: scale(1.2);
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 200px;
    background: linear-gradient(180deg, rgba(0, 0, 0, 0.2) 0%, transparent 100%);
    pointer-events: none;
    opacity: 0.7;
  }
`;

const ContactHeader = styled(motion.div)`
  text-align: center;
  margin-bottom: 80px;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  position: relative;
  z-index: 2;

  &::after {
    content: '';
    position: absolute;
    bottom: -20px;
    left: 50%;
    transform: translateX(-50%);
    width: 100px;
    height: 3px;
    background: linear-gradient(90deg, #00e5ff, #d500f9);
    border-radius: 3px;
    box-shadow: 0 0 20px rgba(0, 229, 255, 0.5);
  }
`;

const ContactTitle = styled.h2`
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

const ContactSubtitle = styled.p`
  font-size: 1.3rem;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.7;
  max-width: 600px;
  margin: 0 auto 30px;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const ContactContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: 40px;
  position: relative;
  z-index: 2;
  max-width: 1400px;
  margin: 0 auto;

  @media (max-width: 992px) {
    grid-template-columns: 1fr;
    max-width: 600px;
  }
`;

const ContactInfoSection = styled(motion.div)``;

const ContactInfoCard = styled.div`
  background: rgba(25, 25, 35, 0.85);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 40px;
  height: 100%;
  display: flex;
  flex-direction: column;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.3), 0 0 20px rgba(0, 0, 0, 0.2);
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-top: 3px solid #00e5ff;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4), 0 0 30px rgba(0, 229, 255, 0.2);
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
    border-radius: 20px;
  }

  @media (max-width: 768px) {
    padding: 30px;
  }
`;

const ContactInfoHeader = styled.div`
  margin-bottom: 40px;
`;

const ContactInfoTitle = styled.h3`
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 15px;
  background: linear-gradient(90deg, #00e5ff, #00a2ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
  letter-spacing: -0.5px;
`;

const ContactInfoSubtitle = styled.p`
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.6;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
`;

const ContactInfoList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  margin-bottom: 40px;
  flex: 1;
`;

const ContactInfoItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 20px;
`;

const ContactInfoIcon = styled.div`
  width: 52px;
  height: 52px;
  border-radius: 50%;
  background: rgba(0, 229, 255, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #00e5ff;
  flex-shrink: 0;
  box-shadow: 0 5px 15px rgba(0, 229, 255, 0.2);
  animation: ${float} 5s ease-in-out infinite;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    border-radius: 50%;
    background: linear-gradient(45deg, rgba(0, 229, 255, 0.5), rgba(0, 229, 255, 0));
    opacity: 0.3;
    z-index: -1;
  }
`;

const ContactInfoText = styled.div``;

const ContactInfoLabel = styled.h4`
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 5px;
`;

const ContactInfoValue = styled.p`
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.5;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 15px;
  margin-top: auto;
`;

const SocialLink = styled.a`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.05);
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255, 255, 255, 0.7);
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.05);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(45deg, rgba(0, 229, 255, 0.2), rgba(213, 0, 249, 0.2));
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover {
    background: rgba(0, 229, 255, 0.1);
    color: #ffffff;
    transform: translateY(-5px) scale(1.1);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);

    &::before {
      opacity: 1;
    }
  }
`;

const ContactFormSection = styled(motion.div)``;

const ContactFormCard = styled.div`
  background: rgba(25, 25, 35, 0.85);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 40px;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.3), 0 0 20px rgba(0, 0, 0, 0.2);
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-top: 3px solid #d500f9;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4), 0 0 30px rgba(213, 0, 249, 0.2);
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
    border-radius: 20px;
  }

  @media (max-width: 768px) {
    padding: 30px;
  }
`;

const ContactForm = styled.form``;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 20px;

  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const FormLabel = styled.label`
  display: block;
  font-size: 0.95rem;
  font-weight: 600;
  margin-bottom: 10px;
  color: rgba(255, 255, 255, 0.9);
  letter-spacing: 0.5px;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
`;

const FormInput = styled.input`
  width: 100%;
  padding: 14px 18px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  color: white;
  font-size: 1rem;
  transition: all 0.3s ease;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1) inset;

  &:focus {
    outline: none;
    border-color: #00e5ff;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1) inset, 0 0 0 3px rgba(0, 229, 255, 0.2);
    background: rgba(0, 229, 255, 0.05);
  }

  &:hover {
    border-color: rgba(0, 229, 255, 0.5);
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.3);
  }
`;

const FormSelect = styled.select`
  width: 100%;
  padding: 14px 18px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  color: white;
  font-size: 1rem;
  transition: all 0.3s ease;
  appearance: none;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1) inset;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='rgba(255, 255, 255, 0.7)' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 16px center;
  background-size: 16px;

  &:focus {
    outline: none;
    border-color: #00e5ff;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1) inset, 0 0 0 3px rgba(0, 229, 255, 0.2);
    background-color: rgba(0, 229, 255, 0.05);
  }

  &:hover {
    border-color: rgba(0, 229, 255, 0.5);
  }

  option {
    background: #1a1a24;
    padding: 10px;
  }
`;

const FormTextarea = styled.textarea`
  width: 100%;
  padding: 14px 18px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  color: white;
  font-size: 1rem;
  resize: vertical;
  min-height: 140px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1) inset;

  &:focus {
    outline: none;
    border-color: #00e5ff;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1) inset, 0 0 0 3px rgba(0, 229, 255, 0.2);
    background: rgba(0, 229, 255, 0.05);
  }

  &:hover {
    border-color: rgba(0, 229, 255, 0.5);
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.3);
  }
`;

const FormButton = styled(motion.button)`
  display: inline-block;
  padding: 16px 36px;
  background: linear-gradient(90deg, #00e5ff, #d500f9);
  border: none;
  border-radius: 12px;
  color: #fff;
  font-size: 1.1rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 10px 25px rgba(0, 229, 255, 0.4);
  position: relative;
  overflow: hidden;
  letter-spacing: 0.5px;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
  margin-top: 10px;

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

  &:hover {
    box-shadow: 0 15px 30px rgba(0, 229, 255, 0.5);
    transform: translateY(-2px);

    &::before {
      left: 100%;
    }
  }

  &:focus {
    outline: none;
  }

  &:active {
    transform: translateY(1px);
    box-shadow: 0 5px 15px rgba(0, 229, 255, 0.4);
  }
`;

const DecorativeCircle = styled.div`
  position: absolute;
  border-radius: 50%;
  opacity: 0.4;
  filter: blur(80px);
  z-index: 0;
  pointer-events: none;

  &.circle-1 {
    width: 400px;
    height: 400px;
    background: radial-gradient(circle, rgba(0, 229, 255, 0.3) 0%, rgba(0, 229, 255, 0) 70%);
    top: 10%;
    left: 5%;
    animation: ${float} 15s ease-in-out infinite alternate;
  }

  &.circle-2 {
    width: 600px;
    height: 600px;
    background: radial-gradient(circle, rgba(213, 0, 249, 0.2) 0%, rgba(213, 0, 249, 0) 70%);
    bottom: 10%;
    right: 5%;
    animation: ${float} 20s ease-in-out infinite alternate-reverse;
  }

  &.circle-3 {
    width: 300px;
    height: 300px;
    background: radial-gradient(circle, rgba(255, 145, 0, 0.15) 0%, rgba(255, 145, 0, 0) 70%);
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    animation: ${pulse} 10s ease-in-out infinite;
  }
`;

export default Contact;
