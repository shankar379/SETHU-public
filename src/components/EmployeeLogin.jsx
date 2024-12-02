import React, { useState } from 'react';
import { database, ref, get } from '../firebase';
import { useNavigate } from 'react-router-dom';

const EmployeeLogin = ({ setLoggedInUser }) => {
  const [employeeId, setEmployeeId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const employeeRef = ref(database, 'employees');
      const snapshot = await get(employeeRef);
      const employees = snapshot.val();

      if (employees) {
        const employee = Object.values(employees).find(
          (emp) => emp.employeeId === employeeId && emp.employeePassword === password
        );

        if (employee) {
          setLoggedInUser(employee);
          navigate(`/employee-profile/${employeeId}`);
        } else {
          setError('Invalid Employee ID or Password');
        }
      } else {
        setError('No employee data found.');
      }
    } catch (error) {
      setError('Login failed.');
    }
  };

  return (
    <div
      className="min-h-screen w-full flex justify-center items-center"
      style={{
        backgroundImage: 'url(/images/bg2.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        color: '#FFFFFF',
        backgroundAttachment: 'fixed'
      }}
    >
      <div
        className="p-6 sm:p-8 lg:p-10 rounded-lg shadow-2xl"
        style={{
          maxWidth: '360px', // Increased by 25px from 500px
          width: '100%',
          backgroundColor: 'rgba(240, 240, 240, 0.35)',
          borderRadius: '20px',
          border: '1px solid #333',
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
        }}
      >
        <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">Employee Login</h2>
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
        <form onSubmit={handleLogin} className="space-y-6">
          <input
            type="text"
            value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value)}
            placeholder="Employee ID"
            required
            className="w-full p-3 bg-gray-100 text-gray-800 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#345781]"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            className="w-full p-3 bg-gray-100 text-gray-800 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#345781]"
          />
          <button
            type="submit"
            className="w-full py-3 bg-[#6C3BA3] text-white font-semibold rounded-md hover:bg-[#2E2E48] transition duration-200"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default EmployeeLogin;
