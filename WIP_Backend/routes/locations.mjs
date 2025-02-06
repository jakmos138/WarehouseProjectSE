import express from 'express';
import formidable, {errors as formidableErrors} from 'formidable';
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
      sendError(res, 500, "500 Internal Server Error");
      return;
    }
    let formData = {
      name: fields.name[0],
      description: fields.description[0],
      restricted_level: fields.restricted_level[0],
    };
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
      sendError(res, 500, "500 Internal Server Error");
      return;
    }
    let formData = {
      name: fields.name[0],
      description: fields.description[0],
      restricted_level: fields.restricted_level[0],
    };
    repo.updateLocation(req, req.params.locId, formData, (err, data) => {
      repo.errorHandling(err, res, () => {
        sendSuccess(res, 204, data);
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