import React, { useRef, useEffect, useState } from 'react';
import './Profile.css';

const Profile = () => {
  const [visibleSections, setVisibleSections] = useState([]);

  const profiles = [
    {
      name: "Ram Lal Suresh",
      picture: "images/Profile1.png",
      details: [
        "Chief Administrator at SETHU with a vision for enhancing skills.",
        "Over 10 years of experience in organizational management.",
        "Dedicated to creating impactful training programs for growth."
      ],
      picturePosition: "left",
    },
    {
      name: "Sanju",
      picture: "images/Profile1.png",
      details: [
        "Senior Trainer and Program Coordinator at SETHU.",
        "Expert in skill development and hands-on learning strategies.",
        "Passionate about helping individuals unlock their potential."
      ],
      picturePosition: "right",
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => [...prev, entry.target.id]);
          }
        });
      },
      { threshold: 0.7 } // Trigger when 70% of the element is in view
    );

    const sections = document.querySelectorAll('.profile-section');
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="profile-container">
      {profiles.map((profile, index) => (
        <div
          id={`section-${index}`}
          className={`profile-section ${visibleSections.includes(`section-${index}`) ? 'animate' : ''}`}
          key={index}
        >
          {profile.picturePosition === "left" && (
            <div
              className="profile-picture slide-in-left"
              style={{ backgroundImage: `url(${profile.picture})` }}
            ></div>
          )}
          <div
            className={`profile-details ${
              profile.picturePosition === "left" ? "slide-in-right" : "slide-in-left"
            }`}
          >
            <h1>{profile.name}</h1>
            <div className="details-text">
              {profile.details.map((detail, i) => (
                <p key={i}>{detail}</p>
              ))}
            </div>
          </div>
          {profile.picturePosition === "right" && (
            <div
              className="profile-picture slide-in-right"
              style={{ backgroundImage: `url(${profile.picture})` }}
            ></div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Profile;
