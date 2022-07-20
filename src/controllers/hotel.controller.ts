import { Request, Response, NextFunction } from 'express';
import { Hotel } from '../database/models/Hotel';
import { StatusCodes } from 'http-status-codes';
import { Room } from '../database/models/Room';

const { OK, CREATED, CONFLICT, NOT_FOUND } = StatusCodes;

export const getAllHotels = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.query.name) {
    next();
  } else {
    try {
      const hotels = await Hotel.findAll({ include: [Room] });
      res.status(OK).send({ hotels });
    } catch (error) {
      next(error);
    }
  }
};

export const createHotel = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, direction } = req.body;
    if (!name || !direction) {
      res.status(CONFLICT).send({
        message: 'All fields are required'
      });
    } else {
      const [hotel, created] = await Hotel.findOrCreate({
        where: { name },
        defaults: { name, direction }
      });

      if (created) {
        res.status(CREATED).send(hotel);
      } else {
        res.status(CONFLICT).send({
          message: 'This hotel already exist'
        });
      }
    }
  } catch (error) {
    next(error);
  }
};

export const getHotelById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const hotel = await Hotel.findByPk(id, { include: [Room] });

    if (hotel) {
      res.status(OK).send(hotel);
    } else {
      res.status(NOT_FOUND).send({
        message: 'hotel not found'
      });
    }
  } catch (error) {
    next(error);
  }
};

export const getHotelByName = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name } = req.query;

    const hotel = await Hotel.findOne({ where: { name }, include: [Room] });

    if (hotel) {
      res.send(hotel);
    } else {
      res.status(NOT_FOUND).send({
        message: 'hotel not found'
      });
    }
  } catch (error) {
    next(error);
  }
};

export const updateHotel = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, direction } = req.body;
    const { id } = req.params;

    const hotel = await Hotel.findByPk(id);

    if (hotel) {
      await hotel.update({ name, direction });
      res.status(OK).send({
        hotel,
        message: 'hotel updated correctly'
      });
    } else {
      res.status(NOT_FOUND).send({
        message: 'hotel not found'
      });
    }
  } catch (error) {
    next(error);
  }
};

export const deleteHotel = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const hotel = await Hotel.findByPk(id);

    if (hotel) {
      await hotel.destroy();
      res.status(OK).send({
        message: 'hotel deleted correctly'
      });
    } else {
      res.status(NOT_FOUND).send({
        message: 'hotel not found'
      });
    }
  } catch (error) {
    next(error);
  }
};

export const createRoom = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { roomNumber, capacity, numberOfBeds } = req.body;
    const hotel = await Hotel.findByPk(id);

    if (hotel) {
      const [room, created] = await Room.findOrCreate({
        where: {
          roomNumber
        },
        defaults: {
          roomNumber,
          capacity,
          numberOfBeds,
          hotelId: hotel.id
        }
      });
      if (created) {
        res.status(OK).send({
          room,
          message: 'room create successfully'
        });
      } else {
        res.status(CONFLICT).send({
          room,
          message: 'room already exist'
        });
      }
    } else {
      res.status(NOT_FOUND).send({
        message: 'hotel not found'
      });
    }
  } catch (error) {
    next(error);
  }
};

export const updateRoom = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id, roomId } = req.params;
    const { roomNumber, capacity, numberOfBeds } = req.body;
    const hotel = await Hotel.findByPk(id);

    if (hotel) {
      const room = await Room.findOne({
        where: {
          hotelId: hotel.id,
          roomNumber: roomId
        }
      });
      if (room) {
        await room?.update({ roomNumber, capacity, numberOfBeds });
        res.status(OK).send({
          room,
          message: 'room updated successfully'
        });
      } else {
        res.status(NOT_FOUND).send({
          message: 'room not found'
        });
      }
    } else {
      res.status(NOT_FOUND).send({
        message: 'hotel not found'
      });
    }
  } catch (error) {
    next(error);
  }
};

export const deleteRoom = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id, roomId } = req.params;
    const hotel = await Hotel.findByPk(id);

    if (hotel) {
      const room = await Room.findOne({
        where: {
          hotelId: hotel.id,
          roomNumber: roomId
        }
      });
      if (room) {
        await room?.destroy();
        res.status(OK).send({
          message: 'room deleted successfully'
        });
      } else {
        res.status(NOT_FOUND).send({
          message: 'room not found'
        });
      }
    } else {
      res.status(NOT_FOUND).send({
        message: 'hotel not found'
      });
    }
  } catch (error) {
    next(error);
  }
};
