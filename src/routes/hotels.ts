import { Router } from 'express';
import {
  createHotel,
  deleteHotel,
  getAllHotels,
  getHotelById,
  getHotelByName,
  updateHotel
} from '../controllers/hotel.controller';

const router = Router();

router.get('/', getAllHotels);
router.get('/', getHotelByName);
router.get('/:id', getHotelById);

router.post('/', createHotel);

router.put('/:id', updateHotel);

router.delete('/:id', deleteHotel);

export default router;
