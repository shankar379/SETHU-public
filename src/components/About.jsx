import React from 'react';

const About = () => {
  return (
    <section className="w-full min-h-screen bg-gradient-to-b from-gray-900 to-black text-white p-12 flex flex-col justify-center items-center">
      <h2 className="text-5xl font-bold mb-6 text-center text-blue-400 animate-fadeIn">About Us</h2>
      <p className="max-w-4xl text-center text-lg mb-12 text-gray-300 leading-relaxed animate-fadeIn delay-100">
        Welcome to <span className="text-blue-500 font-semibold">SETHU</span>, where we are committed to enhancing skills through innovative training and hands-on learning. 
        Our mission is to empower students and professionals to succeed in today’s fast-paced world by bridging the gap between education and industry.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-slideUp">
        {/* Mission Section */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 text-center transform hover:scale-105">
          <h3 className="text-2xl font-semibold mb-2 text-blue-300">Our Mission</h3>
          <p className="text-gray-400">
            To foster a learning environment where individuals gain practical skills to prepare them for the future. We create opportunities for growth and success.
          </p>
        </div>

        {/* Vision Section */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 text-center transform hover:scale-105">
          <h3 className="text-2xl font-semibold mb-2 text-blue-300">Our Vision</h3>
          <p className="text-gray-400">
            To be a leader in skill-based education, recognized for our innovative approach and dedication to excellence. We aim to shape the leaders of tomorrow.
          </p>
        </div>
      </div>

      {/* Key Programs */}
      <div className="mt-16 w-full max-w-4xl animate-slideUp delay-200">
        <h3 className="text-3xl font-semibold text-center mb-8 text-blue-400">Key Programs</h3>
        <ul className="list-disc list-inside space-y-4 text-lg text-gray-300 pl-6">
          <li><strong className="text-blue-500">Technical Training:</strong> Courses in programming, web development, and data science.</li>
          <li><strong className="text-blue-500">Soft Skills Workshops:</strong> Enhance communication, teamwork, and leadership through interactive sessions.</li>
          <li><strong className="text-blue-500">Internships and Projects:</strong> Gain real-world experience by working on industry-relevant projects.</li>
          <li><strong className="text-blue-500">Certifications:</strong> Earn credentials in cutting-edge technologies to boost your career.</li>
        </ul>
      </div>
    </section>
  );
};

export default About;
