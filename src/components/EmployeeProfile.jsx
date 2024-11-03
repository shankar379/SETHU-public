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

  const { name, joiningDate, perDaySalary, profilePhoto, attendance, withdrawals } = employeeData;
  const totalSalary = calculateTotalSalary(attendance, perDaySalary, withdrawals);
  const daysPresent = countDaysPresent(attendance);

  return (
    <div className="w-full p-8 min-h-screen bg-gradient-to-b from-[#0d001a] via-[#000033] to-[#000000] flex flex-col items-center">
      <div className="max-w-xl w-full bg-[#0d001a] shadow-xl rounded-lg p-8 mb-10 text-white">
        <h2 className="text-3xl font-bold text-center mb-4 text-[#ccff33]">Employee Profile</h2>
        
        <div className="flex flex-col items-center mb-6">
          {profilePhoto === "No profile" ? (
            <span>No profile photo</span>
          ) : (
            <img src={profilePhoto} alt="Profile" className="w-24 h-24 rounded-full mb-4" />
          )}
          <h3 className="text-2xl font-semibold">{name}</h3>
          <p className="text-gray-400">Joining Date: {joiningDate}</p>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between">
            <span className="font-semibold">Per Day Salary:</span>
            <span>${perDaySalary}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">No. of Days Present:</span>
            <span>{daysPresent}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Total Salary:</span>
            <span>${totalSalary}</span>
          </div>

          <div className="mt-6">
            <h4 className="text-lg font-semibold mb-2 text-[#ccff33]">Attendance Record</h4>
            <div className="space-y-1">
              {Object.entries(attendance || {}).map(([date, status]) => (
                <div key={date} className="flex justify-between items-center">
                  <span className="text-gray-300">{date}</span>
                  <span className={`text-sm font-semibold ${status === 'present' ? 'text-green-500' : 'text-red-500'}`}>
                    {status === 'present' ? 'Present' : 'Absent'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <h4 className="text-lg font-semibold mb-2 text-[#ccff33]">Withdrawal History</h4>
            <div className="space-y-1">
              {Object.entries(withdrawals || {}).map(([date, amount]) => (
                <div key={date} className="flex justify-between">
                  <span className="text-gray-300">{date}</span>
                  <span className="text-sm text-gray-300">${amount}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="block mt-8 text-center">
          <h5 className='text-yellow-400'>Share this url to students</h5>
  <p className="text-center bg-[#000033] text-white font-semibold p-3 rounded">
    https://vslr-demo.web.app/review
  </p>
  <button
    onClick={() => {
      navigator.clipboard.writeText("https://vslr-demo.web.app/review");
      
    }}
    className="mt-2 text-center bg-[#1a1a4d] text-white font-semibold p-2 rounded hover:bg-[#333366]"
  >
    Copy URL
  </button>
</div>

      </div>
    </div>
  );
};

export default EmployeeProfile;
