import React, { useState, useEffect } from 'react';
import { database, ref, set, push, onValue } from '../firebase';

const Employee = () => {
  const [employeesData, setEmployeesData] = useState({});
  const [employeeName, setEmployeeName] = useState('');
  const [joiningDate, setJoiningDate] = useState('');
  const [perDaySalary, setPerDaySalary] = useState('');
  const [employeeId, setEmployeeId] = useState('');
  const [employeePassword, setEmployeePassword] = useState('');
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [withdrawals, setWithdrawals] = useState({});

  useEffect(() => {
    const employeeRef = ref(database, 'employees');
    onValue(employeeRef, (snapshot) => {
      const data = snapshot.val();
      setEmployeesData(data || {});
    });
  }, []);

  const addEmployee = (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (employeeName && joiningDate && perDaySalary && employeeId && employeePassword) {
      if (Object.values(employeesData).some(emp => emp.employeeId === employeeId)) {
        setErrorMessage('Employee ID must be unique. Please choose another ID.');
        return;
      }

      const newEmployeeRef = push(ref(database, 'employees'));
      set(newEmployeeRef, {
        name: employeeName,
        joiningDate: joiningDate,
        perDaySalary: parseInt(perDaySalary),
        employeeId: employeeId,
        employeePassword: employeePassword,
        profilePhoto: profilePhoto || "No profile",
        attendance: {},
        totalSalary: 0,
        withdrawals: {}
      });

      // Clear input fields after submission
      setEmployeeName('');
      setJoiningDate('');
      setPerDaySalary('');
      setEmployeeId('');
      setEmployeePassword('');
      setProfilePhoto(null);
    }
  };

  const handleProfilePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePhoto(URL.createObjectURL(file)); // Preview the selected photo
    }
  };

  const calculateTotalSalary = (attendance, perDaySalary, withdrawals) => {
    const attendanceTotal = Object.values(attendance || {}).reduce((total, status) => {
      return total + (status === 'present' ? perDaySalary : 0);
    }, 0);
    
    const totalWithdrawn = Object.values(withdrawals || {}).reduce((total, amount) => total + amount, 0);

    return attendanceTotal - totalWithdrawn;
  };

  const markAttendance = (employeeKey, attendanceDate) => {
    if (attendanceDate) {
      const employee = employeesData[employeeKey];
      const currentStatus = employee.attendance?.[attendanceDate] === 'present' ? 'absent' : 'present';
      set(ref(database, `employees/${employeeKey}/attendance/${attendanceDate}`), currentStatus);
    }
  };

  const handleWithdraw = (employeeKey) => {
    const withdrawAmount = withdrawals[employeeKey]?.amount;
    const withdrawDate = withdrawals[employeeKey]?.date;

    if (withdrawAmount > 0 && withdrawDate) {
      const employee = employeesData[employeeKey];
      const totalSalary = calculateTotalSalary(
        employee.attendance,
        employee.perDaySalary,
        employee.withdrawals
      );

      if (withdrawAmount <= totalSalary) {
        const newWithdrawalRef = ref(database, `employees/${employeeKey}/withdrawals/${withdrawDate}`);
        set(newWithdrawalRef, parseInt(withdrawAmount));

        // Reset withdrawal inputs
        setWithdrawals(prev => ({
          ...prev,
          [employeeKey]: { date: '', amount: 0 }
        }));
      } else {
        alert("Insufficient funds for this withdrawal.");
      }
    }
  };

  const handleWithdrawInputChange = (employeeKey, type, value) => {
    setWithdrawals(prev => ({
      ...prev,
      [employeeKey]: {
        ...prev[employeeKey],
        [type]: type === 'amount' ? parseInt(value) : value,
      },
    }));
  };

  const countDaysPresent = (attendance) => {
    return Object.values(attendance || {}).filter(status => status === 'present').length;
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
          <input
            type="file"
            onChange={handleProfilePhotoChange}
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
              <th className="border-b-2 border-gray-300 px-4 py-2 text-gray-800">Profile Photo</th>
              <th className="border-b-2 border-gray-300 px-4 py-2 text-gray-800">Attendance</th>
              <th className="border-b-2 border-gray-300 px-4 py-2 text-gray-800">No. of Days Present</th>
              <th className="border-b-2 border-gray-300 px-4 py-2 text-gray-800">Withdrawals</th>
              <th className="border-b-2 border-gray-300 px-4 py-2 text-gray-800">Total Salary</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(employeesData).map((key) => {
              const employee = employeesData[key];
              const totalSalary = calculateTotalSalary(
                employee.attendance,
                employee.perDaySalary,
                employee.withdrawals
              );
              const daysPresent = countDaysPresent(employee.attendance);
              return (
                <tr key={key} className="hover:bg-gray-100 transition-colors">
                  <td className="border-b px-4 py-2 text-gray-700">{employee.name}</td>
                  <td className="border-b px-4 py-2 text-gray-700">{employee.joiningDate}</td>
                  <td className="border-b px-4 py-2 text-gray-700">{employee.perDaySalary}</td>
                  <td className="border-b px-4 py-2 text-gray-700">{employee.employeeId}</td>
                  <td className="border-b px-4 py-2 text-gray-700">
                    {employee.profilePhoto && employee.profilePhoto !== "No profile" ? (
                      <img src={employee.profilePhoto} alt="Profile" className="h-10 w-10 rounded-full" />
                    ) : (
                      <span>No profile</span>
                    )}
                  </td>
                  <td className="border-b px-4 py-2 text-gray-700">
                    <input
                      type="date"
                      onChange={(e) => markAttendance(key, e.target.value)}
                      className="border border-gray-300 rounded p-1"
                    />
                  </td>
                  <td className="border-b px-4 py-2 text-gray-700">{daysPresent}</td>
                  <td className="border-b px-4 py-2 text-gray-700">
                    <input
                      type="date"
                      value={withdrawals[key]?.date || ''}
                      onChange={(e) => handleWithdrawInputChange(key, 'date', e.target.value)}
                      className="border border-gray-300 rounded p-1"
                    />
                    <input
                      type="number"
                      value={withdrawals[key]?.amount || 0}
                      onChange={(e) => handleWithdrawInputChange(key, 'amount', e.target.value)}
                      className="border border-gray-300 rounded p-1"
                      placeholder="Withdraw Amount"
                    />
                    <button
                      onClick={() => handleWithdraw(key)}
                      className="bg-red-500 text-white font-semibold p-1 rounded hover:bg-red-600 mt-1"
                    >
                      Withdraw
                    </button>
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
