import express from 'express';
import formidable, {errors as formidableErrors} from 'formidable';
import { repo } from '../repo.mjs';

let router = express.Router();

router.get("/", checkLogin, (req, res) => {
  repo.getLocations((err, data) => {
    repo.errorHandling(err, res, () => {
      res.json(data);
    })
  });
});
router.get("/:locId", checkLogin, (req, res) => {
  repo.getLocationById(req.params.locId, (err, data) => {
    repo.errorHandling(err, res, () => {
      res.json(data);
    })
  });
});
router.post("/", checkPerm(7), (req, res) => {
  const form = formidable({});
  form.parse(req, (err, fields, files) => {
    if (err) {
      next(err);
      return;
    }
    repo.addLocation(req, fields, (err, data) => {
      repo.errorHandling(err, res, () => {
        res.json(data);
      })
    });
  })
});
router.put("/:locId", checkPerm(8), (req, res) => {
  const form = formidable({});
  form.parse(req, (err, fields, files) => {
    if (err) {
      next(err);
      return;
    }
    repo.updateLocation(req, req.params.locId, fields, (err, data) => {
      repo.errorHandling(err, res, () => {
        res.json(data);
      })
    });
  })
});
router.delete("/:locId", checkPerm(9), (req, res) => {
  repo.deleteLocation(req, req.params.locId, (err, data) => {
    repo.errorHandling(err, res, () => {
      res.json(data);
    })
  });
});

export default router;