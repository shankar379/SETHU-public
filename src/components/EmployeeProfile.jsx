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
    return Object.values(attendance || {}).filter((status) => status === 'present').length;
  };

  if (!employeeData) {
    return <div className="flex items-center justify-center h-screen text-white">Loading...</div>;
  }

  const { name, joiningDate, perDaySalary, profilePhoto, attendance, withdrawals, reviews } = employeeData;
  const totalSalary = calculateTotalSalary(attendance, perDaySalary, withdrawals);
  const daysPresent = countDaysPresent(attendance);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0d001a] via-[#000033] to-[#000000] p-10">
      <div style={{ height: '500px', width: '100%' }}></div>
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="bg-[#1a1a4d] shadow-lg rounded-lg p-8 text-white space-y-6 border border-red-500">
          <div className="flex flex-col items-center p-8 mt-4">
            <div className="w-64 h-64 bg-gradient-to-r from-[#4c0080] to-[#000033] rounded-full overflow-hidden mb-4">
              {profilePhoto === 'No profile' ? (
                <span className="flex items-center justify-center h-full text-gray-400">No Profile Photo</span>
              ) : (
                <img src={profilePhoto} alt="Profile" className="w-full h-full object-cover object-top" />
              )}
            </div>
            <h2 className="text-2xl font-semibold">{name}</h2>
            <p className="text-gray-400">Joining Date: {joiningDate}</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <InfoCard label="Per Day Salary" value={`$${perDaySalary}`} />
            <InfoCard label="Days Present" value={daysPresent} />
            <InfoCard label="Total Salary" value={`$${totalSalary}`} />
            <InfoCard label="Average Rating" value={`${averageRating} / 5`} />
          </div>
        </div>
        <div className="my-4">
          <SectionCard title="Attendance Record" data={attendance} />
        </div>
        <div className="my-4">
          <SectionCard title="Withdrawal History" data={withdrawals} isCurrency />
        </div>
        <div className="my-4">
          <ReviewsSection reviews={reviews} />
        </div>
        <div className="my-4">
          <ShareableLink nodeId={employeeNodeId} />
        </div>
      </div>
    </div>
  );
};

const InfoCard = ({ label, value }) => (
  <div className="bg-[#2a2a5c] p-4 rounded-lg shadow-md text-white">
    <h4 className="text-gray-400">{label}</h4>
    <p className="text-lg font-semibold">{value}</p>
  </div>
);

const SectionCard = ({ title, data, isCurrency = false }) => (
  <div className="bg-[#1a1a4d] shadow-lg rounded-lg p-6 text-white">
    <h3 className="text-xl font-semibold text-[#ccff33] mb-4">{title}</h3>
    <div className="space-y-2">
      {Object.entries(data || {}).map(([date, value]) => (
        <div key={date} className="flex justify-between">
          <span className="text-gray-400">{date}</span>
          <span className={isCurrency ? 'text-green-400' : 'font-medium'}>
            {isCurrency ? `$${value}` : value === 'present' ? 'Present' : 'Absent'}
          </span>
        </div>
      ))}
    </div>
  </div>
);

const ReviewsSection = ({ reviews }) => (
  <div className="bg-[#1a1a4d] shadow-lg rounded-lg p-6 text-white">
    <h3 className="text-xl font-semibold text-[#ccff33] mb-4">Reviews</h3>
    <div className="space-y-4 h-64 overflow-y-auto">
      {reviews ? (
        Object.values(reviews).map((review, index) => (
          <ReviewCard key={index} {...review} />
        ))
      ) : (
        <p className="text-gray-400">No reviews available yet.</p>
      )}
    </div>
  </div>
);

const ReviewCard = ({ rating, text, rollNumber, branch }) => (
  <div className="bg-[#2a2a5c] p-4 rounded-lg shadow-md">
    <h4 className="text-blue-400">Rating: {rating} / 5</h4>
    <p className="text-gray-300">Review: {text}</p>
    <p className="text-gray-300">Roll No: {rollNumber}</p>
    <p className="text-gray-300">Branch: {branch}</p>
  </div>
);

const ShareableLink = ({ nodeId }) => (
  <div className="bg-[#1a1a4d] p-6 rounded-lg shadow-md text-center">
    <h5 className="text-yellow-400">Shareable URL</h5>
    <p className="text-blue-400 underline cursor-pointer">https://vslr-demo.web.app/review</p>
    <button
      onClick={() => navigator.clipboard.writeText('https://vslr-demo.web.app/review')}
      className="mt-2 bg-[#2a2a5c] text-white px-4 py-2 rounded hover:bg-[#333366]">
      Copy URL
    </button>
    <p className="mt-4 text-gray-400">Employee Node ID: {nodeId}</p>
  </div>
);

export default EmployeeProfile;
