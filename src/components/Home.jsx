import React from 'react';
import { motion } from "framer-motion";

const Home = () => {
    return (
        <section 
            id="hero-section" 
            className="relative bg-gradient-to-r from-[#002D62] to-[#008080] text-white min-h-screen w-full flex items-center justify-center"
            style={{
                backgroundImage: `url("/images/bg3.png")`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
            }}
        >
            {/* Gradient overlay for transparency effect at the left bottom corner */}
            <div 
                className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-[#002D62] opacity-50"
                style={{
                    maskImage: "linear-gradient(to top right, transparent 60%, black 100%)",
                }}
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center max-w-3xl px-6">
                <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
                    Welcome to 
                </h1>
                <h1>
                    <span className="text-[#fecaca] text-3xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
                        Skill Enhancement Training and Hands-on Understanding
                    </span>
                </h1>
                <p className="text-base md:text-xl font-light mb-8 text-gray-300">
                    Empowering your potential with exceptional skills and practical knowledge.
                </p>
                <motion.a 
                    href="#"
                    whileHover={{ scale: 1.05 }}
                    className="btn-learn-more bg-[#008080] hover:bg-[#FF6F00] text-white font-semibold text-lg py-3 px-8 rounded-full shadow-lg transform transition duration-300"
                >
                    Learn More
                </motion.a>
            </div>
        </section>
    );
};

export default Home;
