import express from 'express';
import { getUser } from '../controllers/userController.js';
import { authenticateJWT } from '../middleware/auth.js';

const router = express.Router();

router.get('/me', authenticateJWT, getUser);

export default router;  