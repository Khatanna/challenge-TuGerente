import { Router } from 'express';
import {
  createRoom,
  deleteRoom,
  getAllRooms,
  getHotelByNumberOfNumber,
  updateRoom
} from '../controllers/room.controller';
const router = Router();

router.get('/', getAllRooms);
router.get('/:numberOfRoom', getHotelByNumberOfNumber);

router.post('/', createRoom);

router.put('/', updateRoom);

router.delete('/', deleteRoom);

export default router;
