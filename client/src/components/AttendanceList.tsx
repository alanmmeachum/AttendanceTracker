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
  const [date, setDate] = useState<Date | string>();

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
    <div className="max-w-6xl sm:mx-auto lg:ml-72 p-4 flex">
      <div className="max-w-xxl p-4">
        <form onSubmit={fetchAttendance} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Fetch Student Attendance by Date</h1>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Student ID:
            </label>
            <input
              type="text"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Date:
            </label>
            <input
              type="date"
              onChange={(e) => setDate(e.target.value)}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Fetch Attendance
            </button>
          </div>
        </form>
        <ul className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 overflow-x-auto max-h-80">
          {attendanceRecords.map((record) => (
            <li key={record._id} className="mb-4">
              <p className="text-gray-700"><strong>Student Name:</strong> {record.student.name}</p>
              <p className="text-gray-700"><strong>Grade:</strong> {record.student.grade}</p>
              <p className="text-gray-700"><strong>Status:</strong> {record.status}</p>
              <p className="text-gray-700"><strong>Date:</strong> {record.date}</p>
            </li>
          ))}
        </ul>
      </div>
      <AttendanceByDate http={http} />
    </div>
  );
};

export default AttendanceList;