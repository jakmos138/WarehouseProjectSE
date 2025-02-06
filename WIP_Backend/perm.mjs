import { repo } from './repo.mjs';
import { sendError } from './resutil.mjs';

const checkLogin = (req, res, next) => {
  if (req.user === undefined) {
    console.log(`Anonymous user blocked from operation ${req.method} ${req.baseUrl}`);
    sendError(res, 401);
  }
  else next();
}

const checkPerm = function(permId) {
  return (req, res, next) => {
    if (req.user === undefined) {
      console.log(`Anonymous user blocked from operation ${req.method} ${req.baseURL}`);
      sendError(res, 401);
    }
    else repo.getUserPermissions(req.user.user_id, (err, perms) => {
      if (err) sendError(res, 500);
      else if (perms.indexOf(permId) >= 0) next();
      else {
        console.log(`Unauthorized user "${req.user.username}" blocked from operation ${req.method} ${req.baseUrl} (permission ID ${permId})`);
        sendError(res, 403);
      }
    });
  }
}

export { checkLogin, checkPerm };