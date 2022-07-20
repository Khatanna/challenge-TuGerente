import { Router } from 'express';
import passport from 'passport';
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUserByEmail,
  getUserById,
  updateUser,
  getUserProfile
} from '../controllers/user.controller';
import { isAuth } from '../controllers/auth.controller';

const router = Router();

router.get('/profile', isAuth, getUserProfile);
router.get('/', getAllUsers);
router.get('/', getUserByEmail);
router.get('/:id', getUserById);

router.post('/', createUser);

router.put('/:id', updateUser);

router.delete('/:id', deleteUser);

export default router;
