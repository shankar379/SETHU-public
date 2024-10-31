// SethuDynamic.jsx
import React from 'react';
import StaticNav from './StaticNav';
import StaticAbout from './StaticAbout';
import ContactUs from './ContactUs';
import Colleges from './StaticColleges';
import StaticReviews from './StaticReviews'
import Achievements from './Achievements';
import Home from './Home';

const SethuDynamic = () => {
  return (
    <div className="w-screen h-screen bg-gradient-to-r from-blue-900 to-gray-900 text-white">
      {/* Use Nav Component */}
      <StaticNav />

      {/* Sections with corresponding IDs and full height */}
      <div className="w-full">
        <section id="home" className="min-h-screen flex justify-center items-center">
          <Home />
        </section>
        <section id="about" className="min-h-screen flex justify-center items-center">
          <StaticAbout />
        </section>
        <section id="achievements" className="min-h-screen flex justify-center items-center">
          <Achievements />
        </section>
        <section id="colleges" className="min-h-screen flex justify-center items-center">
          <Colleges />
        </section>
        <section id="StaticReviews" className="min-h-screen flex justify-center items-center">
          <StaticReviews />
        </section>
        <section id="contact" className="min-h-screen flex justify-center items-center">
          <ContactUs />
        </section>
      </div>
    </div>
  );
};

export default SethuDynamic;
