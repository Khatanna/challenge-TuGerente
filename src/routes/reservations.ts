import { Router } from 'express';
import {
  createReservation,
  deleteReservation,
  getAllReservation,
  getReservationById,
  getReservationByName,
  updateReservation
} from '../controllers/reservation..controller';

const router = Router();

router.get('/', getAllReservation);
router.get('/:id', getReservationById);
// router.get('/:id', getReservationByName);

router.post('/', createReservation);

router.put('/', updateReservation);

router.delete('/', deleteReservation);

export default router;
