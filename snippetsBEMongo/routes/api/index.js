const express = require('express');
const router = express.Router();
const passport = require("passport");

const passportJWT = require("passport-jwt");
const extractJWT = passportJWT.ExtractJwt;
const strategyJWT = passportJWT.Strategy;

passport.use(
  new strategyJWT(
    {
      jwtFromRequest: extractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET
    },
    (payload, next) => {
      console.log(payload);
      return next(null, payload);
    }
  )
);

const jwtMiddleWare = passport.authenticate('jwt', {session:false});

const snippetsRoutes = require('./snippets');
const securityRouter = require('./security');

router.use("/security", securityRouter);

router.use("/snippets", jwtMiddleWare  , snippetsRoutes);


module.exports = router;
