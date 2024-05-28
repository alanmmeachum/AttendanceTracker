import React, { useState, useEffect } from "react";
import AttendanceByDate from "./AttendanceByDate";
import axios from "axios";

const AttendanceList = () => {
  const [attendanceRecords, setAttendanceRecords] = useState<any>([]);
  const [studentId, setStudentId] = useState(0);
  const [date, setDate] = useState("");

  const fetchAttendance = async () => {
    
    try {
      const response = await axios.get("/attendance", {
        params: { studentId, date },
      });
      setAttendanceRecords([...attendanceRecords, response.data]);
      console.log(response.data)
    } catch (error) {
      alert("Error fetching attendance");
    }
  };

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          fetchAttendance();
        }}
      >
        <label>
          Student ID:
          <input
            type="number"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            required
          />
        </label>
        <label>
          Date:
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </label>
        <button type="submit">Fetch Attendance</button>
      </form>
      <AttendanceByDate />
      {attendanceRecords.map((record) => (
        <ul>
          <li key={record._id}>
            {record.date}: {record.status}
          </li>
        </ul>
      ))}
    </div>
  );
};

export default AttendanceList;
