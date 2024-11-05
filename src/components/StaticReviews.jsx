import React from 'react';
import './StaticReviews.css';

const StaticReviews = () => {
  const reviews = [
    { text: "The course was absolutely fantastic! The teacher explained every concept clearly, and the hands-on practice made it even better.", author: "John Doe" },
    { text: "I highly recommend this course to anyone looking to understand the fundamentals. The examples were relevant and practical.", author: "Jane Smith" },
    { text: "One of the best courses I’ve taken! The instructor was very knowledgeable and the content was up-to-date with industry standards.", author: "Michael Lee" },
    { text: "The course helped me land my first job in the industry. It’s a must for anyone serious about learning.", author: "Emma Davis" },
    { text: "Fantastic course with great content! I learned a lot, and the projects were very practical.", author: "Kevin White" },
    { text: "Clear explanations, and I loved how interactive the course was. The projects were challenging but fun!", author: "Laura Green" },
    { text: "This course is a must for anyone wanting to get a comprehensive understanding of the subject. Truly an eye-opener!", author: "Ashley Brown" },
    { text: "The instructor was very patient and explained things in a way that was easy to understand. I gained so much confidence.", author: "Chris Evans" },
  ];

  return (
    <section id="StaticReviews" className="min-h-screen">
      <div className="w-full reviews-container">
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
