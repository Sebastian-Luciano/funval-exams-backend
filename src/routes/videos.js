/* import express from 'express';
import { uploadVideo, getVideos } from '../controllers/videoController.js';
import { auth } from '../middleware/auth.js';
import { upload } from '../middleware/upload.js';

const router = express.Router();

router.post('/', auth, upload.single('video'), uploadVideo);
router.get('/', auth, getVideos);

export default router; */

// src/routes/videos.js

import express from 'express';
import { getVideos, gradeVideo, uploadVideo } from '../controllers/videoController.js';
import { auth, teacherAuth } from '../middleware/auth.js';
import { upload } from '../middleware/upload.js';

const router = express.Router();

router.get('/', auth, getVideos);
router.post('/:videoId/grade', auth, teacherAuth, gradeVideo);
router.post('/upload', auth, upload.single('video'), uploadVideo);

export default router;