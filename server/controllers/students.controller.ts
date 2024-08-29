import Student from "../models/students.model";
import Attendance from "../models/attendance.model";
import { Request, Response } from "express";

async function addStudent(req: any, res: any) {
  try {
    const newStudent = new Student(req.body);
    const student = await newStudent.save();
    res.json(newStudent);
  } catch (error) {
    console.error(error);
    res.status(400).json(error);
  }
}

async function getAllStudents(req: any, res: any) {
  try {
    const allStudents = await Student.find();
    res.json(allStudents);
  } catch (error) {
    console.error(error);
    res.status(400).json(error);
  }
}

async function getOneStudent(req: any, res: any) {
  try {
    const { studentId } = req.params;
    const student = await Student.findOne({ studentId: studentId });

    if (!student) {
      res.status(404).json({ message: "Student not found" });
      return;
    }

    res.status(200).json(student);
  } catch (error) {
    console.error("Error fetching student:", error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
}

async function getStudentByGrade(req: Request, res: Response) {
  try {
    const { grade } = req.params;
    const students = await Student.find({ grade });

    if (!students) {
      res.status(404).json({ message: "No Students Found in that Grade" });
      return;
    }

    res.status(200).json(students);
  } catch (error) {
    console.error("Error fetching students:", error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
}


async function updateStudent(req: any, res: any) {
  const options = {
    new: true,
    runValidators: true,
  };

  try {
    const updatedStudent = await Student.findOneAndUpdate(req.params, req.body, options);
    res.json(updatedStudent);
  } catch (error) {
    console.error(error);
    res.status(400).json(error);
  }
}

async function deleteStudent(req: any, res: any) {
  try {
    const deletedStudent = await Student.findOneAndDelete(req.params);
    res.json(deletedStudent);
  } catch (error) {
    console.error(error);
    res.status(400).json(error);
  }
}
//<------------------------ ↓ --------------------- ↓   Attendance  ↓ -------------------------- ↓ --------------------->
// <-------- Marking attendance ---------->
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
    const dateConversion = new Date();
    const attendanceRecord = new Attendance({
      student: findStudent._id,
      date: dateConversion.toLocaleDateString(),
      status: status,
    });

    const savedRecord = await attendanceRecord.save();
    console.log("Saved Attendance Record:", savedRecord);

    res.json(savedRecord);
  } catch (error) {
    console.error("Error marking attendance:", error);
    res.status(500).json(error);
  }
}
// <---------- Marking attendance ---------->

// <---------- Fetch Attendance ------------>
async function getAttendance(req: any, res: any) {
  try {
    const { studentId, date } = req.query;
    const student = await Student.findOne({ studentId: studentId });

    if (!student) {
      return res.status(404).send("Student not found");
    }
    const attendanceRecords = await Attendance.find({
      student: student._id,
      date: date,
    })
      .populate("student")
      .exec();

    return res.status(200).json(attendanceRecords);
  } catch (error) {
    console.error("Error fetching attendance:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

//Deleting only 1 recorded attendance
async function deleteAttendance(req: any, res: any) {
    try {
      const deletedAttendance = await Attendance.findOneAndDelete(req.params);
      res.json(deletedAttendance);
    } catch (error) {
      console.error(error);
      res.status(400).json(error);
    }
  }

async function getAttendanceByDate(req: any, res: any) {
  try {
    const { date } = req.query;
    const attendanceRecords = await Attendance.find({
      date: date,
    })
      .populate("student")
      .exec();
    if (Object.keys(attendanceRecords).length < 1) {
      console.log(`No attendance records found for ${date}`);
    }
    // Return the attendance records
    return res.json(attendanceRecords);
  } catch (error) {
    console.error("Error fetching attendance by date:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
// <----------- Fetch Attendance ----------->

export {
  addStudent,
  updateStudent,
  deleteStudent,
  getAllStudents,
  getStudentByGrade,
  getOneStudent,
  markAttendance,
  getAttendance,
  deleteAttendance, 
  getAttendanceByDate,
};
