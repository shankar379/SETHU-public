import React, { useEffect, useState, useRef } from 'react';
import './Achievements.css'; // Import the CSS from your provided styles

// Counter component
const Counter = ({ target, startCount }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (startCount) {
      const increment = () => {
        setCount((prev) => Math.min(prev + Math.ceil(target / 100), target));
      };
      const interval = setInterval(increment, 20); // Adjust speed as necessary
      return () => clearInterval(interval); // Cleanup on unmount
    }
  }, [startCount, target]);

  return <span>{count}</span>;
};

// Function to generate random animation properties
const getRandomAnimationProperties = () => {
  const duration = Math.random() * 5 + 3; // Random duration between 3s and 8s
  const delay = Math.random() * 2; // Random delay between 0s and 2s
  return {
    animationDuration: `${duration}s`,
    animationDelay: `${delay}s`,
  };
};

const Achievements = () => {
  const [startCounting, setStartCounting] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio === 1) {
            setStartCounting(true);
            observer.disconnect(); // Stop observing once fully visible
          }
        });
      },
      {
        threshold: 1, // 1 means 100% of the element is visible
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section className="achievements-section p-8 text-center" id="achievements" ref={sectionRef}>
      <h2 className="text-4xl font-bold mb-4 text-black">Achievements</h2>
      <p className="about-text text-lg leading-relaxed text-black">
        Our graduates have excelled in various industries, and we’ve received numerous accolades for our excellence in training and education.
      </p>
      
      <div className="achievements-grid mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {/* Card 1 */}
        <div className="e-card playing">
          <div className="image"></div>
          {/* Add random animation properties to each wave */}
          <div className="wave" style={getRandomAnimationProperties()}></div>
          <div className="wave" style={getRandomAnimationProperties()}></div>
          <div className="wave" style={getRandomAnimationProperties()}></div>
          <div className="infotop">
            <Counter target={256} startCount={startCounting} />+<br />
            <p>Students Certified</p>
          </div>
        </div>

        {/* Card 2 */}
        <div className="e-card playing">
          <div className="image"></div>
          <div className="wave" style={getRandomAnimationProperties()}></div>
          <div className="wave" style={getRandomAnimationProperties()}></div>
          <div className="wave" style={getRandomAnimationProperties()}></div>
          <div className="infotop">
            <Counter target={150} startCount={startCounting} />+<br />
            <p>Industry Partners</p>
          </div>
        </div>

        {/* Card 3 */}
        <div className="e-card playing">
          <div className="image"></div>
          <div className="wave" style={getRandomAnimationProperties()}></div>
          <div className="wave" style={getRandomAnimationProperties()}></div>
          <div className="wave" style={getRandomAnimationProperties()}></div>
          <div className="infotop">
            <Counter target={50} startCount={startCounting} />+<br />
            <p>Workshops Conducted</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Achievements;
