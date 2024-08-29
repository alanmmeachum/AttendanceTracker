import {addStudent, deleteStudent, updateStudent, getAllStudents, getOneStudent, markAttendance, getAttendance, getAttendanceByDate, getStudentByGrade, deleteAttendance} from "../controllers/students.controller";
import {Router} from 'express';

const router = Router()

router.route('/students')
    .get(getAllStudents)
    .post(addStudent)

router.route('/students/:studentId')
    .get(getOneStudent)
    .patch(updateStudent)
    .delete(deleteStudent)

router.route('/students/grade/:grade')
    .get(getStudentByGrade)

router.route('/attendance')
    .get(getAttendance)
    .post(markAttendance)

router.route('/attendance/:id')
    .delete(deleteAttendance)
    
router.route('/attendance/byDate')
    .get(getAttendanceByDate)


export default router;
