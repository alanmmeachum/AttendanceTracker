//To mark the attendance and will be displayed on all views
//Add Attendance form here

interface Student {
  _id: string;
  name: string;
  grade: string;
  studentId: number;
  birthday: string;
  school: string;
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

const MarkAttendance = () => {
  return <></>;
};

export default MarkAttendance;
