import React, { useState } from "react";
import { AxiosInstance } from "axios";

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

const AttendanceByDate: React.FC<Props> = ({ http }) => {
  const [date, setDate] = useState<Date | String>();
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>([]);

  const fetchAttendanceByDate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await http.get("/attendance/byDate", {
        params: { date },
      });
      console.log("Response Data:", response.data);
      if (Array.isArray(response.data)) {
        setAttendanceRecords(response.data);
      } else {
        setAttendanceRecords([response.data]);
      }
    } catch (err) {
      console.error("Error fetching attendance:", err);
      alert("Error fetching attendance");
    }
  };

  return (
    <div>
      <form
        onSubmit={(e) => {
          fetchAttendanceByDate(e);
        }}
      >
        <label>
          Date:
          <input type="date" onChange={(e) => setDate(e.target.value)} required />
        </label>
        <button type="submit">Fetch Attendance</button>
      </form>
      <ul>
        {attendanceRecords.map((record) => (
          <li key={record._id}>
            Date: {record.date} - Student Name: {record.student.name} - {record.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AttendanceByDate;
