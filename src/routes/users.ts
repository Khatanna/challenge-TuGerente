import { Router } from 'express';
import passport from 'passport';
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUserByEmail,
  getUserById,
  updateUser,
  getUserProfile,
  deleteReservation,
  updateReservation,
  createReservation
} from '../controllers/user.controller';
import { isAuth } from '../controllers/auth.controller';

const router = Router();

router.get('/profile', isAuth, getUserProfile);
router.get('/', getAllUsers);
router.get('/', getUserByEmail);
router.get('/:id', getUserById);

router.post('/', createUser);
router.post('/reservations/:userId', createReservation);

router.put('/:id', updateUser);
router.put('/reservations/:userId/:reservationId', updateReservation);

router.delete('/:id', deleteUser);
router.delete('/reservations/:userId/:reservationId', deleteReservation);

export default router;
