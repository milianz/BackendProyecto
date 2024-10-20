import express from 'express';
import { 
  getAllUsers, 
  deleteUser,
  getReportedPublications, 
  changePublicationStatus 
} from '../controllers/adminController.js';
import { authenticateJWT, isAdmin } from '../middleware/auth.js';

const router = express.Router();

router.get('/users', authenticateJWT, isAdmin, getAllUsers);
router.delete('/users/:userId', authenticateJWT, isAdmin, deleteUser);
router.get('/reported-publications', authenticateJWT, isAdmin, getReportedPublications);
router.patch('/publications/:publicationId/status', authenticateJWT, isAdmin, changePublicationStatus);

export default router;