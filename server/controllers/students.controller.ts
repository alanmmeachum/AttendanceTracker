import Student from "../models/students.model";
import Attendance from "../models/attendance";

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
    const oneStudent = await Student.findById(req.params.id);
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
    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      options
    );
    res.json(updateStudent);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
}

async function deleteStudent(req: any, res: any) {
  try {
    const deletedStudent = await Student.findByIdAndDelete(req.params.id);
    res.json(deletedStudent);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
}

// Marking attendance, Fetch Attendance
async function markAttendance(req: any, res: any) {
  const { studentId, status } = req.body;
  const student = await Student.findOne({ studentId });

  if (!student) {
    return res.status(404).send("Student not found");
  }

  const attendanceRecord = new Attendance({
    date: new Date(),
    student: student._id,
    status,
  });

  try {
    await attendanceRecord.save();
    res.status(201).send("Attendance recorded");
  } catch (error) {
    res.status(400).send("Error recording attendance");
  }
}

async function getAttendance(req: any, res: any) {
  const{ studentId, date } = req.query;
  const student = await Student.findOne({studentId})

  if (!student) {
    return res.status(404).send("Student not found");
  }

  const attendanceRecords = await Attendance.find({
    student: student._id,
    date: new Date(date)
  })
  res.status(200).json(attendanceRecords);
}
// Marking attendance, Fetch Attendance

export {
  addStudent,
  updateStudent,
  deleteStudent,
  getAllStudents,
  getOneStudent,
  markAttendance,
  getAttendance
};
