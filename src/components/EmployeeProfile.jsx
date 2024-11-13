import React, { useState, useEffect } from 'react';
import { database, ref, onValue } from '../firebase';
import { useParams, useNavigate } from 'react-router-dom';

const EmployeeProfile = () => {
  const [employeeData, setEmployeeData] = useState(null);
  const [averageRating, setAverageRating] = useState(0); // Add state for average rating
  const { employeeId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const employeeRef = ref(database, 'employees');
    
    const unsubscribe = onValue(employeeRef, (snapshot) => {
      const employees = snapshot.val();
      const employee = Object.values(employees).find(
        (emp) => emp.employeeId === employeeId
      );

      if (employee) {
        setEmployeeData(employee);
        calculateAverageRating(employee.reviews); // Calculate average rating after fetching employee data
      } else {
        navigate('/employee-login');
      }
    });

    return () => unsubscribe();
  }, [employeeId, navigate]);

  const calculateAverageRating = (reviews) => {
    if (reviews) {
      const ratings = Object.values(reviews).map((review) => parseFloat(review.rating));
      const average = ratings.length > 0 ? ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length : 0;
      setAverageRating(average.toFixed(2)); // Set average rating in state with two decimal points
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
    return <div>Loading...</div>;
  }

  const { name, joiningDate, perDaySalary, profilePhoto, attendance, withdrawals, reviews } = employeeData;
  const totalSalary = calculateTotalSalary(attendance, perDaySalary, withdrawals);
  const daysPresent = countDaysPresent(attendance);

  return (
    <div className="w-full p-8 min-h-screen bg-gradient-to-b from-[#0d001a] via-[#000033] to-[#000000] flex flex-col items-center">
      <div className="max-w-xl w-full bg-[#0d001a] shadow-xl rounded-lg p-8 mb-10 text-white">
        <h2 className="text-3xl font-bold text-center mb-4 text-[#ccff33]">Employee Profile</h2>

        {/* Profile Details */}
        <div className="flex flex-col items-center mb-6">
          {profilePhoto === "No profile" ? (
            <span>No profile photo</span>
          ) : (
            <img src={profilePhoto} alt="Profile" className="w-24 h-24 rounded-full mb-4" />
          )}
          <h3 className="text-2xl font-semibold">{name}</h3>
          <p className="text-gray-400">Joining Date: {joiningDate}</p>
        </div>

        {/* Employee Information */}
        <div className="space-y-4">
          <InfoRow label="Per Day Salary" value={`$${perDaySalary}`} />
          <InfoRow label="No. of Days Present" value={daysPresent} />
          <InfoRow label="Total Salary" value={`$${totalSalary}`} />
          <InfoRow label="Average Rating" value={`${averageRating} / 5`} />

          {/* Attendance Record */}
          <Section title="Attendance Record" data={attendance} />

          {/* Withdrawal History */}
          <Section title="Withdrawal History" data={withdrawals} isCurrency />

          {/* Reviews Section */}
          <div className="bg-white shadow-lg rounded-lg p-8 mb-6">
            <h3 className="text-2xl font-bold text-blue-600 mb-4">Reviews</h3>
            <div className="bg-gray-100 p-4 rounded-lg space-y-4">
              {reviews ? (
                Object.values(reviews).map((review, index) => (
                  <ReviewCard key={index} rating={review.rating} text={review.text} />
                ))
              ) : (
                <p className="text-gray-500">No reviews available yet.</p>
              )}
            </div>
          </div>

          {/* Shareable URL */}
          <ShareableLink />
        </div>
      </div>
    </div>
  );
};

// Helper Components
const InfoRow = ({ label, value }) => (
  <div className="flex justify-between">
    <span className="font-semibold">{label}:</span>
    <span>{value}</span>
  </div>
);

const Section = ({ title, data, isCurrency = false }) => (
  <div className="mt-6">
    <h4 className="text-lg font-semibold mb-2 text-[#ccff33]">{title}</h4>
    <div className="space-y-1">
      {Object.entries(data || {}).map(([date, value]) => (
        <div key={date} className="flex justify-between">
          <span className="text-gray-300">{date}</span>
          <span className={`text-sm ${isCurrency ? 'text-gray-300' : 'text-sm font-semibold'}`}>
            {isCurrency ? `$${value}` : value === 'present' ? 'Present' : 'Absent'}
          </span>
        </div>
      ))}
    </div>
  </div>
);

const ReviewCard = ({ rating, text }) => (
  <div className="bg-white p-4 shadow-md rounded-lg">
    <h4 className="text-xl font-semibold text-blue-500">Rating: {rating}/5</h4>
    <p className="text-gray-700">{text}</p>
  </div>
);

const ShareableLink = () => (
  <div className="block mt-8 text-center">
    <h5 className='text-yellow-400'>Share this URL with students</h5>
    <p className="text-center bg-[#000033] text-white font-semibold p-3 rounded">
      https://vslr-demo.web.app/review
    </p>
    <button
      onClick={() => navigator.clipboard.writeText("https://vslr-demo.web.app/review")}
      className="mt-2 text-center bg-[#1a1a4d] text-white font-semibold p-2 rounded hover:bg-[#333366]">
      Copy URL
    </button>
  </div>
);

export default EmployeeProfile;
