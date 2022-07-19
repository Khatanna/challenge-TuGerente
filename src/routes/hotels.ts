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
router.get('/:name', getHotelByName);
router.get('/:id', getHotelById);

router.post('/', createHotel);

router.put('/', updateHotel);

router.delete('/', deleteHotel);

export default router;
