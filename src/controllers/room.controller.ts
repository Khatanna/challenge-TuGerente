import { Request, Response, NextFunction } from 'express';
import { Room } from '../database/models/Room';

export const getAllRooms = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.send({
      message: 'route'
    });
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
    res.send({
      message: 'route'
    });
  } catch (error) {
    next(error);
  }
};

export const getHotelByNumberOfNumber = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.send({
      message: 'route'
    });
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
    res.send({
      message: 'route'
    });
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
    res.send({
      message: 'route'
    });
  } catch (error) {
    next(error);
  }
};
