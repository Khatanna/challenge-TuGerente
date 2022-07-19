import { Request, Response, NextFunction } from 'express';
import { Hotel } from '../database/models/Hotel';

export const getAllHotels = async (
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

export const createHotel = async (
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

export const getHotelById = async (
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

export const getHotelByName = async (
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

export const updateHotel = async (
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

export const deleteHotel = async (
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
