import React, { useState, useEffect } from 'react';
import { database, ref, onValue, push } from '../firebase';
import { useParams } from 'react-router-dom';

const ReviewPage = () => {
  const { employeeId } = useParams(); // Employee ID from URL
  const [rating, setRating] = useState(1); // Default rating
  const [text, setText] = useState(''); // Review text
  const [rollNumber, setRollNumber] = useState(''); // Student Roll Number
  const [branch, setBranch] = useState(''); // Branch
  const [employeesData, setEmployeesData] = useState({}); // Employee data from Firebase
  const [selectedEmployee, setSelectedEmployee] = useState(''); // To select employee for review
  const [submissionStatus, setSubmissionStatus] = useState(''); // State for submission status

  useEffect(() => {
    const employeeRef = ref(database, 'employees');
    onValue(employeeRef, (snapshot) => {
      const data = snapshot.val();
      setEmployeesData(data || {});
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedEmployee) {
      const reviewsRef = ref(database, `employees/${selectedEmployee}/reviews`);
      const existingReviewsSnapshot = await new Promise((resolve) =>
        onValue(reviewsRef, resolve, { onlyOnce: true })
      );
      const existingReviews = existingReviewsSnapshot.val();
      const duplicateReview = Object.values(existingReviews || {}).find(
        (review) => review.rollNumber === rollNumber
      );
      if (duplicateReview) {
        setSubmissionStatus('Review with this Roll Number already exists.');
        setTimeout(() => setSubmissionStatus(''), 2000);
        return;
      }
      const review = { rating, text, rollNumber, branch };
      await push(reviewsRef, review);
      setSubmissionStatus('Review successfully submitted!');
      setRating(1);
      setText('');
      setRollNumber('');
      setBranch('');
      setTimeout(() => {
        setSubmissionStatus('');
      }, 2000);
    }
  };

  return (
    <div className="w-full p-6 min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1C1B29] via-[#0D1137] to-[#0A0A23]">
      <div className="max-w-lg w-full bg-[#1E213A] shadow-2xl rounded-lg p-8 text-white transform transition duration-500 hover:scale-105">
        <h2 className="text-3xl font-bold mb-6 text-center">Write a Review</h2>
        
        <select
          className="w-full p-3 mb-4 border border-[#4E4E6C] bg-[#2B2D42] rounded text-white focus:outline-none focus:ring-2 focus:ring-[#5762D5]"
          value={selectedEmployee}
          onChange={(e) => setSelectedEmployee(e.target.value)}
        >
          <option value="">Select an Employee</option>
          {Object.keys(employeesData).map((key) => (
            <option key={key} value={key}>
              {employeesData[key].name} (ID: {employeesData[key].employeeId})
            </option>
          ))}
        </select>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-[#C1C1D0]">Roll Number:</label>
            <input
              type="text"
              value={rollNumber}
              onChange={(e) => setRollNumber(e.target.value)}
              placeholder="Enter Roll Number"
              required
              className="w-full p-3 border border-[#4E4E6C] bg-[#2B2D42] rounded text-white focus:outline-none focus:ring-2 focus:ring-[#5762D5]"
            />
          </div>

          <div>
            <label className="block text-[#C1C1D0]">Branch:</label>
            <select
              value={branch}
              onChange={(e) => setBranch(e.target.value)}
              required
              className="w-full p-3 border border-[#4E4E6C] bg-[#2B2D42] rounded text-white focus:outline-none focus:ring-2 focus:ring-[#5762D5]"
            >
              <option value="">Select Branch</option>
              <option value="CSE">CSE</option>
              <option value="EEE">EEE</option>
              <option value="ECE">ECE</option>
              <option value="MECH">MECH</option>
            </select>
          </div>

          <div>
            <label className="block text-[#C1C1D0]">Rating:</label>
            <input
              type="number"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              min="1"
              max="5"
              required
              className="w-full p-3 border border-[#4E4E6C] bg-[#2B2D42] rounded text-white focus:outline-none focus:ring-2 focus:ring-[#5762D5]"
            />
          </div>

          <div>
            <label className="block text-[#C1C1D0]">Review:</label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Write your review here..."
              required
              className="w-full p-3 border border-[#4E4E6C] bg-[#2B2D42] rounded text-white focus:outline-none focus:ring-2 focus:ring-[#5762D5]"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-[#5762D5] p-3 rounded transition duration-300 transform hover:scale-105 disabled:opacity-50"
            disabled={!selectedEmployee}
          >
            Submit Review
          </button>
        </form>

        {submissionStatus && (
          <p className="text-[#A4C639] mt-4 font-bold text-center">{submissionStatus}</p>
        )}
      </div>
    </div>
  );
};

export default ReviewPage;
