import Student from "../models/students.model";
import Attendance from "../models/attendance.model";

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

// Marking attendance, Fetch Attendance
async function markAttendance(req: any, res: any) {
  try {
    const { studentId, status } = req.body;

    console.log("Received body:", req.body);

    if (!studentId || !status) {
      return res.status(400).send("Missing studentId or status");
    }

    const student = await Student.findOne({ studentId }).exec();

    if (!student) {
      return res.status(404).send("Student not found");
    }

    const attendanceRecord = new Attendance({
      date: new Date(),
      student: studentId,
      status,
    });

    await attendanceRecord.save();
    return res.status(201).send("Attendance recorded");
  } catch (error) {
    console.error("Error marking attendance:", error);
    return res.status(500).send("Internal Server Error");
  }
}

async function getAttendance(req: any, res: any) {
  const { studentId, date } = req.query;
  const student = await Student.findOne({ studentId });

  if (!student) {
    return res.status(404).send("Student not found");
  }

  const attendanceRecords = await Attendance.find({
    student: student.studentId,
    date: {
      $gte: new Date(date),
      $lt: new Date(date).setDate(new Date(date).getDate() + 1),
    }, // Filter by date
  });
  res.status(200).json(attendanceRecords);
}

async function getAttendanceByDate(req: any, res: any) {
  try {
    const { date } = req.params;

    // Parse date string into a Date object
    const targetDate = new Date(date);

    // Find attendance records for the specified date
    const attendanceRecords = await Attendance.find({
      date: {
        $gte: new Date(targetDate.setHours(0, 0, 0)), // Start of the day
        $lt: new Date(targetDate.setHours(23, 59, 59, 999)), // End of the day
      },
    });

    // Return the attendance records
    return res.json(attendanceRecords);
  } catch (error) {
    console.error("Error fetching attendance by date:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
// Marking attendance, Fetch Attendance

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
