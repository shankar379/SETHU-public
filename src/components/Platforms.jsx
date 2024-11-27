import React, { useState } from "react";
import "./Platforms.css";

const Platforms = () => {
  const [platformData, setPlatformData] = useState([
    {
      name: "Platform A",
      image: "/images/bg.WebP",
      description: "A leading platform for collaborative learning.",
      amount: "$199",
    },
    {
      name: "Platform B",
      image: "/images/bg2.png",
      description: "Innovative tools for creative professionals.",
      amount: "$299",
    },
    {
      name: "Platform C",
      image: "/images/bg3.png",
      description: "Specialized in AI and machine learning.",
      amount: "$399",
    },
    {
      name: "Platform D",
      image: "/images/herobg.png",
      description: "Focus on digital transformation and skills.",
      amount: "$499",
    },
    {
        name: "Platform E",
        image: "/images/bg3.png",
        description: "Specialized in AI and machine learning.",
        amount: "$399",
      },
      {
        name: "Platform F",
        image: "/images/herobg.png",
        description: "Focus on digital transformation and skills.",
        amount: "$499",
      },
    
  ]);

  return (
    <section className="platforms">
      <h2 className="text-4xl font-bold mb-6 text-center">Platforms</h2>
      <p className="text-lg text-center max-w-2xl mx-auto mb-12">
        Discover our platforms designed to enhance learning, creativity, and innovation.
      </p>

      <div className="scrolling-cards">
        <div className="cards-slide">
          {platformData.map((platform, index) => (
            <div key={index} className="platform-card">
              <img src={platform.image} alt={platform.name} />
              <div className="card-content">
                <h3 className="text-lg font-bold">{platform.name}</h3>
                <p>{platform.description}</p>
                <span className="amount">{platform.amount}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="cards-slide">
          {/* Duplicate cards for seamless scrolling */}
          {platformData.map((platform, index) => (
            <div key={`duplicate-${index}`} className="platform-card">
              <img src={platform.image} alt={platform.name} />
              <div className="card-content">
                <h3 className="text-lg font-bold">{platform.name}</h3>
                <p>{platform.description}</p>
                <span className="amount">{platform.amount}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Platforms;
