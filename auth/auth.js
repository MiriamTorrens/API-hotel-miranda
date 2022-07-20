const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const JWTstrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;
const { passportKey } = require("../env");
require("../db");
const bcrypt = require("bcrypt");
const User = require("../models/User");

passport.use(
  "login",
  new localStrategy(
    {
      usernameField: "username",
      passwordField: "password",
    },
    async (username, password, done) => {
      const db_user = await User.findOne({
        user_email: username,
      });
      try {
        if (username === db_user.user_email) {
          bcrypt.compare(password, db_user.password, function (err, res) {
            if (res === true) {
              return done(null, db_user, {
                success: true,
                message: "Logged in Successfully",
              });
            } else {
              return done(null, false, {
                success: false,
                message: "Wrong Password",
              });
            }
          });
        } else {
          return done(null, false, {
            success: false,
            message: "User not found",
          });
        }
      } catch (error) {
        console.error(error);
        return done(error);
      }

      //   try {
      //     if (username === user.username && password === user.password) {
      //       return done(null, user, { message: "Logged in Successfully" });
      //     }
      //     return done(null, false, {
      //       message: "User not found or Wrong Password",
      //     });
      //   } catch (error) {
      //     console.error(error);
      //     return done(error);
      //   }
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
