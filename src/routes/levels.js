import express from 'express';
import { auth } from '../middleware/auth.js';
import { createLevel, getLevels } from '../controllers/levelsController.js';

const router = express.Router();

router.post('/', auth, createLevel);
router.get('/', auth, getLevels);

export default router;
