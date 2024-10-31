import React, { useState, useEffect } from 'react';
import { database, ref, onValue } from '../firebase'; // Import Firebase Database
import { FaBullseye, FaEye, FaLaptopCode, FaRocket } from 'react-icons/fa';

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
      className="relative bg-gradient-to-r from-[#002D62] to-[#008080] text-white min-h-screen w-full flex items-center justify-center"
      style={{
        backgroundImage: "url('/images/herobg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Main Content Container */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full max-w-5xl p-10 rounded-3xl shadow-xl bg-white bg-opacity-30">
        
        {/* Mission Section */}
        <div className="p-8 bg-white bg-opacity-70 rounded-xl shadow-lg hover:scale-105 transform transition-all duration-300 flex flex-col items-center text-center">
          <FaBullseye className="text-blue-600 text-5xl mb-4" />
          <h3 className="text-3xl font-semibold mb-3 text-gray-900">Mission</h3>
          <p className="text-lg text-gray-700 leading-relaxed">{missionText}</p>
        </div>

        {/* Vision Section */}
        <div className="p-8 bg-white bg-opacity-70 rounded-xl shadow-lg hover:scale-105 transform transition-all duration-300 flex flex-col items-center text-center">
          <FaEye className="text-purple-600 text-5xl mb-4" />
          <h3 className="text-3xl font-semibold mb-3 text-gray-900">Vision</h3>
          <p className="text-lg text-gray-700 leading-relaxed">{visionText}</p>
        </div>

        {/* Programs Section */}
        <div className="md:col-span-2 p-8 bg-white bg-opacity-70 rounded-xl shadow-lg hover:scale-105 transform transition-all duration-300 flex flex-col items-center text-center">
          <FaRocket className="text-teal-600 text-5xl mb-4" />
          <h3 className="text-3xl font-semibold mb-3 text-gray-900">Programs</h3>
          <p className="text-lg text-gray-700 leading-relaxed">{programs}</p>
        </div>

        {/* Platforms Section */}
        <div className="md:col-span-2 p-8 bg-white bg-opacity-70 rounded-xl shadow-lg hover:scale-105 transform transition-all duration-300 flex flex-col items-center text-center">
          <FaLaptopCode className="text-pink-600 text-5xl mb-4" />
          <h3 className="text-3xl font-semibold mb-3 text-gray-900">Platforms</h3>
          <p className="text-lg text-gray-700 leading-relaxed">{platformsText}</p>
        </div>
      </div>
    </section>
  );
};

export default StaticAbout;
