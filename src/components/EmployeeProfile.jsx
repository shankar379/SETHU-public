import React, { useState, useEffect } from 'react';
import { database, ref, onValue, update } from '../firebase';
import { useParams, useNavigate } from 'react-router-dom';

const EmployeeProfile = () => {
  const [employeeData, setEmployeeData] = useState(null);
  const [averageRating, setAverageRating] = useState(0);
  const [employeeNodeId, setEmployeeNodeId] = useState('');
  const { employeeId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const employeeRef = ref(database, 'employees');

    const unsubscribe = onValue(employeeRef, (snapshot) => {
      const employees = snapshot.val();
      const employeeEntry = Object.entries(employees).find(
        ([key, emp]) => emp.employeeId === employeeId
      );

      if (employeeEntry) {
        const [nodeId, employee] = employeeEntry;
        setEmployeeData(employee);
        setEmployeeNodeId(nodeId);
        calculateAverageRating(employee.reviews, nodeId);
      } else {
        navigate('/employee-login');
      }
    });

    return () => unsubscribe();
  }, [employeeId, navigate]);

  const calculateAverageRating = (reviews, nodeId) => {
    if (reviews) {
      const ratings = Object.values(reviews).map((review) => parseFloat(review.rating));
      const average = ratings.length > 0 ? ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length : 0;
      const roundedAverage = parseFloat(average.toFixed(2));

      // Update average rating under the specific employee node
      const employeeRef = ref(database, `employees/${nodeId}`);
      update(employeeRef, { averageRating: roundedAverage });

      setAverageRating(roundedAverage);
    }
  };

  const calculateTotalSalary = (attendance, perDaySalary, withdrawals) => {
    const attendanceTotal = Object.values(attendance || {}).reduce((total, status) => {
      return total + (status === 'present' ? perDaySalary : 0);
    }, 0);

    const totalWithdrawn = Object.values(withdrawals || {}).reduce((total, amount) => total + amount, 0);

    return attendanceTotal - totalWithdrawn;
  };

  const countDaysPresent = (attendance) => {
    return Object.values(attendance || {}).filter(status => status === 'present').length;
  };

  if (!employeeData) {
    return <div className="flex items-center justify-center h-screen text-white">Loading...</div>;
  }

  const { name, joiningDate, perDaySalary, profilePhoto, attendance, withdrawals, reviews } = employeeData;
  const totalSalary = calculateTotalSalary(attendance, perDaySalary, withdrawals);
  const daysPresent = countDaysPresent(attendance);

  return (
    <div className="w-full p-6 sm:p-8 min-h-screen bg-gradient-to-b from-[#0d001a] via-[#000033] to-[#000000] flex flex-col items-center">
      <div className="w-full max-w-2xl bg-[#0d001a] shadow-lg rounded-lg p-6 sm:p-8 text-white space-y-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-4 text-[#ccff33]">Employee Profile</h2>

        <div className="flex flex-col items-center mb-6 space-y-4">
          {profilePhoto === "No profile" ? (
            <span>No profile photo</span>
          ) : (
            <img src={profilePhoto} alt="Profile" className="w-20 sm:w-24 h-20 sm:h-24 rounded-full mb-4" />
          )}
          <h3 className="text-xl sm:text-2xl font-semibold">{name}</h3>
          <p className="text-sm sm:text-base text-gray-400">Joining Date: {joiningDate}</p>
        </div>

        <div className="space-y-4">
          <InfoRow label="Per Day Salary" value={`$${perDaySalary}`} />
          <InfoRow label="No. of Days Present" value={daysPresent} />
          <InfoRow label="Total Salary" value={`$${totalSalary}`} />
          <InfoRow label="Average Rating" value={`${averageRating} / 5`} />

          <Section title="Attendance Record" data={attendance} />
          <Section title="Withdrawal History" data={withdrawals} isCurrency />

          <div className="bg-gray-800 shadow-md rounded-lg p-6 mb-6">
            <h3 className="text-lg sm:text-2xl font-bold text-yellow-500 mb-4">Reviews</h3>
            <div className="space-y-4 h-64 overflow-y-scroll">
              {reviews ? (
                Object.values(reviews).map((review, index) => (
                  <ReviewCard 
                    key={index} 
                    rating={review.rating} 
                    text={review.text} 
                    rollNumber={review.rollNumber} 
                    branch={review.branch} 
                  />
                ))
              ) : (
                <p className="text-gray-500">No reviews available yet.</p>
              )}
            </div>
          </div>

          <ShareableLink />
          <div className="text-center mt-4">
            <p className="text-sm text-yellow-400">Employee Node ID:</p>
            <p className="text-sm text-blue-400">{employeeNodeId}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const InfoRow = ({ label, value }) => (
  <div className="flex justify-between text-sm sm:text-base">
    <span className="font-semibold">{label}:</span>
    <span>{value}</span>
  </div>
);

const Section = ({ title, data, isCurrency = false }) => (
  <div className="mt-6">
    <h4 className="text-lg font-semibold mb-2 text-[#ccff33]">{title}</h4>
    <div className="space-y-1">
      {Object.entries(data || {}).map(([date, value]) => (
        <div key={date} className="flex justify-between text-sm sm:text-base">
          <span className="text-gray-400">{date}</span>
          <span className={`${isCurrency ? 'text-gray-300' : 'font-semibold'} text-sm sm:text-base`}>
            {isCurrency ? `$${value}` : value === 'present' ? 'Present' : 'Absent'}
          </span>
        </div>
      ))}
    </div>
  </div>
);

const ReviewCard = ({ rating, text, rollNumber, branch }) => (
  <div className="bg-gray-700 p-4 shadow-md rounded-lg">
    <h4 className="text-lg font-semibold text-blue-500">Rating: {rating}/5</h4>
    <p className="text-gray-300">Review: {text}</p>
    <p className="text-gray-300">Roll Number: {rollNumber}</p>
    <p className="text-gray-300">Branch: {branch}</p>
  </div>
);

const ShareableLink = () => (
  <div className="block mt-8 text-center">
    <h5 className="text-yellow-400">Share this URL with students</h5>
    <p className="text-sm text-blue-400 underline cursor-pointer">
      https://vslr-demo.web.app/review
    </p>
    <button
      onClick={() => navigator.clipboard.writeText("https://vslr-demo.web.app/review")}
      className="mt-2 bg-[#1a1a4d] text-white font-semibold p-2 rounded hover:bg-[#333366]">
      Copy URL
    </button>
  </div>
);

export default EmployeeProfile;
