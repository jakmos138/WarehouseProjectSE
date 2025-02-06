import express from 'express';
import formidable, {errors as formidableErrors} from 'formidable';
import { secondaryParseFields } from "../fieldparse.mjs"
import { repo } from '../repo.mjs';
import { checkLogin, checkPerm } from '../perm.mjs';
import { sendSuccess, sendError } from '../resutil.mjs';

let router = express.Router();

router.get("/", checkLogin, (req, res) => {
  repo.getLocations((err, data) => {
    repo.errorHandling(err, res, () => {
      sendSuccess(res, 200, data);
    })
  });
});
router.get("/:locId", checkLogin, (req, res) => {
  repo.getLocationById(req.params.locId, (err, data) => {
    repo.errorHandling(err, res, () => {
      sendSuccess(res, 200, data);
    })
  });
});
router.post("/", checkPerm(7), (req, res) => {
  const form = formidable({});
  form.parse(req, (err, fields, files) => {
    if (err) {
      sendError(res, 500);
      return;
    }
    let formData = secondaryParseFields(fields, "name", "description", "restricted_level");
    repo.addLocation(req, formData, (err, data) => {
      repo.errorHandling(err, res, () => {
        sendSuccess(res, 201, data);
      })
    });
  })
});
router.put("/:locId", checkPerm(8), (req, res) => {
  const form = formidable({});
  form.parse(req, (err, fields, files) => {
    if (err) {
      sendError(res, 500);
      return;
    }
    let formData = secondaryParseFields(fields, "name", "description", "restricted_level");  
    repo.updateLocation(req, req.params.locId, formData, (err, data) => {
      repo.errorHandling(err, res, () => {
        sendSuccess(res, 200, data);
      })
    });
  })
});
router.delete("/:locId", checkPerm(9), (req, res) => {
  repo.deleteLocation(req, req.params.locId, (err, data) => {
    repo.errorHandling(err, res, () => {
      sendSuccess(res, 204, data);
    })
  });
});

export default router;