const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { findUserByEmail, createUser } = require('../queries/user.query');
const generateToken = require('../utils/generateToken');

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/api/auth/google/callback"
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      const email = profile.emails[0].value;
      let user = await findUserByEmail(email);

      if (!user) {
        user = await createUser({
          name: profile.displayName,
          email,
          password: '', // Empty because it's a social login
          provider: 'google'
        });
      }

      return done(null, user);
    } catch (err) {
      return done(err, null);
    }
  }
));
