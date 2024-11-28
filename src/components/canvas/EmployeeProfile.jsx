import React, { useState, useEffect } from 'react';
import { database, get, ref, onValue } from '../firebase';
import { useParams, useNavigate } from 'react-router-dom';

const EmployeeProfile = () => {
  const [employeeData, setEmployeeData] = useState(null);
  const [totalSalary, setTotalSalary] = useState(0);
  const [averageRating, setAverageRating] = useState(0);
  const [daysPresent, setDaysPresent] = useState(0);
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
        fetchTotalSalary(nodeId); // Fetch total salary from the database
        calculateDaysPresent(employee.attendance); // Calculate Days Present
        calculateAverageRating(employee.reviews); // Calculate Average Rating
      } else {
        navigate('/employee-login');
      }
    });

    return () => unsubscribe();
  }, [employeeId, navigate]);

  const fetchTotalSalary = (nodeId) => {
    const totalSalaryRef = ref(database, `employees/${nodeId}/totalSalary`);
    get(totalSalaryRef).then((snapshot) => {
      const salary = snapshot.val();
      if (salary !== null) {
        setTotalSalary(salary);
      }
    });
  };

  const calculateDaysPresent = (attendance) => {
    const presentDays = Object.values(attendance || {}).filter((status) => status === 'present').length;
    setDaysPresent(presentDays);
  };

  const calculateAverageRating = (reviews) => {
    if (reviews) {
      const ratings = Object.values(reviews).map((review) => parseFloat(review.rating));
      const average = ratings.length > 0 ? ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length : 0;
      const roundedAverage = parseFloat(average.toFixed(2));
      setAverageRating(roundedAverage);
    }
  };

  if (!employeeData) {
    return <div className="flex items-center justify-center h-screen text-white">Loading...</div>;
  }

  const { name, joiningDate, perDaySalary, profilePhoto } = employeeData;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0d001a] via-[#000033] to-[#000000] px-10 py-14">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="bg-[#1a1a4d] shadow-lg rounded-lg p-8 text-white border border-red-500">
          <div className="flex flex-col md:flex-row items-center md:space-x-8 p-8">
            <div className="w-64 h-64 bg-gradient-to-r from-[#4c0080] to-[#000033] rounded-full overflow-hidden mb-4 md:mb-0">
              {profilePhoto === 'No profile' ? (
                <span className="flex items-center justify-center h-full text-gray-400">No Profile Photo</span>
              ) : (
                <img src={profilePhoto} alt="Profile" className="w-full h-full object-cover object-top" />
              )}
            </div>
            <div>
              <h2 className="text-3xl font-semibold">{name}</h2>
              <p className="text-gray-400 mt-2">Joining Date: {joiningDate}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
            <InfoCard label="Per Day Salary" value={`₹ ${perDaySalary}/-`} />
            <InfoCard label="Days Present" value={daysPresent} />
            <InfoCard label="Total Salary" value={`₹ ${totalSalary}/-`} />
            <InfoCard label="Average Rating" value={`${averageRating} / 5`} />
          </div>
        </div>
        <div>
          <ShareableLink nodeId={employeeNodeId} />
        </div>
        <div>
          <SectionCard title="Attendance Record" data={employeeData.attendance} />
        </div>
        <div>
          <SectionCard title="Withdrawal History" data={employeeData.withdrawals} isCurrency />
        </div>
        <div>
          <ReviewsSection reviews={employeeData.reviews} />
        </div>
      </div>
    </div>
  );
};

// InfoCard component to display individual info
const InfoCard = ({ label, value }) => (
  <div className="bg-[#2a2a5c] p-6 rounded-lg shadow-md text-white text-center">
    <h4 className="text-gray-400">{label}</h4>
    <p className="text-lg font-semibold mt-2">{value}</p>
  </div>
);

// Updated Attendance, Withdrawal History, Reviews Section, and Shareable Link UI

const SectionCard = ({ title, data, isCurrency = false }) => (
  <div className="bg-[#1a1a4d] shadow-lg rounded-lg p-6 text-white transition-all duration-300 hover:shadow-xl hover:scale-105">
    <h3 className="text-2xl font-bold text-gradient mb-6">{title}</h3>
    <div className="space-y-4 max-h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900">
      {data ? (
        Object.entries(data).map(([date, entries]) =>
          typeof entries === 'object' ? (
            Object.entries(entries).map(([id, value]) => (
              <div key={id} className="flex justify-between">
                <span className="text-gray-300">{`${date} - ${new Date(
                  parseInt(id)
                ).toLocaleTimeString()}`}</span>
                <span
                  className={`font-medium ${
                    isCurrency
                      ? 'text-green-400'
                      : value === 'present'
                      ? 'text-green-500'
                      : 'text-red-500'
                  }`}
                >
                  {isCurrency ? `₹ ${value}` : value === 'present' ? 'Present' : 'Absent'}
                </span>
              </div>
            ))
          ) : (
            <div key={date} className="flex justify-between">
              <span className="text-gray-300">{date}</span>
              <span
                className={`font-medium ${
                  isCurrency
                    ? 'text-green-400'
                    : entries === 'present'
                    ? 'text-green-500'
                    : 'text-red-500'
                }`}
              >
                {isCurrency ? `₹ ${entries}` : entries === 'present' ? 'Present' : 'Absent'}
              </span>
            </div>
          )
        )
      ) : (
        <p className="text-gray-400">No data available.</p>
      )}
    </div>
  </div>
);

const ReviewsSection = ({ reviews }) => (
  <div className="bg-[#1a1a4d] shadow-lg rounded-lg p-6 text-white transition-all duration-300 hover:shadow-xl hover:scale-105">
    <h3 className="text-2xl font-bold text-gradient mb-6">Reviews</h3>
    <div className="space-y-6 max-h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900">
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
  <div className="bg-[#2a2a5c] p-4 rounded-lg shadow-md hover:bg-[#333399] transition-all duration-300">
    <h4 className="text-lg font-semibold text-blue-400">⭐ Rating: {rating} / 5</h4>
    <p className="text-gray-300 mt-2">Review: {text}</p>
    <p className="text-gray-300 mt-1">Roll No: {rollNumber}</p>
    <p className="text-gray-300 mt-1">Branch: {branch}</p>
  </div>
);

const ShareableLink = ({ nodeId }) => (
  <div className="bg-gradient-to-r from-[#2b1055] to-[#7597de] p-6 rounded-lg shadow-lg text-center text-white transition-all duration-300 hover:shadow-xl hover:scale-105">
    <h5 className="text-xl font-semibold mb-2">Shareable URL</h5>
    <p
      className="text-blue-200 underline cursor-pointer"
      onClick={() => navigator.clipboard.writeText(`https://example.com/review/${nodeId}`)}
    >
      https://example.com/review/{nodeId}
      {/* https://yourwebsite.com/employee/{nodeId} */}
    </p>
    <p className="text-sm text-gray-400 mt-1">Click to copy the link</p>
  </div>
);


export default EmployeeProfile;
