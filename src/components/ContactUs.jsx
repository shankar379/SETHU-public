import React, { Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF, Html, useProgress } from "@react-three/drei";
import { motion } from "framer-motion";

// Updated styles with larger text sizes and refined gradient colors
const styles = {
  paddingX: "sm:px-16 px-6",
  paddingY: "sm:py-16 py-6",
  padding: "sm:px-16 px-6 sm:py-16 py-10",
  heroHeadText: "font-black text-white lg:text-[90px] sm:text-[70px] xs:text-[55px] text-[45px] lg:leading-[98px] mt-2",
  heroSubText: "text-[#dfd9ff] font-medium lg:text-[35px] sm:text-[28px] xs:text-[22px] text-[18px] lg:leading-[45px]",
  sectionHeadText: "text-white font-black md:text-[65px] sm:text-[55px] xs:text-[45px] text-[35px]",
  sectionSubText: "sm:text-[20px] text-[16px] text-secondary uppercase tracking-wider",
};

const slideIn = (direction, type, delay, duration) => ({
  hidden: {
    x: direction === "left" ? "-100%" : direction === "right" ? "100%" : 0,
    y: direction === "up" ? "100%" : direction === "down" ? "100%" : 0,
  },
  show: {
    x: 0,
    y: 0,
    transition: { type, delay, duration, ease: "easeOut" },
  },
});

const Earth = () => {
  const earth = useGLTF("/planet/scene.gltf");
  return <primitive object={earth.scene} scale={2.5} position-y={0} rotation-y={0} />;
};

const EarthCanvas = () => (
  <Canvas shadows frameloop="demand" dpr={[1, 2]} gl={{ preserveDrawingBuffer: true }}
    camera={{ fov: 45, near: 0.1, far: 200, position: [-4, 3, 6] }}>
    <Suspense fallback={<CanvasLoader />}>
      <OrbitControls autoRotate enableZoom={false} maxPolarAngle={Math.PI / 2} minPolarAngle={Math.PI / 2} />
      <Earth />
      <Preload all />
    </Suspense>
  </Canvas>
);

const CanvasLoader = () => {
  const { progress } = useProgress();
  return (
    <Html as="div" center style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
      <span className="canvas-loader"></span>
      <p style={{ fontSize: 16, color: "#F1F1F1", fontWeight: 800, marginTop: 40 }}>{progress.toFixed(2)}%</p>
    </Html>
  );
};

// Updated Contact section with enhanced color palette and gradients
const Contact = () => {
  return (
    <div
      className="xl:mt-12 flex flex-col-reverse xl:flex-row gap-10 overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #0D1B4C, #1A237E, #0B072A)",
        padding: "2rem",
        borderRadius: "12px",
        boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.5)",
      }}
    >
      <motion.div
        variants={slideIn("left", "tween", 0.2, 1)}
        className="flex-[0.75] bg-opacity-90 bg-black p-8 rounded-2xl"
      >
        <p className={`${styles.sectionSubText} text-blue-300`}>Get in Touch</p>
        <h3 className={`${styles.sectionHeadText} text-blue-100`}>Contact Us</h3>

        <div className="contact-details mt-8">
          {/* Address Section */}
          <div className="contact-info mb-6">
            <h3 className="text-lg font-semibold text-blue-300">
              <i className="fas fa-map-marker-alt mr-2"></i> Address
            </h3>
            <p className="text-white">Patha Thunga Padu Ramalayam Street, East Godavari</p>
          </div>

          {/* Phone Section */}
          <div className="contact-info mb-6">
            <h3 className="text-lg font-semibold text-blue-300">
              <i className="fas fa-phone-alt mr-2"></i> Phone
            </h3>
            <p className="text-white">
              <a href="tel:+919515343071">(+91) 9515343071</a>
            </p>
            <p className="text-white">
              <a href="tel:+919603614667">(+91) 9603614667</a>
            </p>
          </div>

          {/* Email Section */}
          <div className="contact-info">
            <h3 className="text-lg font-semibold text-blue-300">
              <i className="fas fa-envelope mr-2"></i> Email
            </h3>
            <p className="text-white">
              <a href="mailto:sethuteam3071@gmail.com">sethuteam3071@gmail.com</a>
            </p>
            <p className="text-white">
              <a href="mailto:koneramlalsuresh@gmail.com">koneramlalsuresh@gmail.com</a>
            </p>
            <p className="text-white">
              <a href="mailto:sanjaykotha678@gmail.com">sanjaykotha678@gmail.com</a>
            </p>
          </div>
        </div>
      </motion.div>

      <motion.div
        variants={slideIn("right", "tween", 0.2, 1)}
        className="xl:flex-1 xl:h-auto md:h-[550px] h-[350px]"
      >
        <EarthCanvas />
      </motion.div>
    </div>
  );
};

export default Contact;
