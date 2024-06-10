import React, { useState } from "react";
import { AxiosInstance } from "axios";
import AttendanceByDate from "./AttendanceByDate";

interface Props {
  http: AxiosInstance;
}

interface Student {
  _id: string;
  name: string;
  grade: string;
  studentId: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface AttendanceRecord {
  _id: string;
  student: Student;
  date: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

const AttendanceList: React.FC<Props> = ({ http }) => {
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>([]);
  const [studentId, setStudentId] = useState("");
  const [date, setDate] = useState<Date | String>();

  const fetchAttendance = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await http.get("/attendance", {
        params: { studentId, date },
      });
      console.log("Response Data: ", response.data);
      if (Array.isArray(response.data)) {
        setAttendanceRecords(response.data);
      } else {
        setAttendanceRecords([response.data]);
      }
    } catch (err) {
      console.error(err);
      alert("Error fetching attendance");
    }
  };

  return (
    <div>
      <form onSubmit={fetchAttendance}>
        <label>
          Student ID:
          <input type="text" value={studentId} onChange={(e) => setStudentId(e.target.value)} required />
        </label>
        <label>
          Date:
          <input type="date" onChange={(e) => setDate(e.target.value)} required />
        </label>
        <button type="submit">Fetch Attendance</button>
      </form>
      <ul>
        {attendanceRecords.map((record) => (
          <li key={record._id} style={{ color: "black" }}>
            Student Name: {record.student.name}
            <br />
            Grade: {record.student.grade}
            <br />
            Status: {record.status}
            <br />
            Date: {record.date}
          </li>
        ))}
      </ul>
      <AttendanceByDate http={http} />
    </div>
  );
};

export default AttendanceList;
