import React, { useEffect, useState, useRef } from 'react';
import { Tilt } from 'react-tilt';
import { motion } from 'framer-motion';
import './Achievements.css'; // Import your custom CSS for additional styling
import { fadeIn } from '../utils/motion';

// Counter component for animated counting
const Counter = ({ target, startCount }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (startCount) {
      const increment = () => {
        setCount((prev) => Math.min(prev + Math.ceil(target / 100), target));
      };
      const interval = setInterval(increment, 20); // Speed can be adjusted here
      return () => clearInterval(interval);
    }
  }, [startCount, target]);

  return <span>{count}</span>;
};

// Achievements card component
const AchievementCard = ({ title, target, icon, index, startCounting }) => (
  <motion.div variants={fadeIn("up", "spring", index * 0.5, 0.75)}>
    <Tilt
      options={{
        max: 35,
        scale: 1.05,
        speed: 400,
      }}
      className='achievement-card bg-tertiary p-5 rounded-2xl w-full sm:w-[300px] flex flex-col items-center text-center'
    >
      <img src={icon} alt={`${title} icon`} className='w-16 h-16 mb-4' />
      <h3 className='text-white font-bold text-[20px]'>{title}</h3>
      <p className='text-secondary text-[14px]'>
        <Counter target={target} startCount={startCounting} />
      </p>
    </Tilt>
  </motion.div>
);

const Achievements = () => {
  const [startCounting, setStartCounting] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio === 1) {
            setStartCounting(true);
            observer.disconnect(); // Stop observing after entering the viewport
          }
        });
      },
      { threshold: 1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const achievementsData = [
    { title: 'Projects Completed', target: 120, icon: '/public/SETHU.png' },
    { title: 'Happy Clients', target: 75, icon: '/public/SETHU.png' },
    { title: 'Awards Won', target: 10, icon: '/public/SETHU.png' },
    { title: 'Years Experience', target: 5, icon: '/public/SETHU.png' },
  ];

  return (
    <section ref={sectionRef} className='achievements-section'>
      <div className='container mx-auto'>
        <h2 className='section-title text-white'>Achievements</h2>
        <p className='section-subtitle text-secondary mb-10'>
          Celebrating milestones and successes achieved over time.
        </p>
        <div className='flex flex-wrap gap-7 justify-center'>
          {achievementsData.map((achievement, index) => (
            <AchievementCard
              key={`achievement-${index}`}
              index={index}
              startCounting={startCounting}
              {...achievement}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Achievements;
