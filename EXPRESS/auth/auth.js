const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const {passportKey} = require('../env');

const user = {
    email: "m.torrens@miranda.com",
    password: "1234"
}

passport.use(
  'login',
  new localStrategy(
    {
      emailField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
        try {
          console.log(email, password)
        if (email === user.email && password === user.pass) {
          return done(null, user, { message: "Logged in Successfully" });
        }
        return done(null, false, {
          message: "User not found or Wrong Password",
        });
      } catch (error) {
        console.error(error);
        return done(error);
      }
    }
  )
);

passport.use(
  new JWTstrategy(
    {
      secretOrKey: passportKey,
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    },
    async (token, done) => {
      try {
        return done(null, token.user);
      } catch (error) {
        done(error);
      }
    }
  )
);
