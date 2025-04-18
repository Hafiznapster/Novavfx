import { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF, Environment } from '@react-three/drei';
import styled from 'styled-components';
import * as THREE from 'three';

// Studio Camera model component that loads and displays the 3D model
const StudioCameraScene = ({ onComplete }: { onComplete?: () => void }) => {
  const { scene } = useGLTF('/studio_camera.glb');
  const modelRef = useRef<THREE.Group>(null);
  const rotationComplete = useRef(false);
  const startTime = useRef(Date.now());
  const { camera } = useThree();

  // Set up the scene
  useEffect(() => {
    if (scene && modelRef.current) {
      // Use the scene directly for better performance
      const modelScene = scene;

      // Optimize materials
      modelScene.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          if (child.material) {
            child.material.roughness = 0.6;
            child.material.metalness = 0.7;
            child.material.envMapIntensity = 0.8;
            child.castShadow = false;
            child.receiveShadow = false;
          }
        }
      });

      // Clear existing children
      while (modelRef.current.children.length > 0) {
        modelRef.current.remove(modelRef.current.children[0]);
      }

      // Add the scene
      modelRef.current.add(modelScene);

      // Initial position and rotation
      modelRef.current.rotation.set(0, 0, 0);
      modelRef.current.position.set(0, 0, 0);

      // Position camera for better view
      camera.position.set(0, 0, 3);
    }
  }, [scene, camera]);

  // Handle rotation animation
  useFrame(() => {
    if (modelRef.current && !rotationComplete.current) {
      const elapsed = (Date.now() - startTime.current) / 1000; // Convert to seconds

      if (elapsed <= 6) {
        // Smooth rotation over 6 seconds
        modelRef.current.rotation.y = (elapsed / 6) * Math.PI * 2;
      } else if (!rotationComplete.current) {
        // Complete one full rotation
        modelRef.current.rotation.y = Math.PI * 2;
        rotationComplete.current = true;
        if (onComplete) onComplete();
      }
    }
  });

  return (
    <group ref={modelRef} position={[0, 0, 0]} scale={0.8} />
  );
};

interface StudioCameraModelProps {
  onComplete?: () => void;
  style?: React.CSSProperties;
}

// Main component that sets up the Canvas and environment
const StudioCameraModel = ({ onComplete, style }: StudioCameraModelProps) => {
  return (
    <ModelContainer style={style}>
      <Canvas
        shadows={false}
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 3], fov: 40 }}
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
        <StudioCameraScene onComplete={onComplete} />
        <Environment preset="city" background={false} blur={0.5} />
      </Canvas>
    </ModelContainer>
  );
};

const ModelContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  position: relative;

  canvas {
    touch-action: none;
    outline: none;
  }
`;

export default StudioCameraModel;

// Preload the model
useGLTF.preload('/studio_camera.glb');