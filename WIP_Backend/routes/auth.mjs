import express from 'express';
import passport from 'passport';
import passport_local from 'passport-local';
const LocalStrategy = passport_local.Strategy;
import crypto from 'node:crypto';
import { repo } from '../repo.mjs';

passport.use(new LocalStrategy(
  function(email, password, cb) {
    repo.getUserByEmail(email, function(err, user) {
      if (err) { return cb(err); }
      if (!user) {
        return cb(null, false, { message: "Incorrect username or password." });
      }
      /*crypto.pbkdf2(password, "alts", 2 ** 18, 64, 'sha256', function(err, hashed) {
        if (err) { return cb(err); }
        if (!crypto.timingSafeEqual(user.pwhash, hashed)) {
          return cb(null, false, { message: "Incorrect username or password." });
        }
        return cb(null, user);
      });*/
      if (password === user.password) return cb(null, user);
      else return cb(null, false, { message: "Incorrect username or password." });
    });
  }
));

passport.serializeUser(function(user, cb) {
  cb(null, user.user_id);
});

passport.deserializeUser(function(id, cb) {
  repo.getUserById(id, function(err, user) {
    if (err) return cb(err);
    if (!user) return cb("Error - no such user");
    return cb(null, user);
  });
});

let router = express.Router();

let signup = function(req, res, next) {
  console.log("Signup request received:", req.body);
  repo.getUserByName(req.body.username, function(err, user) {
    if (err) { return next(err); }
    if (user) {
      console.log("User already exists:", req.body.username);
      return res.status(400).send("User already exists");
    }

    crypto.pbkdf2(req.body.password, 'alts', 2**18, 64, 'sha256', function(err, hashed) {
      if (err) { return next(err); }
      
      repo.addUser(req.body.username, hashed, function(err, newUser) {
        if (err) { return next(err); }
        
        req.login(newUser, function(err) {
          if (err) { return next(err); }
          console.log("User registered and logged in:", newUser.username);
          res.status(201).send("User registered and logged in");
        });
      });
    });
  });
}

router.post("/signup", signup);

router.post("/signin", passport.authenticate('local', {
  successRedirect: "/",
  failureRedirect: "/login",
  failureMessage: true
}));

router.get("/profile", (req, res) => {
  if (!req.isAuthenticated()) return res.status(401).send('Not authenticated');
  let profile = {};
  res.json(profile);
});

router.delete('/signout', (req, res, next) => {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect("/");
  });
});

export default router;