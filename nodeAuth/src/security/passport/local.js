import passport from 'passport';
import { Strategy } from 'passport-local';

function localAUthenticate(User, email, password, done) {
  User.findOne({ email: email.toLowerCase().trim() })
    .exec()
    .then(user => {
      if (!user)
        return done(null, false, {
          message: 'Could not find  the user'
        });

      user.authenticate(password, (error, authenticated) => {
        if (error) done(error);
        if (!authenticated)
          done(null, false, { message: 'Password not correct' });
        else return done(null, user);
      });
    });
}

export function setup(User) {
  passport.use(
    new Strategy(
      {
        usernameField: 'email',
        passwordField: 'password'
      },
      function(email, password, done) {
        localAUthenticate(User, email, password, done);
      }
    )
  );
}
