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

const AttendanceList: React.FC<Props> = ({ http }) => {
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>([]);
  const [studentId, setStudentId] = useState("");
  const [date, setDate] = useState("");

  const fetchAttendance = () => {
    http
      .get("/attendance", {
        params: { studentId, date },
      })
      .then((res) => {
        console.log("Response Data: ", res.data);
        if (Array.isArray(res.data)) {
          setAttendanceRecords(res.data);
        } else {
          setAttendanceRecords([res.data]);
        }
      })
      .catch((err) => {
        console.log(err);
        alert("Error fetching attendance");
      });
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
            type="text"
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
      <ul>
        {attendanceRecords.map((record, index) => (
          <li key={record._id} style={{ color: "black" }}>
            Student Name: {record.student.name}<br />
            Grade: {record.student.grade}<br />
            Status: {record.status}<br />
            Date: {new Date(record.date).toLocaleDateString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AttendanceList;
