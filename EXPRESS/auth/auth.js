const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const JWTstrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;
const { passportKey } = require("../env");

const user = {
  username: "m.torrens@miranda.com",
  password: "1234",
};

passport.use(
  "login",
  new localStrategy(
    {
      usernameField: "username",
      passwordField: "password",
    },
    async (username, password, done) => {
      try {
        if (username === user.username && password === user.password) {
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
