import { Router } from 'express';
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUserByEmail,
  getUserById,
  updateUser
} from '../controllers/user.controller';

const router = Router();

router.get('/', getAllUsers);
router.get('/', getUserByEmail);
router.get('/:id', getUserById);

router.post('/', createUser);

router.put('/:id', updateUser);

router.delete('/:id', deleteUser);

export default router;
