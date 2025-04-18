import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, PresentationControls, Environment } from '@react-three/drei';
import styled from 'styled-components';
import * as THREE from 'three';

interface ServiceIconModelProps {
  color: string;
  rotation?: [number, number, number];
  scale?: number;
  position?: [number, number, number];
  modelPath: string;
}

// Component that renders a 3D model with specified color
const ServiceIconModel = ({ color, rotation = [0, 0, 0], scale = 1, position = [0, 0, 0], modelPath }: ServiceIconModelProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  // Animate the model with gentle rotation
  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.getElapsedTime();
      meshRef.current.rotation.y = rotation[1] + Math.sin(time * 0.3) * 0.2;
      meshRef.current.rotation.x = rotation[0] + Math.sin(time * 0.2) * 0.1;
      meshRef.current.position.y = position[1] + Math.sin(time * 0.5) * 0.05; // Gentle floating effect
    }
  });

  // Create a simple cube as fallback if no model is provided
  return (
    <mesh ref={meshRef} position={position} rotation={rotation} scale={scale}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={color} metalness={0.8} roughness={0.2} />
    </mesh>
  );
};

interface ServiceIcon3DProps {
  color: string;
  icon: string;
  size?: number;
}

// Main component that sets up the Canvas and environment
const ServiceIcon3D = ({ color, icon, size = 70 }: ServiceIcon3DProps) => {
  return (
    <IconContainer style={{ width: size, height: size }}>
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
          <ServiceIconModel 
            color={color} 
            modelPath="/camera.glb" // Default model path
            scale={1.5}
            position={[0, 0, 0]}
            rotation={[0, 0, 0]}
          />
        </PresentationControls>

        <Environment preset="city" background={false} blur={0.5} />
      </Canvas>
      <IconText>{icon}</IconText>
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
  overflow: hidden;
  
  canvas {
    touch-action: none;
    outline: none;
  }
`;

const IconText = styled.span`
  position: absolute;
  font-size: 2rem;
  z-index: 2;
  color: inherit;
  mix-blend-mode: overlay;
`;

export default ServiceIcon3D;