import React, { useState, useEffect } from 'react';
import { database, ref, set, push, onValue } from '../firebase'; // Import Firebase functionalities

const Employee = () => {
  const [employeesData, setEmployeesData] = useState({});
  const [employeeName, setEmployeeName] = useState('');
  const [joiningDate, setJoiningDate] = useState('');
  const [perDaySalary, setPerDaySalary] = useState('');
  const [employeeId, setEmployeeId] = useState('');
  const [employeePassword, setEmployeePassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Load employees from Realtime Database when the component mounts
  useEffect(() => {
    loadEmployees();
  }, []);

  // Function to load employees
  const loadEmployees = () => {
    const employeeRef = ref(database, 'employees');
    onValue(employeeRef, (snapshot) => {
      const data = snapshot.val();
      setEmployeesData(data || {}); // Update state with employee data or empty object if none exists
    });
  };

  // Add new employee
  const addEmployee = (e) => {
    e.preventDefault();
    setErrorMessage(''); // Reset error message

    if (employeeName && joiningDate && perDaySalary && employeeId && employeePassword) {
      // Check if employeeId already exists
      if (Object.values(employeesData).some(emp => emp.employeeId === employeeId)) {
        setErrorMessage('Employee ID must be unique. Please choose another ID.');
        return; // Exit the function if Employee ID is not unique
      }

      const newEmployeeRef = push(ref(database, 'employees'));
      set(newEmployeeRef, {
        name: employeeName,
        joiningDate: joiningDate,
        perDaySalary: parseInt(perDaySalary),
        employeeId: employeeId,
        employeePassword: employeePassword,
        attendance: {}, // Initialize empty attendance record
        totalSalary: 0   // Initialize total salary
      });

      // Reset form
      setEmployeeName('');
      setJoiningDate('');
      setPerDaySalary('');
      setEmployeeId('');
      setEmployeePassword('');
    }
  };

  // Calculate total salary based on attendance
  const calculateTotalSalary = (attendance, perDaySalary) => {
    return Object.values(attendance || {}).reduce((total, status) => {
      return total + (status === 'present' ? perDaySalary : 0);
    }, 0);
  };

  // Mark attendance
  const markAttendance = (employeeKey, attendanceDate) => {
    if (attendanceDate) {
      const employee = employeesData[employeeKey];
      const currentStatus = employee.attendance?.[attendanceDate] === 'present' ? 'absent' : 'present'; // Toggle attendance
      set(ref(database, `employees/${employeeKey}/attendance/${attendanceDate}`), currentStatus); // Update attendance in Firebase
    }
  };

  return (
    <div className="p-8 min-h-screen bg-gradient-to-b from-[#004b23] via-[#008000] to-[#ccff33] flex flex-col items-center">
      <div className="max-w-xl w-full bg-white shadow-lg rounded-lg p-6 mb-10">
        <h2 className="text-3xl font-bold mb-6 text-gray-900 text-center">Add New Employee</h2>
        <form onSubmit={addEmployee} className="space-y-5">
          {errorMessage && <p className="text-red-600 text-center">{errorMessage}</p>}
          <input
            type="text"
            value={employeeName}
            onChange={(e) => setEmployeeName(e.target.value)}
            placeholder="Employee Name"
            required
            className="w-full p-3 border border-gray-300 rounded text-gray-900"
          />
          <input
            type="date"
            value={joiningDate}
            onChange={(e) => setJoiningDate(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded text-gray-900"
          />
          <input
            type="number"
            value={perDaySalary}
            onChange={(e) => setPerDaySalary(e.target.value)}
            placeholder="Per Day Salary"
            min="0"
            required
            className="w-full p-3 border border-gray-300 rounded text-gray-900"
          />
          <input
            type="text"
            value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value)}
            placeholder="Employee ID"
            required
            className="w-full p-3 border border-gray-300 rounded text-gray-900"
          />
          <input
            type="password"
            value={employeePassword}
            onChange={(e) => setEmployeePassword(e.target.value)}
            placeholder="Employee Password"
            required
            className="w-full p-3 border border-gray-300 rounded text-gray-900"
          />
          <button
            type="submit"
            className="w-full bg-[#38b000] text-white font-semibold p-3 rounded hover:bg-[#70e000]"
          >
            Add Employee
          </button>
        </form>
      </div>

      <div className="max-w-5xl w-full bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-3xl font-bold mb-6 text-gray-900 text-center">Employee List</h2>
        <table className="table-auto w-full text-left border-separate border-spacing-2">
          <thead>
            <tr>
              <th className="border-b-2 border-gray-300 px-4 py-2 text-gray-800">Name</th>
              <th className="border-b-2 border-gray-300 px-4 py-2 text-gray-800">Joining Date</th>
              <th className="border-b-2 border-gray-300 px-4 py-2 text-gray-800">Per Day Salary</th>
              <th className="border-b-2 border-gray-300 px-4 py-2 text-gray-800">Employee ID</th>
              <th className="border-b-2 border-gray-300 px-4 py-2 text-gray-800">Attendance</th>
              <th className="border-b-2 border-gray-300 px-4 py-2 text-gray-800">Total Salary</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(employeesData).map((key) => {
              const employee = employeesData[key];
              const totalSalary = calculateTotalSalary(
                employee.attendance,
                employee.perDaySalary
              );
              return (
                <tr key={key} className="hover:bg-gray-100 transition-colors">
                  <td className="border-b px-4 py-2 text-gray-700">{employee.name}</td>
                  <td className="border-b px-4 py-2 text-gray-700">{employee.joiningDate}</td>
                  <td className="border-b px-4 py-2 text-gray-700">{employee.perDaySalary}</td>
                  <td className="border-b px-4 py-2 text-gray-700">{employee.employeeId}</td>
                  <td className="border-b px-4 py-2 text-gray-700">
                    <div className="space-y-2">
                      {Object.keys(employee.attendance || {}).map((date) => (
                        <div key={date} className="flex items-center space-x-2">
                          <div
                            className={`inline-block w-4 h-4 rounded-full ${
                              employee.attendance[date] === 'present' ? 'bg-green-500' : 'bg-red-500'
                            }`}
                          ></div>
                          <label className="text-sm text-gray-500">
                            {date}: {employee.attendance[date]}
                          </label>
                        </div>
                      ))}
                      <div className="mt-2 flex items-center space-x-2">
                        <input
                          type="date"
                          id={`date_${key}`}
                          className="p-2 border border-gray-300 rounded text-gray-700"
                        />
                        <button
                          className="ml-2 bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
                          onClick={() =>
                            markAttendance(key, document.getElementById(`date_${key}`).value)
                          }
                        >
                          Mark
                        </button>
                      </div>
                    </div>
                  </td>
                  <td className="border-b px-4 py-2 text-gray-700">{totalSalary}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Employee;