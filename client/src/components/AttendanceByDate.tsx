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
  const [date, setDate] = useState<Date | string>();
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
    <div className="max-w-fit p-4">
      <form onSubmit={fetchAttendanceByDate} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Fetch All Attendance by Date</h1>
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
            <p className="text-gray-700"><strong>Date:</strong> {record.date}</p>
            <p className="text-gray-700"><strong>Student Name:</strong> {record.student.name}</p>
            <p className="text-gray-700"><strong>Status:</strong> {record.status}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AttendanceByDate;