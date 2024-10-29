import React from 'react';
import './Profile.css';

const Profile = () => {
  const profiles = [
    {
      name: "John Doe",
      picture: "images/rr.png",
      details: [
        "Software Engineer with a focus on innovative solutions.",
        "Experienced in front-end and back-end development.",
        "Passionate about continuous learning and improvement.",
      ],
      picturePosition: "left",
    },
    {
      name: "Jane Smith",
      picture: "images/rr.png",
      details: [
        "Data Scientist specializing in AI and Machine Learning.",
        "Proficient in Python, R, and data visualization tools.",
        "Committed to leveraging data for impactful insights.",
      ],
      picturePosition: "right",
    },
  ];

  return (
    <div className="profile-container">
      {profiles.map((profile, index) => (
        <div className="profile-section" key={index}>
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
