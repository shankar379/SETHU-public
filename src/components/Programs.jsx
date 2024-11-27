import React, { useState } from "react";
import "./Programs.css";

const Programs = () => {
  const [programsData, setProgramsData] = useState([
    {
      name: "Programs A",
      image: "/images/bg.WebP",
      description: "A leading program for collaborative learning.",
      amount: "$199",
    },
    {
      name: "Programs B",
      image: "/images/bg2.png",
      description: "Innovative tools for creative professionals.",
      amount: "$299",
    },
    {
      name: "Programs C",
      image: "/images/bg3.png",
      description: "Specialized in AI and machine learning.",
      amount: "$399",
    },
    {
      name: "Programs D",
      image: "/images/herobg.png",
      description: "Focus on digital transformation and skills.",
      amount: "$499",
    },
    {
      name: "Programs E",
      image: "/images/bg3.png",
      description: "Specialized in AI and machine learning.",
      amount: "$399",
    },
    {
      name: "Programs F",
      image: "/images/herobg.png",
      description: "Focus on digital transformation and skills.",
      amount: "$499",
    },
  ]);

  return (
    <section className="programs">
      <h2 className="text-4xl font-bold mb-6 text-center">Programs</h2>
      <p className="text-lg text-center max-w-2xl mx-auto mb-12">
        Discover our programs designed to enhance learning, creativity, and innovation.
      </p>

      <div className="scrolling-programs">
        <div className="programs-slide">
          {programsData.map((program, index) => (
            <div key={index} className="program-card">
              <img src={program.image} alt={program.name} />
              <div className="card-content">
                <h3 className="text-lg font-bold">{program.name}</h3>
                <p>{program.description}</p>
                <span className="amount">{program.amount}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="programs-slide">
          {/* Duplicate cards for seamless scrolling */}
          {programsData.map((program, index) => (
            <div key={`duplicate-${index}`} className="program-card">
              <img src={program.image} alt={program.name} />
              <div className="card-content">
                <h3 className="text-lg font-bold">{program.name}</h3>
                <p>{program.description}</p>
                <span className="amount">{program.amount}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Programs;
