import express from 'express';
import passport from 'passport';
import passport_local from 'passport-local';
const LocalStrategy = passport_local.Strategy;
import crypto from 'node:crypto';
import bodyParser from 'body-parser';
import formidable, {errors as formidableErrors} from 'formidable';
import { secondaryParseFields } from "../fieldparse.mjs"
import { repo } from '../repo.mjs';
import { sendSuccess, sendError } from '../resutil.mjs';

passport.use(new LocalStrategy(
  {
    usernameField: "email",
    passwordField: "password"
  },
  function(email, password, cb) {
    repo.getUserByEmail(email, function(err, user) {
      if (err) { return cb(err); }
      if (!user) {
        return cb(null, false);
      }
      /*crypto.pbkdf2(password, "alts", 2 ** 18, 64, 'sha256', function(err, hashed) {
        if (err) { return cb(err); }
        if (!crypto.timingSafeEqual(user.pwhash, hashed)) {
          return cb(null, false, { message: "Incorrect username or password." });
        }
        return cb(null, user);
      });*/
      if (password === user.password) return cb(null, user);
      else return cb(null, false);
    });
  }
));

passport.serializeUser(function(user, cb) {
  cb(null, user.user_id);
});

passport.deserializeUser(function(id, cb) {
  repo.getUserById(id, function(err, user) {
    if (err) return cb(err);
    if (!user) return cb("Error - no such user"); // how is this cb passed?
    return cb(null, user);
  });
});

let router = express.Router();

let signup = function(req, res, next) {
  const form = formidable({});
  form.parse(req, (err, fields, files) => {
    let formData = secondaryParseFields(fields, "username", "email", "password");
    console.log("Signup request received:", formData.username);
    crypto.pbkdf2(formData.password, 'alts', 2**18, 64, 'sha256', function(err, hashed) {
      if (err) { return next(err); }
      
      repo.addUser(req, formData, function(err, data) {
        repo.errorHandling(err, res, () => {
          req.login(data, function(err) {
            if (err) { return next(err); }
            console.log("User registered and logged in:", data.username);
            sendSuccess(res, 201, { user_id: data.user_id });
          });
        })
      });
    });
  })  
}

router.post("/signup", signup);

/*router.post("/signin", passport.authenticate('local', {
  successRedirect: "/",
  failureRedirect: "/login",
  failureMessage: true
}));*/

router.post("/signin", bodyParser.urlencoded(), (req, res, next) => {
  passport.authenticate('local', (err, user) => {
    if (err) {
      sendError(res, 500);
    }
    else if (!user) {
      sendError(res, 401);
    }
    else {
      req.login(user, function(err) {
        if (err) sendError(res, 500);
        else sendSuccess(res, 204);
      })      
    }
  })(req, res, next);
});

router.get("/profile", (req, res) => {
  if (!req.isAuthenticated()) return sendError(res, 401);
  let profile = {};
  res.json(profile);
});

router.delete('/signout', (req, res, next) => {
  if (req.user === undefined) {
    sendError(res, 401);
  }
  else req.logout(function(err) {
    if (err) { 
      sendError(res, 500);
    }
    else {
      sendSuccess(res, 204);
    }
  });
});

export default router;