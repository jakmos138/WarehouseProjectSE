import { repo } from './repo.mjs';
import { sendError } from './resutil.mjs';

const checkLogin = (req, res, next) => {
  if (req.user === undefined) sendError(res, 401, "401 Unauthorized");
  else next();
}

const checkPerm = function(permId) {
  return (req, res, next) => {
    if (req.user === undefined) sendError(res, 401, "401 Unauthorized");
    else repo.getUserPermissions(req.user.user_id, (err, perms) => {
      if (err) sendError(res, 500, "500 Internal Server Error");
      else if (perms.indexOf(permId) >= 0) next();
      else sendError(res, 403, "403 Forbidden");
    });
  }
}

export { checkLogin, checkPerm };