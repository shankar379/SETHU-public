import React from "react";
import "./StaticReviews.css";

const StaticReviews = () => {
  const reviews = [
    { 
      text: "The course was absolutely fantastic! The teacher explained every concept clearly, and the hands-on practice made it even better.", 
      author: "Aaravindh, GIET College" 
    },
    { 
      text: "I highly recommend this course to anyone looking to understand the fundamentals. The examples were relevant and practical.", 
      author: "Divya, pragathi engineering college" 
    },
    { 
      text: "One of the best courses I’ve taken! The instructor was very knowledgeable and the content was up-to-date with industry standards.", 
      author: "Shiva, pragathi engineering college" 
    },
    { 
      text: "The course helped me land my first job in the industry. It’s a must for anyone serious about learning.", 
      author: "Suresh, KITS college" 
    },
    { 
      text: "Fantastic course with great content! I learned a lot, and the projects were very practical.", 
      author: "Sathish, KITS college" 
    },
    { 
      text: "Clear explanations, and I loved how interactive the course was. The projects were challenging but fun!", 
      author: "Ishita , VES college" 
    },
    { 
      text: "This course is a must for anyone wanting to get a comprehensive understanding of the subject. Truly an eye-opener!", 
      author: "Rahul , GIET University" 
    },
    { 
      text: "The instructor was very patient and explained things in a way that was easy to understand. I gained so much confidence.", 
      author: "Sneha , GIET University" 
    },{ 
      text: "The course gave me a strong foundation to build my career. The faculty was extremely supportive throughout.", 
      author: "Vishnu, RIET College" 
    },
    { 
      text: "A very well-structured course with great examples and real-world projects. Highly recommended!", 
      author: "Durga Shankar, RIET College" 
    },
    { 
      text: "This course helped me gain confidence in my skills. The hands-on assignments were truly enlightening.", 
      author: "Lakshman, RIET College" 
    },
    { 
      text: "An excellent course for anyone who wants to learn and grow. The practical approach made it very engaging.", 
      author: "Rajesh, RIET College" 
    },    
    
      {
        text: "The course was very practical and easy to follow. The hands-on exercises helped me apply the concepts effectively.",
        author: "Manoj, KITS college"
      },
      {
        text: "I really enjoyed the interactive sessions and the personalized feedback from the instructor. It made a big difference!",
        author: "Swathi, ISTS college"
      },
      {
        text: "The projects were aligned with industry standards, giving me the confidence to tackle real-world problems.",
        author: "Karthik, RIET college"
      },
      {
        text: "An excellent learning experience! The step-by-step approach made it easy for me to grasp complex topics.",
        author: "Varsha, ISTS college"
      },
      {
        text: "The instructors were knowledgeable and approachable. Their guidance was instrumental in my learning journey.",
        author: "Ramesh, KITS college"
      },
      {
        text: "The curriculum was well-structured, and the emphasis on practical skills was exactly what I needed.",
        author: "Sandhya, ISTS college"
      },
      {
        text: "A wonderful course that bridged the gap between theory and practice. The examples were very relatable.",
        author: "Venkatesh, GIER college"
      },
      {
        text: "I was impressed by how the course covered everything from basics to advanced topics. The resources were invaluable.",
        author: "Padma, pragathi engineering college"
      },
      {
        text: "The mentorship and support I received during this course were top-notch. I’m now confident in my career path.",
        author: "Shiva, VES college"
      },
      {
        text: "The focus on real-world applications and live projects made this course stand out from the rest. Highly recommended!",
        author: "Priya, ISTS college"
      },
      { 
        text: "The course was absolutely fantastic! The teacher explained every concept clearly, and the hands-on practice made it even better.", 
        author: "Aaravindh, GIET College" 
      },
      { 
        text: "I highly recommend this course to anyone looking to understand the fundamentals. The examples were relevant and practical.", 
        author: "Divya, pragathi engineering college" 
      },
      { 
        text: "One of the best courses I’ve taken! The instructor was very knowledgeable and the content was up-to-date with industry standards.", 
        author: "Shiva, pragathi engineering college" 
      },
      { 
        text: "The course helped me land my first job in the industry. It’s a must for anyone serious about learning.", 
        author: "Suresh, KITS college" 
      },
      { 
        text: "Fantastic course with great content! I learned a lot, and the projects were very practical.", 
        author: "Sathish, KITS college" 
      },
      { 
        text: "Clear explanations, and I loved how interactive the course was. The projects were challenging but fun!", 
        author: "Ishita , VES college" 
      },
      { 
        text: "This course is a must for anyone wanting to get a comprehensive understanding of the subject. Truly an eye-opener!", 
        author: "Rahul , GIET University" 
      },
      { 
        text: "The instructor was very patient and explained things in a way that was easy to understand. I gained so much confidence.", 
        author: "Sneha , GIET University" 
      },{ 
        text: "The course gave me a strong foundation to build my career. The faculty was extremely supportive throughout.", 
        author: "Vishnu, RIET College" 
      },
      { 
        text: "A very well-structured course with great examples and real-world projects. Highly recommended!", 
        author: "Durga Shankar, RIET College" 
      },
      { 
        text: "This course helped me gain confidence in my skills. The hands-on assignments were truly enlightening.", 
        author: "Lakshman, RIET College" 
      },
      { 
        text: "An excellent course for anyone who wants to learn and grow. The practical approach made it very engaging.", 
        author: "Rajesh, RIET College" 
      },    
      
        {
          text: "The course was very practical and easy to follow. The hands-on exercises helped me apply the concepts effectively.",
          author: "Manoj, KITS college"
        },
        {
          text: "I really enjoyed the interactive sessions and the personalized feedback from the instructor. It made a big difference!",
          author: "Swathi, ISTS college"
        },
        {
          text: "The projects were aligned with industry standards, giving me the confidence to tackle real-world problems.",
          author: "Karthik, RIET college"
        },
        {
          text: "An excellent learning experience! The step-by-step approach made it easy for me to grasp complex topics.",
          author: "Varsha, ISTS college"
        },
        {
          text: "The instructors were knowledgeable and approachable. Their guidance was instrumental in my learning journey.",
          author: "Ramesh, KITS college"
        },
        {
          text: "The curriculum was well-structured, and the emphasis on practical skills was exactly what I needed.",
          author: "Sandhya, ISTS college"
        },
        {
          text: "A wonderful course that bridged the gap between theory and practice. The examples were very relatable.",
          author: "Venkatesh, GIER college"
        },
        {
          text: "I was impressed by how the course covered everything from basics to advanced topics. The resources were invaluable.",
          author: "Padma, pragathi engineering college"
        },
        {
          text: "The mentorship and support I received during this course were top-notch. I’m now confident in my career path.",
          author: "Shiva, VES college"
        },
        {
          text: "The focus on real-world applications and live projects made this course stand out from the rest. Highly recommended!",
          author: "Priya, ISTS college"
        }
    
    
  ];

  return (
    <section id="StaticReviews" className="w-full h-full">
      <div className="w-full h-full reviews-container">
        <div className="lane lane-up">
          {reviews.concat(reviews).map((review, index) => (
            <div className="review-card" key={`up-${index}`}>
              <p>{`"${review.text}"`}</p>
              <p><strong>- {review.author}</strong></p>
            </div>
          ))}
        </div>
        <div className="lane lane-down">
          {reviews.concat(reviews).map((review, index) => (
            <div className="review-card" key={`down-${index}`}>
              <p>{`"${review.text}"`}</p>
              <p><strong>- {review.author}</strong></p>
            </div>
          ))}
        </div>
        <div className="lane lane-up">
          {reviews.concat(reviews).map((review, index) => (
            <div className="review-card" key={`up2-${index}`}>
              <p>{`"${review.text}"`}</p>
              <p><strong>- {review.author}</strong></p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StaticReviews;
