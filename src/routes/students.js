import express from 'express';
import { getExamsByLevel, submitExam } from '../controllers/studentController.js';
import { auth, studentAuth } from '../middleware/auth.js';

const router = express.Router();

router.get('/exams', auth, studentAuth, getExamsByLevel);
router.post('/submit-exam/:examId', auth, studentAuth, submitExam);

export default router;