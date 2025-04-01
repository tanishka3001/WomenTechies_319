import React, { useRef, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

const ThreeBackground = () => {
  return (
    <Canvas 
      style={{
        position: 'fixed', // Fix canvas to the viewport
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1, // Ensures it's behind other content
      }}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <Box />
      <OrbitControls />
    </Canvas>
  );
};

const Box = () => {
  const ref = useRef();
  const [rotation, setRotation] = useState(0);

  // Use useEffect to create continuous rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setRotation((prev) => prev + 0.01); // Increment rotation
    }, 16); // Approximately 60 FPS
    return () => clearInterval(interval);
  }, []);

  return (
    <mesh ref={ref} rotation={[rotation, rotation, rotation]}>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color={'#f39c12'} />
    </mesh>
  );
};

export default ThreeBackground;
