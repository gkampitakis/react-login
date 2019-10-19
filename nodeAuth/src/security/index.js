import { Router } from 'express';
import passport from 'passport';
import User from '../modules/user/user.schema';
import { setup as localSetup } from './passport/local';
import { signToken } from './authentication';

localSetup(User);
const AuthRouter = new Router();

AuthRouter.post('/', (req, res, next) => {
  passport.authenticate('local', { session: false }, (err, user, info) => {
    let error = err || info;
    if (error) return res.status(404).json(error);
    if (!user) return res.status(404).json({ message: 'User not found' });

    let token = signToken(user._id);
    return res.json({ token });
  })(req, res, next);
});

export default AuthRouter;
