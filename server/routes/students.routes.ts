import {addStudent, deleteStudent, updateStudent, getAllStudents, getOneStudent, markAttendance, getAttendance, getAttendanceByDate} from "../controllers/students.controller";
import {Router} from 'express';

const router = Router()

router.route('/students')
    .get(getAllStudents)
    .post(addStudent)

router.route('/attendance')
    .get(getAttendance)
    .post(markAttendance)
    
router.route('/attendance/byDate')
    .get(getAttendanceByDate)

router.route('/students/:studentId')
    .get(getOneStudent)
    .patch(updateStudent)
    .delete(deleteStudent)

export default router;
