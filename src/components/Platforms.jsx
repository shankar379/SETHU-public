import React, { useState } from "react";
import "./Platforms.css";

const Platforms = () => {
  const [platformData, setPlatformData] = useState([
    {
      name: "codechef",
      image: "/logos/codechef.jpg",
      description: "codechef",
      amount: "$199",
    },
    {
      name: "gfg",
      image: "/logos/gfg.jpg",
      description: "gfg.",
      amount: "$299",
    },
    {
      name: "hacker earth",
      image: "/logos/hacker earth.png",
      description: "hacker earth.",
      amount: "$399",
    },
    {
      name: "hackerrank",
      image: "/logos/hackerrank.webp",
      description: "hackerrank",
      amount: "$499",
    },
    {
        name: "leetcode",
        image: "/logos/leetcode.webp",
        description: "leetcode",
        amount: "$399",
      },
      {
        name: "hacker earth",
        image: "/logos/hacker earth.png",
        description: "hacker earth.",
        amount: "$399",
      },
      // minimum 6 cards details need
    
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
