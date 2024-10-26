import React, { useState, useEffect } from 'react';
import { database, ref, onValue } from '../firebase';
import { useParams, useNavigate, Link } from 'react-router-dom';

const EmployeeProfile = () => {
  const [employeeData, setEmployeeData] = useState(null);
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
      } else {
        navigate('/login');
      }
    });

    return () => unsubscribe();
  }, [employeeId, navigate]);

  const calculateTotalSalary = (attendance, perDaySalary) => {
    return Object.values(attendance || {}).reduce((total, status) => {
      return total + (status === 'present' ? perDaySalary : 0);
    }, 0);
  };

  if (!employeeData) {
    return <p>Loading...</p>;
  }

  return (
    <div className="p-6 bg-gradient-to-r from-blue-500 to-blue-700 min-h-screen">
      <div className="max-w-xl mx-auto">
        {/* Employee Information Card */}
        <div className="bg-white shadow-lg rounded-lg p-8 mb-6">
          <h2 className="text-3xl font-bold mb-4 text-blue-600">Employee Profile</h2>
          <div className="space-y-4">
            <div className="bg-gray-100 p-4 rounded-lg">
              <h3 className="text-xl font-semibold text-black mb-2">Employee Details</h3>
              <div className="space-y-2">
                <div>
                  <span className="font-semibold text-black">Name:</span>{' '}
                  <span className="text-blue-500">{employeeData.name}</span>
                </div>
                <div>
                  <span className="font-semibold text-black">Employee ID:</span>{' '}
                  <span className="text-blue-500">{employeeData.employeeId}</span>
                </div>
                <div>
                  <span className="font-semibold text-black">Joining Date:</span>{' '}
                  <span className="text-blue-500">{employeeData.joiningDate}</span>
                </div>
                <div>
                  <span className="font-semibold text-black">Per Day Salary:</span>{' '}
                  <span className="text-green-600">${employeeData.perDaySalary}</span>
                </div>
                <div>
                  <span className="font-semibold text-black">Total Salary:</span>{' '}
                  <span className="text-green-600">
                    ${calculateTotalSalary(employeeData.attendance, employeeData.perDaySalary)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Attendance Card */}
        <div className="bg-white shadow-lg rounded-lg p-8 mb-6">
          <h3 className="text-2xl font-bold text-blue-600 mb-4">Attendance</h3>
          <div className="bg-gray-100 p-4 rounded-lg">
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              {Object.keys(employeeData.attendance || {}).map((date) => (
                <li key={date}>
                  <span className="font-semibold text-black">{date}:</span>{' '}
                  <span
                    className={
                      employeeData.attendance[date] === 'present'
                        ? 'text-green-500'
                        : 'text-red-500'
                    }
                  >
                    {employeeData.attendance[date]}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Reviews Card */}
        <div className="bg-white shadow-lg rounded-lg p-8 mb-6">
          <h3 className="text-2xl font-bold text-blue-600 mb-4">Reviews</h3>
          <div className="bg-gray-100 p-4 rounded-lg space-y-4">
            {employeeData.reviews ? (
              Object.keys(employeeData.reviews).map((key) => {
                const review = employeeData.reviews[key];
                return (
                  <div key={key} className="bg-white p-4 shadow-md rounded-lg">
                    <h4 className="text-xl font-semibold text-blue-500">Rating: {review.rating}/5</h4>
                    <p className="text-gray-700">{review.text}</p>
                  </div>
                );
              })
            ) : (
              <p className="text-gray-500">No reviews available yet.</p>
            )}
          </div>
        </div>

        {/* Button to Write Review */}
        <div className="flex justify-center mt-6">
          <Link
            to={`/review`}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-full"
          >
            Write a Review
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EmployeeProfile;
