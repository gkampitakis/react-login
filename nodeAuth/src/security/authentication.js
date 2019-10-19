import jwt from 'jsonwebtoken';
import expressJwt from 'express-jwt';
import compose from 'composable-middleware';
import User from '../modules/user/user.schema';

let validateJwt = expressJwt({
  secret: 'app sercet key here insert'
});

export function signToken(userId) {
  let _expiresIn = 60 * 60 * 11 * 24; //11 days
  return jwt.sign({ _id: userId }, 'app sercet key here insert', {
    //the calculations is on seconds ex 60*60*5=18000sec , 5 hours * 24 hours = 5 days,
    expiresIn: _expiresIn
  });
}

export function isAuthenticated() {
  return compose()
    .use(function(req, res, next) {
      try {
        // allow access_token to be passed through query parameter as well
        if (req.query && req.query.hasOwnProperty('access_token')) {
          req.headers.authorization = `Bearer ${req.query.access_token}`;
        }
        // IE11 forgets to set Authorization header sometimes. Pull from cookie instead.
        if (req.query && typeof req.headers.authorization === 'undefined') {
          req.headers.authorization = `Bearer ${req.cookies.token}`;
        }
        validateJwt(req, res, next);
      } catch (err) {
        return res
          .status(401)
          .send({ status: 401, message: 'Token Expected' })
          .end();
      }
    })
    .use(function(err, req, res, next) {
      if (err) {
        return res.status(err.status).send({
          status: err.status,
          message: err.message
        });
      }
      next();
    })
    .use(function(req, res, next) {
      User.findById(req.user._id)
        .exec()
        .then(user => {
          if (!user) {
            return res.status(401).end();
          }
          req.user = user;
          next();
          return null;
        })
        .catch(err => next(err));
    });
}
