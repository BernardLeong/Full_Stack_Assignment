import express from 'express';
import { addTeacher, listTeachers } from '../controllers/teacherController';
import { validateTeacher } from '../middleware/validator/teacherValidator';

const router = express.Router();

router.post('/', validateTeacher, addTeacher);
router.get('/', listTeachers);

export default router;

