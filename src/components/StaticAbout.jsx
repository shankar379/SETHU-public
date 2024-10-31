import React, { useState, useEffect, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, Preload, useProgress, Html } from '@react-three/drei';
import { database, ref, onValue } from '../firebase';
import { FaBullseye, FaEye, FaLaptopCode, FaRocket } from 'react-icons/fa';

// Component to load the desktop model with oscillation animation
const DesktopPC = () => {
  const { scene } = useGLTF('/desktop_pc/scene.gltf');
  const [yPosition, setYPosition] = useState(0);

  useFrame(({ clock }) => {
    // Update y position to oscillate up and down
    setYPosition(Math.sin(clock.getElapsedTime()) * 0.05);
  });

  return (
    <primitive
      object={scene}
      scale={0.2}
      position={[0, yPosition - 0.5, 0]} // Apply oscillation on y-axis
      rotation={[0, Math.PI / -2, 0]}
    />
  );
};

// Component for displaying the loading progress
const Loader = () => {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="text-white text-xl font-bold">{Math.round(progress)}% loaded</div>
    </Html>
  );
};

// Main StaticAbout component
const StaticAbout = () => {
  const [missionText, setMissionText] = useState('');
  const [visionText, setVisionText] = useState('');
  const [programs, setPrograms] = useState('');
  const [platformsText, setPlatformsText] = useState('');

  useEffect(() => {
    const aboutRef = ref(database, 'about/');
    onValue(aboutRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setMissionText(data.missionText || '');
        setVisionText(data.visionText || '');
        setPrograms(data.programs || '');
        setPlatformsText(data.platformsText || '');
      }
    });
  }, []);

  return (
    <section
      className="flex min-h-screen w-full text-white bg-gradient-to-r from-[#002D62] to-[#008080]"
      style={{
        backgroundImage: "url('/images/bg.WebP')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Left Half - 3D Model Canvas */}
      <div className="w-1/2 flex items-center justify-center">
        <Canvas camera={{ position: [0, 0, 2.5] }}>
          <Suspense fallback={<Loader />}>
            <OrbitControls enableZoom={false} />
            <ambientLight intensity={0.3} />
            <directionalLight position={[0, 5, 5]} intensity={1} />
            <DesktopPC />
            <Preload all />
          </Suspense>
        </Canvas>
      </div>

      {/* Right Side - Firebase Text Content */}
      <div className="w-1/2 flex items-center justify-center">
        <div className="w-3/4 bg-white bg-opacity-30 rounded-xl shadow-xl p-4">
          <div className="grid grid-cols-1 gap-6">
            {/* Mission Section */}
            <Section icon={<FaBullseye className="text-blue-600 text-4xl mb-2" />} title="Mission" content={missionText} />
            {/* Vision Section */}
            <Section icon={<FaEye className="text-purple-600 text-4xl mb-2" />} title="Vision" content={visionText} />
            {/* Programs Section */}
            <Section icon={<FaRocket className="text-teal-600 text-4xl mb-2" />} title="Programs" content={programs} />
            {/* Platforms Section */}
            <Section icon={<FaLaptopCode className="text-pink-600 text-4xl mb-2" />} title="Platforms" content={platformsText} />
          </div>
        </div>
      </div>
    </section>
  );
};

// Reusable Section Component
const Section = ({ icon, title, content }) => (
  <div className="p-4 bg-white bg-opacity-70 rounded-xl shadow-lg hover:scale-105 transform transition-all duration-300 flex flex-col items-center text-center">
    {icon}
    <h3 className="text-2xl font-semibold mb-2 text-gray-900">{title}</h3>
    <p className="text-base text-gray-700 leading-relaxed">{content}</p>
  </div>
);

export default StaticAbout;
