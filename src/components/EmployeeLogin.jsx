import React, { useState } from 'react';
import { database, ref, get } from '../firebase'; // Import Firebase functionalities
import { useNavigate } from 'react-router-dom'; // Import navigation

const EmployeeLogin = ({ setLoggedInUser }) => {
  const [employeeId, setEmployeeId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Hook for navigation

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Check if employee exists
      const employeeRef = ref(database, 'employees');
      const snapshot = await get(employeeRef);
      const employees = snapshot.val();

      if (employees) {
        const employee = Object.values(employees).find(
          (emp) => emp.employeeId === employeeId && emp.employeePassword === password
        );

        if (employee) {
          setLoggedInUser(employee);
          navigate(`/employee-profile/${employeeId}`); // Redirect to profile page
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
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-md mx-auto bg-white shadow-md rounded p-6">
        <h2 className="text-2xl font-bold mb-4 text-black">Employee Login</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="text"
            value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value)}
            placeholder="Employee ID"
            required
            className="w-full p-2 border border-gray-300 rounded text-black"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            className="w-full p-2 border border-gray-300 rounded text-black"
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default EmployeeLogin;
