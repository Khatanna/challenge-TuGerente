import { Request, Response, NextFunction } from 'express';
import { Hotel } from '../database/models/Hotel';
import { StatusCodes } from 'http-status-codes';
import { Room } from '../database/models/Room';
import passport from 'passport';
import { config } from 'dotenv';
import { Strategy } from 'passport-local';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Strategy as JwsStrategy, ExtractJwt } from 'passport-jwt';

const { OK, CREATED, CONFLICT, NOT_FOUND } = StatusCodes;
const SECRET_TOKEN = process.env.SECRET_TOKEN as string;

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  passport.authenticate('login', async (error, user, info) => {
    try {
      if (error || !user) {
        next(error);
      } else {
        req.login(user, { session: false }, (error) => {
          if (error) {
            next(error);
          } else {
            const body = { id: user.id };
            const token = jwt.sign({ user: body }, SECRET_TOKEN);
            res.redirect('/users/profile?secret_token=' + token);
          }
        });
      }
    } catch (error) {
      next(error);
    }
  })(req, res, next);
};

export const registerUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.redirect('/auth');
};

export const isAuth = (req: Request, res: Response, next: NextFunction) => {
  try {
    if (jwt.verify(req.query.secret_token as string, SECRET_TOKEN)) {
      next();
    } else {
      res.status(401);
    }
  } catch (error) {
    next(error);
  }
};
