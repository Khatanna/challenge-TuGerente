import { Request, Response, NextFunction } from 'express';
import { User } from '../database/models/User';
import { StatusCodes } from 'http-status-codes';
import { UserLogged } from '../types';

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

    const user = await User.findByPk(id);

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

    const user = await User.findOne({ where: { email } });

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
  const user = await User.findByPk(id);
  res.json({
    user,
    token: req.query.secret_token
  });
};
