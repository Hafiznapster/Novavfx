import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PresentationControls, Environment } from '@react-three/drei';
import styled from 'styled-components';
import * as THREE from 'three';

interface ExpertiseIconProps {
  color: string;
  icon: string;
  size?: number;
}

// Component that renders a 3D shape based on the expertise area
const Shape = ({ color }: { color: string }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.MeshStandardMaterial>(null);

  // Create a unique shape based on the color hash
  const geometry = useMemo(() => {
    const colorHash = color.replace('#', '');
    const hashSum = colorHash.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);

    // Choose geometry based on hash with more detailed variations
    switch (hashSum % 5) {
      case 0: return new THREE.OctahedronGeometry(1, 2); // More detailed diamond
      case 1: return new THREE.DodecahedronGeometry(1, 1); // Smoother polyhedron
      case 2: return new THREE.TetrahedronGeometry(1, 1); // Subdivided pyramid
      case 3: return new THREE.IcosahedronGeometry(1, 1); // Higher detail sphere
      case 4: return new THREE.TorusKnotGeometry(0.7, 0.3, 128, 16); // Complex knot
      default: return new THREE.SphereGeometry(1, 64, 64); // High-res fallback
    }
  }, [color]);

  // Enhanced animation with more dynamic movement
  useFrame((state) => {
    if (meshRef.current && materialRef.current) {
      const time = state.clock.getElapsedTime();

      // Enhanced smooth rotation with easing
      const rotationSpeed = 0.15;
      meshRef.current.rotation.y = Math.sin(time * rotationSpeed) * 0.3 + time * 0.05;
      meshRef.current.rotation.x = Math.cos(time * rotationSpeed * 0.8) * 0.2;
      meshRef.current.rotation.z = Math.sin(time * rotationSpeed * 0.6) * 0.1;

      // Improved floating motion with multiple harmonics
      const floatAmplitude = 0.03;
      meshRef.current.position.y =
        Math.sin(time * 0.4) * floatAmplitude +
        Math.sin(time * 0.2) * floatAmplitude * 0.5;
      meshRef.current.position.x = Math.cos(time * 0.3) * floatAmplitude * 0.7;

      // Dynamic material properties with smoother transitions
      const pulseSpeed = 0.4;
      materialRef.current.metalness = 0.9 + Math.sin(time * pulseSpeed) * 0.08;
      materialRef.current.roughness = 0.15 + Math.sin(time * pulseSpeed * 1.2) * 0.04;
      materialRef.current.envMapIntensity = 2 + Math.sin(time * pulseSpeed * 0.8) * 0.3;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]} scale={0.8}>
      <primitive object={geometry} attach="geometry" />
      <meshStandardMaterial
        ref={materialRef}
        color={color}
        metalness={0.8}
        roughness={0.2}
        envMapIntensity={1.5}
        transparent
        opacity={0.9}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
};

// Main component that sets up the Canvas and environment
const ExpertiseIcon3D = ({ color, icon, size = 70 }: ExpertiseIconProps) => {
  return (
    <IconContainer style={{ width: size, height: size, backgroundColor: `${color}15` }}>
      <Canvas
        shadows={false}
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 5], fov: 40 }}
        gl={{
          antialias: false,
          alpha: true,
          powerPreference: 'high-performance',
          precision: 'lowp'
        }}
      >
        <color attach="background" args={['transparent']} />
        <ambientLight intensity={0.7} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} />

        <PresentationControls
          global
          rotation={[0, 0, 0]}
          polar={[-Math.PI / 6, Math.PI / 6]}
          azimuth={[-Math.PI / 6, Math.PI / 6]}
          config={{ mass: 1, tension: 400 }}
          snap={{ mass: 2, tension: 1200 }}
          speed={1.2}
        >
          <Shape color={color} />
        </PresentationControls>

        <Environment preset="city" background={false} blur={0.5} />
      </Canvas>
      <IconText style={{ color }}>{icon}</IconText>
    </IconContainer>
  );
};

const IconContainer = styled.div`
  position: relative;
  width: 70px;
  height: 70px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 25px;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(8px);
  box-shadow:
    inset 0 0 25px rgba(255, 255, 255, 0.08),
    0 5px 15px rgba(0, 0, 0, 0.2),
    0 0 40px rgba(255, 255, 255, 0.15);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  transform-origin: center center;

  canvas {
    touch-action: none;
    outline: none;
    filter: drop-shadow(0 0 15px rgba(255, 255, 255, 0.3));
    transform: scale(1.2);
    transition: transform 0.3s ease;
  }

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 50%;
    padding: 1.5px;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.3), transparent);
    -webkit-mask:
      linear-gradient(#fff 0 0) content-box,
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    pointer-events: none;
  }

  &:hover {
    transform: translateY(-5px) scale(1.05);
    box-shadow:
      inset 0 0 30px rgba(255, 255, 255, 0.12),
      0 8px 20px rgba(0, 0, 0, 0.25),
      0 0 50px rgba(255, 255, 255, 0.2);

    canvas {
      transform: scale(1.4);
    }
  }
`;

const IconText = styled.span`
  position: absolute;
  font-size: 2rem;
  z-index: 2;
  mix-blend-mode: overlay;
  text-shadow:
    0 0 15px rgba(255, 255, 255, 0.6),
    0 0 30px rgba(255, 255, 255, 0.3);
  transition: transform 0.3s ease, text-shadow 0.3s ease;

  ${IconContainer}:hover & {
    transform: scale(1.1);
    text-shadow:
      0 0 20px rgba(255, 255, 255, 0.8),
      0 0 40px rgba(255, 255, 255, 0.4);
  }
`;

export default ExpertiseIcon3D;