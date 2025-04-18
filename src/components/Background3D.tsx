import { useRef, useEffect, useState, lazy, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Points, BufferGeometry, Float32BufferAttribute, PointsMaterial } from 'three';
import styled from 'styled-components';

// Optimized particle field using instanced rendering
const ParticleField = () => {
  const { viewport } = useThree();
  const pointsRef = useRef<Points>(null);
  const count = 50; // Reduced count for better performance

  useEffect(() => {
    if (!pointsRef.current) return;

    // Create geometry once
    const geometry = new BufferGeometry();
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      // Position
      positions[i * 3] = Math.random() * viewport.width * 2 - viewport.width;
      positions[i * 3 + 1] = Math.random() * viewport.height * 2 - viewport.height;
      positions[i * 3 + 2] = Math.random() * 10 - 5;

      // Size
      sizes[i] = Math.random() * 0.5 + 0.5;
    }

    geometry.setAttribute('position', new Float32BufferAttribute(positions, 3));
    geometry.setAttribute('size', new Float32BufferAttribute(sizes, 1));

    pointsRef.current.geometry = geometry;
  }, [viewport, count]);

  useFrame(() => {
    if (!pointsRef.current) return;

    const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;

    for (let i = 0; i < count; i++) {
      // Move particles down slowly
      positions[i * 3 + 1] -= 0.01;

      // Reset position when out of view
      if (positions[i * 3 + 1] < -viewport.height) {
        positions[i * 3 + 1] = viewport.height;
        positions[i * 3] = Math.random() * viewport.width * 2 - viewport.width;
      }
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <pointsMaterial
        size={0.05}
        color="#00e5ff"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
};

// Lazy load the 3D background to improve initial load time
const Background3D = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Delay loading the 3D background until after initial render
    const timer = setTimeout(() => setMounted(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (!mounted) return null;

  return (
    <CanvasContainer>
      <Canvas
        camera={{ position: [0, 0, 5] }}
        dpr={[1, 1.5]} // Limit pixel ratio for performance
        gl={{ antialias: false, powerPreference: 'high-performance' }}
        performance={{ min: 0.5 }} // Allow ThreeJS to reduce quality for performance
      >
        <ParticleField />
      </Canvas>
    </CanvasContainer>
  );
};

const CanvasContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  pointer-events: none;
  opacity: 0.7;
`;

export default Background3D;