import React, { useState, useEffect } from 'react';
import { database, ref, onValue, push } from '../firebase';
import { useParams } from 'react-router-dom';

const ReviewPage = () => {
  const { employeeId } = useParams(); // Employee ID from URL
  const [rating, setRating] = useState(1); // Default rating
  const [text, setText] = useState(''); // Review text
  const [employeesData, setEmployeesData] = useState({}); // Employee data from Firebase
  const [selectedEmployee, setSelectedEmployee] = useState(''); // To select employee for review
  const [submissionStatus, setSubmissionStatus] = useState(''); // State for submission status

  // Load employee data on component mount
  useEffect(() => {
    const employeeRef = ref(database, 'employees');
    onValue(employeeRef, (snapshot) => {
      const data = snapshot.val();
      setEmployeesData(data || {}); // Store employee data
    });
  }, []);

  // Handle review submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (selectedEmployee) {
      const review = { rating, text };
      const reviewsRef = ref(database, `employees/${selectedEmployee}/reviews`);
      await push(reviewsRef, review); // Push review to Firebase under selected employee

      // Set the success message and clear the form
      setSubmissionStatus('Review successfully submitted!');
      setRating(1); // Reset rating
      setText(''); // Reset review text

      // Clear the success message after 2 seconds
      setTimeout(() => {
        setSubmissionStatus(''); // Clear the message after a delay
      }, 2000); // 2-second delay
    }
  };

  return (
    <div className="p-6 bg-gradient-to-r from-green-500 to-green-700 min-h-screen flex items-center justify-center">
      <div className="max-w-lg bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-3xl font-bold mb-6 text-green-600">Write a Review</h2>

        {/* Employee Selection Dropdown */}
        <select
          className="w-full p-2 mb-4 border border-gray-300 rounded text-black"
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

        {/* Review Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-black">Rating:</label>
            <input
              type="number"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              min="1"
              max="5"
              required
              className="w-full p-2 border border-gray-300 rounded text-black"
            />
          </div>

          <div>
            <label className="block text-black">Review:</label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Write your review here..."
              required
              className="w-full p-2 border border-gray-300 rounded text-black"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded"
            disabled={!selectedEmployee} // Disable if no employee selected
          >
            Submit Review
          </button>
        </form>

        {/* Display submission status */}
        {submissionStatus && (
          <p className="text-green-600 mt-4 font-bold">{submissionStatus}</p>
        )}
      </div>
    </div>
  );
};

export default ReviewPage;
