import {addStudent, deleteStudent, updateStudent, getAllStudents, getOneStudent, markAttendance, getAttendance} from "../controllers/students.controller";
import {Router} from 'express';

const router = Router()

router.route('/students')
    .get(getAllStudents)
    .post(addStudent)

router.route('/attendance')
    .get(getAttendance)
    .post(markAttendance)

router.route('/students/:name')
    .get(getOneStudent)
    .patch(updateStudent)
    .delete(deleteStudent)

export default router;
