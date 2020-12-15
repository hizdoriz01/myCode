const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const userModel = require('../app/models/user.model');

module.exports = function initAuthMiddleware(app) {
  passport.use('locals',
    new LocalStrategy({
      usernameField: 'email',
      passwordField: 'password'
    }, async (email, password, done) => {
      const user = await userModel.getUserData(email, password);
      if (!user) {
        return done(null, false);
      }
      return done(null, user);
    })
  );

  passport.serializeUser((user, done) => done(null, user.id));

  passport.deserializeUser(async (id, done) => {
    const user = await userModel.getUserById(id);
    if (!user) {
      return done(`Could not deserialize user with id ${id}`);
    }
    return done(null, user);
  });

  app.use(passport.initialize());
  app.use(passport.session());
};
