import React, { useState, useEffect } from 'react';
import { database, ref, onValue } from '../firebase'; // Import Firebase Database

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
    <section className="w-full min-h-screen bg-gradient-to-b from-gray-900 to-black text-white p-12 flex flex-col items-center">
      <h2 className="text-5xl font-bold mb-12 text-center text-yellow-400">About Us</h2>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-6xl animate-fadeIn delay-100">
        {/* Mission Section */}
        <div className="p-6 bg-gray-800 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105">
          <h3 className="text-3xl font-semibold text-center mb-4 text-blue-300">Mission</h3>
          <p className="text-lg text-gray-400 leading-relaxed text-center">{missionText}</p>
        </div>

        {/* Vision Section */}
        <div className="p-6 bg-gray-800 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105">
          <h3 className="text-3xl font-semibold text-center mb-4 text-blue-300">Vision</h3>
          <p className="text-lg text-gray-400 leading-relaxed text-center">{visionText}</p>
        </div>

        {/* Programs Section */}
        <div className="p-6 bg-gray-800 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105 md:col-span-2">
          <h3 className="text-3xl font-semibold text-center mb-4 text-yellow-400">Programs</h3>
          <p className="text-lg text-gray-400 leading-relaxed text-center">{programs}</p>
        </div>

        {/* Platforms Section */}
        <div className="p-6 bg-gray-800 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105 md:col-span-2">
          <h3 className="text-3xl font-semibold text-center mb-4 text-yellow-400">Platforms</h3>
          <p className="text-lg text-gray-400 leading-relaxed text-center">{platformsText}</p>
        </div>
      </div>
    </section>
  );
};

export default StaticAbout;
