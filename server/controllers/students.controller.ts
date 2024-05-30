import Student from "../models/students.model";
import Attendance from "../models/attendance.model";
import { parse } from "path";

async function addStudent(req: any, res: any) {
  try {
    const newStudent = new Student(req.body);
    const student = await newStudent.save();
    res.json(newStudent);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
}

async function getAllStudents(req: any, res: any) {
  try {
    const allStudents = await Student.find();
    res.json(allStudents);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
}

async function getOneStudent(req: any, res: any) {
  try {
    const oneStudent = await Student.findOne(req.params);
    res.json(oneStudent);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
}

async function updateStudent(req: any, res: any) {
  const options = {
    new: true,
    runValidators: true,
  };

  try {
    const updatedStudent = await Student.findOneAndUpdate(
      req.params,
      req.body,
      options
    );
    res.json(updatedStudent);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
}

async function deleteStudent(req: any, res: any) {
  try {
    const deletedStudent = await Student.findOneAndDelete(req.params);
    res.json(deletedStudent);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
}
//<------------------------ ↓ --------------------- ↓   Attendance  ↓ -------------------------- ↓ --------------------->
// Marking attendance
async function markAttendance(req: any, res: any) {
  try {
    const { student, status } = req.body;
    // Find the student by studentId

    const studentIdNum = parseInt(student);
    // console.log(studentIdNum)
    const findStudent = await Student.findOne({ studentId: studentIdNum }); //have to reference the studentId here.
    console.log("Response:", JSON.stringify(findStudent, null, 2));

    

    if (!findStudent) {
      return res.status(404).send("Student not found");
    }

    // Create an attendance record
    const dateConversion = new Date()
    const attendanceRecord = new Attendance({
      student: findStudent._id,
      date: dateConversion.toLocaleDateString(),
      status: status,
    });

    const savedRecord = await attendanceRecord.save();
    console.log("Saved Attendance Record:", savedRecord);

    res.json(savedRecord);
  } catch (err) {
    res.status(500).json(err);
  }
}
// Marking attendance

// Fetch Attendance
async function getAttendance(req: any, res: any) {
  const { studentId } = req.query;
  const student = await Student.findOne({ studentId });

  if (!student) {
    return res.status(404).send("Student not found");
  }
  const attendanceRecords = await Attendance.find({ student: student._id })
    .populate("student")
    .exec();
  // const attendanceRecords = await Attendance.find({
  //   student: student.studentId,
  //   date: {
  //     $gte: new Date(date),
  //     $lt: new Date(date).setDate(new Date(date).getDate() + 1),
  //   }, // Filter by date
  // });
  res.status(200).json(attendanceRecords);
}
async function getAttendanceByDate(req: any, res: any) {
  try {
    const { date } = req.query;
    let attendanceRecords = await Attendance.find(
      {date: date}
    )
    .populate("student")
    .exec();
    // Return the attendance records
    return res.json(attendanceRecords);
  } catch (error) {
    console.error("Error fetching attendance by date:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
//Fetch Attendance

export {
  addStudent,
  updateStudent,
  deleteStudent,
  getAllStudents,
  getOneStudent,
  markAttendance,
  getAttendance,
  getAttendanceByDate,
};
