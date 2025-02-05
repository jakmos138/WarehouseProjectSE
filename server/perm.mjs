import { repo } from './repo.mjs';

checkLogin = (req, res, next) => {
    if (req.user === undefined) res.status(401).send("401 Unauthorized");
    next();
}

checkPerm = function(permId) {
    return (req, res, next) => {
        if (req.user === undefined) res.status(401).send("401 Unauthorized");
        repo.getUserPermissions(req.user.user_id, (perms) => {
            if (perms.indexOf(permId) >= 0) next();
            else res.status(403).send("403 Forbidden");
        });
    }
}

export { checkPerm };