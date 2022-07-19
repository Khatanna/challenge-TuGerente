import { Request, Response, NextFunction } from 'express';
import { Reservation } from '../database/models/Reservation';

export const getAllReservation = async (
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

export const createReservation = async (
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

export const getReservationById = async (
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

export const getReservationByName = async (
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

export const updateReservation = async (
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

export const deleteReservation = async (
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
