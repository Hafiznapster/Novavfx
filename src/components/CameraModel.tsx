import { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF, OrbitControls, Environment, PresentationControls } from '@react-three/drei';
import styled from 'styled-components';
import * as THREE from 'three';

// Camera model component that loads and displays the 3D model
const CameraModelScene = ({ onLoad }: { onLoad?: () => void }) => {
  const { scene, animations } = useGLTF('/camera.glb');
  const modelRef = useRef<THREE.Group>(null);
  const mixer = useRef<THREE.AnimationMixer | null>(null);
  const { gl, camera } = useThree();
  const [isLoaded, setIsLoaded] = useState(false);

  // Set up the scene and animations - optimized for faster loading
  useEffect(() => {
    if (scene && !isLoaded) {
      // Use the scene directly instead of cloning for better performance
      const modelScene = scene;

      // Simplified material setup for better performance
      modelScene.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          if (child.material) {
            // Simplified material properties
            child.material.roughness = 0.6;
            child.material.metalness = 0.7;
            child.material.envMapIntensity = 0.8;
            // Disable shadows for better performance
            child.castShadow = false;
            child.receiveShadow = false;
          }
        }
      });

      // Replace the model in the ref
      if (modelRef.current) {
        // Clear existing children
        while (modelRef.current.children.length > 0) {
          modelRef.current.remove(modelRef.current.children[0]);
        }
        // Add the scene
        modelRef.current.add(modelScene);

        // Rotate the model to show it in a vertical orientation
        // Rotate 90 degrees around the X axis to make it vertical
        modelRef.current.rotation.x = Math.PI / 2;
        // Rotate slightly around Y axis for a better view
        modelRef.current.rotation.y = Math.PI / 6;
        // Adjust position to center it better
        modelRef.current.position.y = 0;
        // Adjust position to fit better on screen
        modelRef.current.position.z = -0.5;
      }

      // Set up animation mixer if there are animations - with optimized settings
      if (animations && animations.length > 0) {
        mixer.current = new THREE.AnimationMixer(modelScene);
        const action = mixer.current.clipAction(animations[0]);
        // Set lower update frequency for better performance
        action.setEffectiveTimeScale(0.8);
        action.play();
      }

      // Position camera for better view
      camera.position.set(0, 0, 5);

      // Mark as loaded and call the onLoad callback
      setIsLoaded(true);
      if (onLoad) onLoad();
    }
  }, [scene, animations, camera, isLoaded, onLoad]);

  // Update animations on each frame - optimized for performance
  useFrame((state, delta) => {
    // Update mixer with a throttled delta for better performance
    if (mixer.current) {
      mixer.current.update(delta * 0.8); // Slow down animation updates for better performance
    }

    // Only update rotation every other frame for better performance
    if (modelRef.current && state.clock.elapsedTime % 0.1 < 0.05) {
      // Keep the initial X rotation that makes it vertical
      const xRotation = modelRef.current.rotation.x;
      const yRotation = modelRef.current.rotation.y;

      // Use sine wave for smoother, oscillating rotation - simplified for performance
      const time = state.clock.getElapsedTime() * 0.5; // Slower time scale for better performance
      // Gentle rotation around Z axis
      modelRef.current.rotation.z = Math.sin(time * 0.2) * 0.08;
      // Subtle rotation around Y axis
      modelRef.current.rotation.y = yRotation + Math.sin(time * 0.15) * 0.04;

      // Ensure X rotation stays constant to maintain vertical orientation
      modelRef.current.rotation.x = xRotation;
    }
  });

  return (
    <group ref={modelRef} position={[0, 0, 0]} scale={2.5} />
  );
};

interface CameraModelProps {
  onLoad?: () => void;
  style?: React.CSSProperties;
}

// Main component that sets up the Canvas and environment
const CameraModel = ({ onLoad, style }: CameraModelProps) => {
  return (
    <ModelContainer style={style}>
      <Canvas
        shadows={false} /* Disable shadows for faster loading */
        dpr={[1, 1.5]} /* Lower DPR for better performance */
        camera={{ position: [0, 0, 4], fov: 40 }}
        gl={{
          antialias: false, /* Disable antialiasing for faster loading */
          alpha: true,
          powerPreference: 'high-performance',
          precision: 'lowp' /* Use lower precision for better performance */
        }}
        performance={{ min: 0.5 }} /* Allow ThreeJS to reduce quality for performance */
      >
        <color attach="background" args={['#000000']} />
        <ambientLight intensity={0.7} /> {/* Increased ambient light to reduce need for other lights */}
        {/* Removed spotLight for better performance */}
        <directionalLight
          position={[5, 5, 5]}
          intensity={0.8}
        /> {/* Using directionalLight instead of spotLight for better performance */}

        <PresentationControls
          global
          rotation={[0, 0, 0]}
          polar={[-Math.PI / 6, Math.PI / 6]}
          azimuth={[-Math.PI / 6, Math.PI / 6]}
          config={{ mass: 1, tension: 400 }}
          snap={{ mass: 2, tension: 1200 }}
          speed={1.2}
        >
          <CameraModelScene onLoad={onLoad} />
        </PresentationControls>

        <Environment preset="city" background={false} blur={0.5} />
      </Canvas>
    </ModelContainer>
  );
};

const ModelContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  position: relative;

  canvas {
    touch-action: none;
    outline: none;
  }

  @media (max-width: 768px) {
    height: 60vh;
  }
`;

export default CameraModel;

// Preload the model to avoid delays
useGLTF.preload('/camera.glb');
