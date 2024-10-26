import React from 'react';

const Colleges = () => {
  const collegeData = [
    { name: 'College A', image: '/images/sethu4.png', description: 'Top-ranked for engineering.' },
    { name: 'College B', image: '/images/SETHU1.png', description: 'Leading in business education.' },
    { name: 'College C', image: '/images/sethu3.png', description: 'Known for innovation in arts.' },
    { name: 'College D', image: '/images/SETHU.png', description: 'Renowned for medical programs.' },
    { name: 'College A', image: '/images/sethu4.png', description: 'Top-ranked for engineering.' },
    { name: 'College B', image: '/images/SETHU1.png', description: 'Leading in business education.' },
    { name: 'College C', image: '/images/sethu3.png', description: 'Known for innovation in arts.' },
    { name: 'College D', image: '/images/SETHU.png', description: 'Renowned for medical programs.' },
  ];

  return (
    <section className="py-10 px-6">
      <h2 className="text-4xl font-bold mb-6 text-center">Colleges</h2>
      <p className="text-lg text-center max-w-2xl mx-auto mb-12">
        We partner with top colleges and universities to provide comprehensive training programs. Learn more about our partnerships and the benefits they offer to students.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {collegeData.map((college, index) => (
          <div 
            key={index} 
            className="relative overflow-hidden rounded-lg shadow-lg transform transition duration-500 hover:scale-105"
          >
            <img
              src={college.image}
              alt={college.name}
              className="w-full h-48 object-cover rounded-lg transform transition-transform duration-300 ease-in-out hover:scale-110"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 hover:opacity-100 flex flex-col justify-center items-center text-white transition-opacity duration-300">
              <h3 className="text-2xl font-semibold mb-2">{college.name}</h3>
              <p className="text-sm">{college.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Colleges;
