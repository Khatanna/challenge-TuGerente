import { Router } from 'express';
import {
  createHotel,
  createRoom,
  deleteHotel,
  deleteRoom,
  getAllHotels,
  getHotelById,
  getHotelByName,
  updateHotel,
  updateRoom
} from '../controllers/hotel.controller';

const router = Router();

router.get('/', getAllHotels);
router.get('/', getHotelByName);
router.get('/:id', getHotelById);

router.post('/', createHotel);
router.post('/rooms/:id', createRoom);

router.put('/:id', updateHotel);
router.post('/rooms/:id/:roomId', updateRoom);

router.delete('/:id', deleteHotel);
router.post('/rooms/:id/:roomId', deleteRoom);

export default router;
