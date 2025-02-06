import express from 'express';
import passport from 'passport';
import passport_local from 'passport-local';
const LocalStrategy = passport_local.Strategy;
import crypto from 'node:crypto';
<<<<<<< Updated upstream
=======
import bodyParser from 'body-parser';
import formidable, { errors as formidableErrors } from 'formidable';
import { secondaryParseFields } from "../fieldparse.mjs";
>>>>>>> Stashed changes
import { repo } from '../repo.mjs';

passport.use(new LocalStrategy(
<<<<<<< Updated upstream
  { usernameField: 'email' },  // Explicitly setting usernameField to 'email'
  function(email, password, cb) {
    repo.getUserByEmail(email, function(err, user) {
=======
  {
    usernameField: "email",
    passwordField: "password"
  },
  function (email, password, cb) {
    if (email === undefined || password === undefined) {
      return cb(400);
    }
    repo.getUserByEmail(email, function (err, user) {
>>>>>>> Stashed changes
      if (err) { return cb(err); }
      if (!user) {
        return cb(null, false, { message: "Incorrect username or password." });
      }
<<<<<<< Updated upstream

      // Secure password comparison
      crypto.pbkdf2(password, "alts", 2 ** 18, 64, 'sha256', function(err, hashed) {
=======
      /*crypto.pbkdf2(password, 'alts', 2 ** 18, 64, 'sha256', function (err, hashed) {
>>>>>>> Stashed changes
        if (err) { return cb(err); }
        if (!crypto.timingSafeEqual(user.pwhash, hashed)) {
          return cb(null, false, { message: "Incorrect username or password." });
        }
        return cb(null, user);
      });
    });
  }
));

passport.serializeUser(function (user, cb) {
  cb(null, user.user_id);
});

passport.deserializeUser(function (id, cb) {
  repo.getUserById(id, function (err, user) {
    if (err) return cb(err);
    if (!user) return cb("Error - no such user");
    return cb(null, user);
  });
});

let router = express.Router();

<<<<<<< Updated upstream
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
=======
let signup = function (req, res, next) {
  const form = formidable({});
  form.parse(req, (err, fields, files) => {
    let formData = secondaryParseFields(fields, "username", "email", "password");
    console.log("Signup request received:", formData.username);
    crypto.pbkdf2(formData.password, 'alts', 2 ** 18, 64, 'sha256', function (err, hashed) {
      if (err) { return next(err); }

      repo.addUser(req, formData, function (err, data) {
        repo.errorHandling(err, res, () => {
          // store hashed password in the user data
          data.pwhash = hashed;
          req.login(data, function (err) {
            if (err) { return next(err); }
            console.log("User registered and logged in:", data.username);
            sendSuccess(res, 201, { user_id: data.user_id });
          });
        })
>>>>>>> Stashed changes
      });
    });
  });
}

router.post("/signup", signup);

<<<<<<< Updated upstream
router.post("/signin", passport.authenticate('local', {
  successRedirect: "/",
  failureRedirect: "/login",
  failureMessage: true
}));
=======
router.post("/signin", bodyParser.urlencoded(), bodyParser.json(), (req, res, next) => {
  passport.authenticate('local', (err, user) => {
    if (err) {
      if (err === 400) sendError(res, 400);
      else sendError(res, 500);
    } else if (!user) {
      sendError(res, 401, { message: "Invalid username or password" });
    } else {
      req.login(user, function (err) {
        if (err) sendError(res, 500);
        else sendSuccess(res, 204);
      });
    }
  })(req, res, next);
});
>>>>>>> Stashed changes

router.get("/profile", (req, res) => {
  if (!req.isAuthenticated()) return res.status(401).send('Not authenticated');
  let profile = {};
  res.json(profile);
});

<<<<<<< Updated upstream
router.delete('/signout', (req, res) => {
  req.logout();
  res.redirect("/");
=======
router.delete('/signout', (req, res, next) => {
  if (req.user === undefined) {
    sendError(res, 401);
  } else req.logout(function (err) {
    if (err) {
      sendError(res, 500);
    } else {
      sendSuccess(res, 204);
    }
  });
>>>>>>> Stashed changes
});

export default router;
