import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

interface NavItem {
  label: string;
  section: string;
}

const navItems: NavItem[] = [
  { label: 'Home', section: 'hero' },
  { label: 'Services', section: 'services' },
  { label: 'Portfolio', section: 'portfolio' },
  { label: 'Contact', section: 'contact' }
];

const Navbar = () => {
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => {
        const element = document.getElementById(item.section);
        if (!element) return { id: item.section, offset: 0 };
        return {
          id: item.section,
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

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (!element) return;

    const offset = element.offsetTop;
    window.scrollTo({
      top: offset,
      behavior: 'smooth'
    });
  };

  return (
    <NavContainer>
      <NavList>
        {navItems.map(item => (
          <NavItem
            key={item.section}
            isActive={activeSection === item.section}
            onClick={() => scrollToSection(item.section)}
          >
            {item.label}
          </NavItem>
        ))}
      </NavList>
    </NavContainer>
  );
};

const NavContainer = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(10px);
  z-index: 1000;
  padding: 1rem 2rem;
`;

const NavList = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  list-style: none;
  margin: 0;
  padding: 0;
  gap: 2rem;

  @media (max-width: 768px) {
    gap: 1rem;
  }
`;

const NavItem = styled.li<{ isActive: boolean }>`
  color: ${props => props.isActive ? '#00bfff' : 'white'};
  cursor: pointer;
  font-size: 1.1rem;
  font-weight: ${props => props.isActive ? '600' : '400'};
  transition: all 0.3s ease;
  position: relative;

  &:after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: ${props => props.isActive ? '100%' : '0'};
    height: 2px;
    background-color: #00bfff;
    transition: width 0.3s ease;
  }

  &:hover {
    color: #00bfff;
    &:after {
      width: 100%;
    }
  }

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

export default Navbar;