const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const JWTstrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;
const { passportKey } = require("../env");
const { connection } = require("../db");
const bcrypt = require("bcrypt");

passport.use(
  "login",
  new localStrategy(
    {
      usernameField: "username",
      passwordField: "password",
    },
    async (username, password, done) => {
      connection.query(
        "SELECT user_email, password FROM users WHERE user_email = ?",
        [username],
        (err, results) => {
          const user = {
            username: results[0].user_email,
            password: results[0].password,
          };
          try {
            if (username === user.username) {
              bcrypt.compare(password, user.password, function (err, res) {
                if (res === true) {
                  return done(null, user, {
                    message: "Logged in Successfully",
                  });
                }
                return done(null, false, {
                  message: "User not found or Wrong Password",
                });
              });
            }
          } catch (error) {
            console.error(error);
            return done(error);
          }
        }
      );
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
