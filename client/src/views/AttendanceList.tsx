import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AttendanceList = () => {
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [studentId, setStudentId] = useState('');
  const [date, setDate] = useState('');

  const fetchAttendance = async () => {
    try {
      const response = await axios.get('/api/attendance', {
        params: { studentId, date }
      });
      setAttendanceRecords(response.data);
    } catch (error) {
      alert('Error fetching attendance');
    }
  };

  return (
    <div>
      <form onSubmit={(e) => { e.preventDefault(); fetchAttendance(); }}>
        <label>
          Student ID:
          <input type="text" value={studentId} onChange={(e) => setStudentId(e.target.value)} required />
        </label>
        <label>
          Date:
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
        </label>
        <button type="submit">Fetch Attendance</button>
      </form>
      <ul>
        {attendanceRecords.map(record => (
          <li key={record._id}>
            {record.date}: {record.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AttendanceList;
