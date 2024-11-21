import React, { useRef, useEffect, useState } from 'react';
import './Profile.css';

const Profile = () => {
  const [visibleSections, setVisibleSections] = useState([]);

  const profiles = [
    {
      name: "Ram Lal Suresh",
      picture: "https://sur-3071.github.io/Protfolio/c28.jpg",
      details: [
        "Chief Administrator at SETHU with a vision for enhancing skills.",
        "Over 10 years of experience in organizational management.",
        "Dedicated to creating impactful training programs for growth."
      ],
      links: {
        linkedin: "https://www.linkedin.com/in/ramlalsuresh-kone-1587a3235/",
        github: "https://github.com/Sur-3071",
        hackerrank: "https://www.hackerrank.com/profile/Sur3071",
        leetcode: "https://leetcode.com/u/sur_3071/",
        portfolio: "https://sur-3071.github.io/Protfolio/FrontPage.html"
      },
      picturePosition: "left",
    },
    {
      name: "Sanju",
      picture: "https://media.licdn.com/dms/image/v2/D5635AQEyRRLeHMDzuQ/profile-framedphoto-shrink_800_800/profile-framedphoto-shrink_800_800/0/1700983286696?e=1732723200&v=beta&t=XXaYQLS2e3czJBN3CAihtqb9EL-A7kXiMpeqR5iX6zY",
      details: [
        "Senior Trainer and Program Coordinator at SETHU.",
        "Expert in skill development and hands-on learning strategies.",
        "Passionate about helping individuals unlock their potential."
      ],
      links: {
        linkedin: "https://www.linkedin.com/in/kotha-sanjay-66059721a/",
        github: "https://github.com/sanjaykotha",
        hackerrank: "https://www.hackerrank.com/profile/sanjaykotha678",
        leetcode: "https://leetcode.com/u/sanjaykotha678/"
      },
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
            <div className="profile-links">
              {profile.links.linkedin && (
                <a href={profile.links.linkedin} target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-linkedin"></i>
                </a>
              )}
              {profile.links.github && (
                <a href={profile.links.github} target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-github"></i>
                </a>
              )}
              {profile.links.hackerrank && (
                <a href={profile.links.hackerrank} target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-hackerrank"></i>
                </a>
              )}
              {profile.links.leetcode && (
                <a href={profile.links.leetcode} target="_blank" rel="noopener noreferrer">
                  <i className="fas fa-code"></i> {/* Corrected for Font Awesome 5 */}
                </a>
              )}
              {profile.links.portfolio && (
                <a href={profile.links.portfolio} target="_blank" rel="noopener noreferrer">
                  <i className="fas fa-globe"></i> {/* Corrected for Font Awesome 5 */}
                </a>
              )}

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
