import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AttendanceByDate = () => {
  const [date, setDate] = useState('');
  const [attendanceRecords, setAttendanceRecords] = useState([]);

  const fetchAttendanceByDate = async () => {
    try {
      const response = await axios.get('/api/attendance/by-date', {
        params: { date }
      });
      setAttendanceRecords(response.data);
    } catch (error) {
      alert('Error fetching attendance');
    }
  };

  return (
    <div>
      <form onSubmit={(e) => { e.preventDefault(); fetchAttendanceByDate(); }}>
        <label>
          Date:
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
        </label>
        <button type="submit">Fetch Attendance</button>
      </form>
      <ul>
        {attendanceRecords.map(record => (
          <li key={record._id}>
            {record.student.name} - {record.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AttendanceByDate;