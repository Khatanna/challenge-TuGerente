import { Request, Response, NextFunction } from 'express';
import { User } from '../database/models/User';
import { StatusCodes } from 'http-status-codes';
import { UserLogged } from '../types';
import { Reservation } from '../database/models/Reservation';
import { Room } from '../database/models/Room';
import { Op } from 'sequelize';

const { OK, CREATED, CONFLICT, NOT_FOUND } = StatusCodes;

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.query.email) {
    next();
  } else {
    try {
      const users = await User.findAll();
      res.status(OK).send({ users });
    } catch (error) {
      next(error);
    }
  }
};

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(CONFLICT).send({
        message: 'All fields are required'
      });
    } else {
      const [user, created] = await User.findOrCreate({
        where: { email },
        defaults: { email, password }
      });

      if (created) {
        res.status(CREATED).send(user);
      } else {
        res.status(CONFLICT).send({
          message: 'This user already exist'
        });
      }
    }
  } catch (error) {
    next(error);
  }
};

export const getUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const user = await User.findByPk(id, {
      attributes: {
        exclude: ['password']
      },
      include: {
        where: {
          state: {
            [Op.not]: 'deleted'
          }
        },
        attributes: ['id', 'state'],
        model: Reservation,
        include: [Room]
      }
    });

    if (user) {
      res.status(OK).send(user);
    } else {
      res.status(NOT_FOUND).send({
        message: 'user not found'
      });
    }
  } catch (error) {
    next(error);
  }
};

export const getUserByEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email } = req.query;

    const user = await User.findOne({
      attributes: {
        exclude: ['password']
      },
      where: {
        email
      },
      include: {
        where: {
          state: {
            [Op.not]: 'deleted'
          }
        },
        attributes: {
          exclude: ['userId', 'roomId']
        },
        model: Reservation,
        include: [Room]
      }
    });

    if (user) {
      res.send(user);
    } else {
      res.status(NOT_FOUND).send({
        message: 'user not found'
      });
    }
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    const { id } = req.params;

    const user = await User.findByPk(id);

    if (user) {
      await user.update({ email, password });
      res.status(OK).send({
        user,
        message: 'user updated correctly'
      });
    } else {
      res.status(NOT_FOUND).send({
        message: 'user not found'
      });
    }
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const user = await User.findByPk(id);

    if (user) {
      await user.destroy();
      res.status(OK).send({
        user,
        message: 'user deleted correctly'
      });
    } else {
      res.status(NOT_FOUND).send({
        message: 'user not found'
      });
    }
  } catch (error) {
    next(error);
  }
};

export const getUserProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.user as UserLogged;
  const user = await User.findByPk(id, {
    attributes: {
      exclude: ['password']
    },
    include: {
      where: {
        state: {
          [Op.not]: 'deleted'
        }
      },
      attributes: ['id', 'state'],
      model: Reservation,
      include: [Room]
    }
  });
  res.json({
    user,
    token: req.query.secret_token
  });
};

export const createReservation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.params;
    const { state, daysOfStay, reservePrice, roomId } = req.body;
    const user = await User.findByPk(userId);

    if (user) {
      const reservation = await Reservation.create({
        state,
        daysOfStay,
        userId,
        reservePrice,
        roomId
      });

      res.status(CREATED).send({
        reservation,
        message: 'reservation created successfully'
      });
    } else {
      res.status(NOT_FOUND).send({
        message: 'user not found'
      });
    }
  } catch (error) {}
};

export const deleteReservation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { reservationId, userId } = req.params;

    // const user = await User.findByPk(userId);

    const reservation = await Reservation.findOne({
      where: {
        userId,
        id: reservationId
      }
    });

    if (reservation) {
      await reservation.update({ state: 'deleted' });
      res.status(OK).send({
        message: 'reservation deleted successfully'
      });
    } else {
      res.status(NOT_FOUND).send({
        message: 'reservation not found'
      });
    }
  } catch (error) {}
};

export const updateReservation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { roomId, reservePrice, daysOfStay } = req.body;
    const { reservationId, userId } = req.params;

    const reservation = await Reservation.findOne({
      where: {
        userId,
        id: reservationId
      }
    });
    if (reservation) {
      await reservation.update({
        roomId,
        reservePrice,
        daysOfStay
      });
      res.status(OK).send({
        message: 'reservation updated successfully'
      });
    } else {
      res.status(NOT_FOUND).send({
        message: 'reservation not found'
      });
    }
  } catch (error) {}
};
