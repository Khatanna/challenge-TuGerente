import { config } from 'dotenv';
import { Request, Response, NextFunction, Router } from 'express';
import { User } from '../database/models/User';
import passport from 'passport';
import { Strategy } from 'passport-local';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Strategy as JwsStrategy, ExtractJwt } from 'passport-jwt';
import { loginUser, registerUser } from '../controllers/auth.controller';

config();
const router = Router();
const SECRET_TOKEN = process.env.SECRET_TOKEN as string;

router.get('/', (req, res) => {
  res.render('index');
});

passport.use(
  'signup',
  new Strategy(
    {
      usernameField: 'email'
    },
    async (email, password, done) => {
      const [user, created] = await User.findOrCreate({
        where: { email },
        defaults: {
          email,
          password
        }
      });

      if (created) {
        done(null, { id: user.id }, { message: 'register sucess' });
      } else {
        done(new Error('user already exist'), null, {
          message: 'user already exist'
        });
      }
    }
  )
);
passport.use(
  'login',
  new Strategy(
    {
      usernameField: 'email'
    },
    async (email, password, done) => {
      const user = await User.findOne({ where: { email } });

      if (user) {
        if (bcrypt.compareSync(password, user.password)) {
          done(null, user, { message: 'Loggin success' });
        } else {
          done(new Error('incorrect password'), null, {
            message: 'incorrect password'
          });
        }
      } else {
        done(new Error('unregistered user'), null, {
          message: 'unregistered user'
        });
      }
    }
  )
);

passport.use(
  new JwsStrategy(
    {
      secretOrKey: SECRET_TOKEN?.toString(),
      jwtFromRequest: ExtractJwt.fromUrlQueryParameter('secret_token')
    },
    (token, done) => {
      try {
        return done(null, token.user);
      } catch (error) {
        done(error);
      }
    }
  )
);

router.post(
  '/register',
  passport.authenticate('signup', { session: false }),
  registerUser
);
router.post('/login', loginUser);

export default router;
