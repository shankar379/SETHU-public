import React, { useState, useEffect } from 'react';
import { database, ref, set, push, onValue } from '../firebase';
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
const storage = getStorage(); // Ensure Firebase storage is initialized


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

  const addEmployee = async (e) => {
    e.preventDefault();
    setErrorMessage('');
  
    if (employeeName && joiningDate && perDaySalary && employeeId && employeePassword) {
      if (Object.values(employeesData).some(emp => emp.employeeId === employeeId)) {
        setErrorMessage('Employee ID must be unique. Please choose another ID.');
        return;
      }
  
      try {
        let profilePhotoUrl = "No profile";
  
        // Upload profile photo to Firebase Storage
        if (profilePhoto) {
          try {
            const storagePath = `EmployeesProfiles/${employeeId}`;
            const photoRef = storageRef(storage, storagePath);
            await uploadBytes(photoRef, profilePhoto);
            profilePhotoUrl = await getDownloadURL(photoRef); // Get the download URL
          } catch (err) {
            console.error("Error uploading profile photo:", err);
            setErrorMessage("Failed to upload profile photo. Please try again.");
            return;
          }
        }
  
        const newEmployeeRef = push(ref(database, 'employees'));
        await set(newEmployeeRef, {
          name: employeeName,
          joiningDate: joiningDate,
          perDaySalary: parseInt(perDaySalary),
          employeeId: employeeId,
          employeePassword: employeePassword,
          profilePhoto: profilePhotoUrl, // Store the profile photo URL
          attendance: {},
          totalSalary: 0,
          withdrawals: {},
          averageRating: 0,
        });
  
        // Reset form fields
        setEmployeeName('');
        setJoiningDate('');
        setPerDaySalary('');
        setEmployeeId('');
        setEmployeePassword('');
        setProfilePhoto(null);
      } catch (error) {
        console.error("Error adding employee:", error);
        setErrorMessage('Failed to add employee. Please try again.');
      }
    } else {
      setErrorMessage("Please fill out all required fields.");
    }
  };
  
  const handleProfilePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setProfilePhoto(file); // Store the file for later upload in addEmployee
    } else {
      setErrorMessage("Please upload a valid image file.");
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
    <div className="w-full p-8 min-h-screen bg-gradient-to-b from-[#0d001a] via-[#000033] to-[#000000] flex flex-col items-center">
      <div className="max-w-xl w-full bg-[#0d001a] shadow-xl rounded-lg p-6 mb-10">
  <h2 className="text-3xl font-bold mb-6 text-[#ccff33] text-center">Add New Employee</h2>
  <form onSubmit={addEmployee} className="space-y-5">
    {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}
    <input
      type="text"
      value={employeeName}
      onChange={(e) => setEmployeeName(e.target.value)}
      placeholder="Employee Name"
      required
      className="w-full p-3 border border-[#333366] rounded bg-[#1a002b] text-white placeholder-gray-400"
    />
    <input
      type="date"
      value={joiningDate}
      onChange={(e) => setJoiningDate(e.target.value)}
      required
      className="w-full p-3 border border-[#333366] rounded bg-[#1a002b] text-white placeholder-gray-400"
    />
    <input
      type="number"
      value={perDaySalary}
      onChange={(e) => setPerDaySalary(e.target.value)}
      placeholder="Per Day Salary"
      min="0"
      required
      className="w-full p-3 border border-[#333366] rounded bg-[#1a002b] text-white placeholder-gray-400"
    />
    <input
      type="text"
      value={employeeId}
      onChange={(e) => setEmployeeId(e.target.value)}
      placeholder="Employee ID"
      required
      className="w-full p-3 border border-[#333366] rounded bg-[#1a002b] text-white placeholder-gray-400"
    />
    <input
      type="password"
      value={employeePassword}
      onChange={(e) => setEmployeePassword(e.target.value)}
      placeholder="Employee Password"
      required
      className="w-full p-3 border border-[#333366] rounded bg-[#1a002b] text-white placeholder-gray-400"
    />
    <input
      type="file"
      onChange={handleProfilePhotoChange}
      className="w-full p-3 border border-[#333366] rounded bg-[#1a002b] text-white"
    />
    <button
      type="submit"
      className="w-full bg-[#000033] text-white font-semibold p-3 rounded hover:bg-[#1a1a4d]"
    >
      Add Employee
    </button>
  </form>
</div>


<div className="w-full bg-[#0c063d] shadow-xl rounded-lg p-8">
  <h2 className="text-3xl font-bold mb-6 text-[#ccff33] text-center">Employee List</h2>
  <table className="table-auto w-full text-left border-separate border-spacing-2">
    <thead>
      <tr>
        <th className="border-b-2 border-[#333366] px-4 py-2 text-[#ccff33]">Profile</th>
        <th className="border-b-2 border-[#333366] px-4 py-2 text-[#ccff33]">Name</th>
        <th className="border-b-2 border-[#333366] px-4 py-2 text-[#ccff33]">Joining Date</th>
        <th className="border-b-2 border-[#333366] px-4 py-2 text-[#ccff33]">Per Day Salary</th>
        <th className="border-b-2 border-[#333366] px-4 py-2 text-[#ccff33]">Employee ID</th>
        <th className="border-b-2 border-[#333366] px-4 py-2 text-[#ccff33]">Attendance</th>
        <th className="border-b-2 border-[#333366] px-4 py-2 text-[#ccff33]">No. of Days Present</th>
        <th className="border-b-2 border-[#333366] px-4 py-2 text-[#ccff33]">Withdrawals</th>
        <th className="border-b-2 border-[#333366] px-4 py-2 text-[#ccff33]">Total Salary</th>
        <th className="border-b-2 border-[#333366] px-4 py-2 text-[#ccff33]">Employee Average Rating</th>
      </tr>
    </thead>
    <tbody>
  {Object.keys(employeesData).map((key) => {
    const employee = employeesData[key];
    const totalSalary = calculateTotalSalary(
      employee.attendance,
      employee.perDaySalary,
      employee.withdrawals,
      employee.averageRating
    );
    const daysPresent = countDaysPresent(employee.attendance);

    return (
      <tr key={key} className="hover:bg-[#1a002b] transition-colors">
        <td className="border-b border-[#333366] px-4 py-2 text-white">
  {employee.profilePhoto === "No profile" ? (
    <span>No profile</span>
  ) : (
    <img
      src={employee.profilePhoto}
      alt="Profile"
      className="w-12 h-12 rounded-full object-cover"
    />
  )}
</td>


        <td className="border-b border-[#333366] px-4 py-2 text-white">{employee.name}</td>
        <td className="border-b border-[#333366] px-4 py-2 text-white">{employee.joiningDate}</td>
        <td className="border-b border-[#333366] px-4 py-2 text-white">{employee.perDaySalary}</td>
        <td className="border-b border-[#333366] px-4 py-2 text-white">{employee.employeeId}</td>
        <td className="border-b border-[#333366] px-4 py-2 text-white">
          <input
            type="date"
            onChange={(e) => markAttendance(key, e.target.value)}
            className="w-full p-2 border border-[#4c005c] rounded bg-[#1a002b] text-white"
          />
          <button
            onClick={() => markAttendance(key, new Date().toISOString().split("T")[0])}
            className="w-full mt-2 bg-[#000033] text-white font-semibold p-2 rounded hover:bg-[#333366]"
          >
            Toggle Present/Absent
          </button>
          <div className="mt-4 space-y-1">
            <div className="overflow-y-auto h-32 w-64 border border-gray-300 p-2"> {/* Adjust h-64 and w-64 for desired height and width */}
              {Object.entries(employee.attendance || {}).map(([date, status]) => (
                <div key={date} className="flex justify-between items-center">
                  <span className="text-gray-300">{date}</span>
                  <span className={`text-sm font-semibold ${status === 'present' ? 'text-green-500' : 'text-red-500'}`}>
                    {status === 'present' ? 'Present' : 'Absent'}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </td>
        <td className="border-b border-[#333366] px-4 py-2 text-white">{daysPresent}</td>
        <td className="border-b border-[#333366] px-4 py-2 text-white">
          <div className="flex flex-col">
            <div className="flex items-center space-x-2 mb-2">
              <input
                type="number"
                placeholder="Amount"
                value={withdrawals[key]?.amount || ''}
                onChange={(e) => handleWithdrawInputChange(key, 'amount', e.target.value)}
                className="p-1 border border-[#4c005c] rounded w-24 bg-[#1a002b] text-white"
              />
              <input
                type="date"
                value={withdrawals[key]?.date || ''}
                onChange={(e) => handleWithdrawInputChange(key, 'date', e.target.value)}
                className="p-1 border border-[#4c005c] rounded w-32 bg-[#1a002b] text-white"
              />
              <button
                onClick={() => handleWithdraw(key)}
                className="bg-[#000033] text-white font-semibold p-2 rounded hover:bg-[#333366]"
              >
                Withdraw
              </button>
            </div>
            <div className="mt-4 space-y-1">
              <div className="overflow-y-auto h-32 w-64 border border-gray-300 p-2"> {/* Adjust h-64 and w-64 for desired height and width */}
                {Object.entries(employee.withdrawals || {}).map(([date, amount]) => (
                  <div key={date} className="text-sm text-gray-300">
                    {`${date}: $${amount}`}
                  </div>
                ))}
              </div>
            </div>

          </div>
        </td>
        <td className="border-b border-[#333366] px-4 py-2 text-white">{totalSalary}</td>
        <td className="p-4">{employee.averageRating ? `${employee.averageRating} / 5` : 'Not Available'}</td> {/* Display average rating */}
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