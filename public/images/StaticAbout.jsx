import React, { useState, useEffect, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, Preload, useProgress, Html } from "@react-three/drei";
import { database, ref, onValue } from "../firebase";
import { FaBullseye, FaEye, FaLaptopCode, FaRocket } from "react-icons/fa";
import "./StaticAbout.css";

const DesktopPC = () => {
  const { scene } = useGLTF("/ff/desktop.gltf");
  const [yPosition, setYPosition] = useState(0);

  useFrame(({ clock }) => {
    setYPosition(Math.sin(clock.getElapsedTime()) * 0.05);
  });

  return (
    <primitive
      object={scene}
      scale={window.innerWidth < 768 ? 0.19 : 0.25}
      position={[0, yPosition - 0.5, 0]}
      rotation={[0, Math.PI / -2, 0]}
    />
  );
};

const Loader = () => {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="text-white text-xl font-bold">{Math.round(progress)}% loaded</div>
    </Html>
  );
};

const Section = ({ icon, title, content, fullWidth }) => (
  <div
    className={`p-4 bg-white bg-opacity-70 rounded-xl shadow-lg ${
      fullWidth ? "w-full" : "w-90"
    } flex flex-col items-center text-center`}
  >
    {icon}
    <h3 className="text-2xl font-semibold mb-2 text-gray-900">{title}</h3>
    <p className="text-base text-gray-700 leading-relaxed">{content}</p>
  </div>
);

const SectionWrapper = ({ title, content, icon }) => (
  <div className="w-full flex-1 justify-center items-center flex p-8">
    <Section title={title} content={content} icon={icon} />
  </div>
);

const StaticAbout = () => {
  const [missionText, setMissionText] = useState("");
  const [visionText, setVisionText] = useState("");
  const [programs, setPrograms] = useState("");
  const [platformsText, setPlatformsText] = useState("");
  const [platformImages, setPlatformImages] = useState([]);

  useEffect(() => {
    const aboutRef = ref(database, "about/");
    onValue(aboutRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setMissionText(data.missionText || "");
        setVisionText(data.visionText || "");
        setPrograms(data.programs || "");

        const platforms = data.platformsText || "";
        const words = platforms.split(/\s+/);
        const images = words.filter((word) => isValidImageUrl(word));
        setPlatformImages([...images, ...images,...images,...images,...images,...images,...images,...images,...images,...images,...images,...images,...images,...images]); // Duplicate images
        setPlatformsText(
          words
            .filter((word) => !isValidImageUrl(word))
            .join(" ")
        );
      }
    });
  }, []);

  const isValidImageUrl = (url) => {
    const regex = /(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp))/i;
    return regex.test(url);
  };

  return (
    <section
      className="flex flex-col w-full text-white bg-gradient-to-r from-[#002D62] to-[#008080]"
      style={{
        backgroundImage: "url('/images/bg.WebP')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="flex items-center justify-center h-[70vh] sm:h-[70vh] lg:h-[70vh] w-full">
        <Canvas camera={{ position: [0, 0, 2.5] }} className="min-h-[250px] lg:min-h-[500px] h-full">
          <Suspense fallback={<Loader />}>
            <OrbitControls enableZoom={false} maxPolarAngle={Math.PI / 2} minPolarAngle={Math.PI / 2} />
            <ambientLight intensity={0.3} />
            <directionalLight position={[0, 5, 5]} intensity={2} />
            <DesktopPC />
            <Preload all />
          </Suspense>
        </Canvas>
      </div>

      <div className="w-full flex flex-col sm:flex-row px-4">
        <SectionWrapper
          title="Mission"
          content={missionText}
          icon={<FaBullseye className="text-blue-600 text-3xl sm:text-4xl mb-2" />}
        />
        <SectionWrapper
          title="Vision"
          content={visionText}
          icon={<FaEye className="text-purple-600 text-3xl sm:text-4xl mb-2" />}
        />
      </div>

      <div className="w-full px-4 sm:px-8">
        <div className="mt-8 sm:mt-10 w-full px-8 sm:px-4">
          <Section
            title="Programs"
            content={programs}
            icon={<FaRocket className="text-teal-600 text-3xl sm:text-4xl mb-2" />}
            fullWidth
          />
        </div>

        <div className="mt-8 sm:mt-10 w-full px-8 sm:px-4">
          <Section
            title="Platforms"
            content={platformsText}
            icon={<FaLaptopCode className="text-pink-600 text-3xl sm:text-4xl mb-2" />}
            fullWidth
          />
          <div className="logos mt-4">
            <div className="logos-slide">
              {platformImages.map((image, index) => (
                <img key={index} src={image} alt={`platform ${index}`} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StaticAbout;
