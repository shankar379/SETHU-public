import React, { useRef, useState, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF, Points, PointMaterial, Html, useProgress } from "@react-three/drei";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import * as random from "maath/random/dist/maath-random.esm";

// Styles with Gradient Enhancement
const styles = {
  paddingX: "sm:px-16 px-6",
  paddingY: "sm:py-16 py-6",
  padding: "sm:px-16 px-6 sm:py-16 py-10",
  heroHeadText: "font-black text-white lg:text-[80px] sm:text-[60px] xs:text-[50px] text-[40px] lg:leading-[98px] mt-2",
  heroSubText: "text-[#dfd9ff] font-medium lg:text-[30px] sm:text-[26px] xs:text-[20px] text-[16px] lg:leading-[40px]",
  sectionHeadText: "text-white font-black md:text-[60px] sm:text-[50px] xs:text-[40px] text-[30px]",
  sectionSubText: "sm:text-[18px] text-[14px] text-secondary uppercase tracking-wider",
};

// Motion variants
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

const staggerContainer = (staggerChildren, delayChildren) => ({
  hidden: {},
  show: { transition: { staggerChildren, delayChildren: delayChildren || 0 } },
});

// Components
const Earth = () => {
  const earth = useGLTF("/planet/scene.gltf");
  return <primitive object={earth.scene} scale={2.5} position-y={0} rotation-y={0} />;
};

const EarthCanvas = () => (
  <Canvas shadows frameloop='demand' dpr={[1, 2]} gl={{ preserveDrawingBuffer: true }}
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
    <Html as='div' center style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
      <span className='canvas-loader'></span>
      <p style={{ fontSize: 14, color: "#F1F1F1", fontWeight: 800, marginTop: 40 }}>{progress.toFixed(2)}%</p>
    </Html>
  );
};

const Stars = () => {
  const ref = useRef();
  const [sphere] = useState(() => random.inSphere(new Float32Array(5000), { radius: 1.2 }));
  useFrame((_, delta) => { ref.current.rotation.x -= delta / 10; ref.current.rotation.y -= delta / 15; });
  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled>
        <PointMaterial transparent color='#f272c8' size={0.002} sizeAttenuation depthWrite={false} />
      </Points>
    </group>
  );
};

const StarsCanvas = () => (
  <div className='w-full h-auto absolute inset-0 z-[-1]'>
    <Canvas camera={{ position: [0, 0, 1] }}>
      <Suspense fallback={null}>
        <Stars />
      </Suspense>
      <Preload all />
    </Canvas>
  </div>
);

// Contact Form with Enhanced Gradient Styles
const Contact = () => {
  const formRef = useRef();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    emailjs.send(import.meta.env.VITE_APP_EMAILJS_SERVICE_ID, import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID, {
      from_name: form.name,
      to_name: "JavaScript Mastery",
      from_email: form.email,
      to_email: "sujata@jsmastery.pro",
      message: form.message,
    }, import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY)
      .then(() => {
        setLoading(false);
        alert("Thank you. I will get back to you as soon as possible.");
        setForm({ name: "", email: "", message: "" });
      }, (error) => {
        setLoading(false);
        console.error(error);
        alert("Ahh, something went wrong. Please try again.");
      });
  };

  return (
    <div className="xl:mt-12 flex xl:flex-row xl:flex-[0.85] flex-col-reverse gap-10 overflow-hidden"
      style={{ background: "linear-gradient(135deg, #1a237e, #42a5f5)", padding: "2rem", borderRadius: "12px" }}>
      <motion.div variants={slideIn("left", "tween", 0.2, 1)} className='flex-[0.75] bg-opacity-70 bg-black p-8 rounded-2xl'>
        <p className={`${styles.sectionSubText} text-light-blue-300`}>Get in touch</p>
        <h3 className={`${styles.sectionHeadText} text-light-blue-100`}>Contact.</h3>
        <form ref={formRef} onSubmit={handleSubmit} className='mt-12 flex flex-col gap-8'>
          <label className='flex flex-col'>
            <span className='text-white font-medium mb-4'>Your Name</span>
            <input type='text' name='name' value={form.name} onChange={handleChange}
              placeholder="What's your good name?" className='bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium' />
          </label>
          <label className='flex flex-col'>
            <span className='text-white font-medium mb-4'>Your email</span>
            <input type='email' name='email' value={form.email} onChange={handleChange}
              placeholder="What's your web address?" className='bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium' />
          </label>
          <label className='flex flex-col'>
            <span className='text-white font-medium mb-4'>Your Message</span>
            <textarea rows={7} name='message' value={form.message} onChange={handleChange}
              placeholder='What you want to say?' className='bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium' />
          </label>
          <button type='submit' className='bg-light-blue-500 py-3 px-8 rounded-xl outline-none w-fit text-white font-bold shadow-md shadow-primary'>
            {loading ? "Sending..." : "Send"}
          </button>
        </form>
      </motion.div>
      <motion.div variants={slideIn("right", "tween", 0.2, 1)} className='xl:flex-1 xl:h-auto md:h-[550px] h-[350px]'>
        <EarthCanvas />
      </motion.div>
    </div>
  );
};

export default Contact;
