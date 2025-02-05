import express from 'express';
import formidable, {errors as formidableErrors} from 'formidable';
import { repo } from '../repo.mjs';
import { checkLogin, checkPerm } from '../perm.mjs';

let router = express.Router();

router.get("/", checkLogin, (req, res) => {
  repo.getItemTypes((err, data) => {
    repo.errorHandling(err, res, () => {
      res.json(data);
    })
  });
});
router.get("/:typeId", checkLogin, (req, res) => {
  repo.getItemTypesById(req.params.typeId, (err, data) => {
    repo.errorHandling(err, res, () => {
      res.json(data);
    })
  });
});
router.post("/", checkPerm(1), (req, res) => {
  const form = formidable({});
  form.parse(req, (err, fields, files) => {
    if (err) {
      res.status(500).send("500 Internal Server Error");
      return;
    }
    repo.addItemType(req, fields, (err, data) => {
      repo.errorHandling(err, res, () => {
        res.json(data);
      })
    });
  })
});
router.put("/:typeId", checkPerm(2), (req, res) => {
  const form = formidable({});
  form.parse(req, (err, fields, files) => {
    if (err) {
      res.status(500).send("500 Internal Server Error");
      return;
    }
    repo.updateItemType(req, req.params.typeId, fields, (err, data) => {
      repo.errorHandling(err, res, () => {
        res.json(data);
      })
    });
  })
});
router.delete("/:typeId", checkPerm(3), (req, res) => {
  repo.deleteItemType(req, req.params.typeId, (err, data) => {
    repo.errorHandling(err, res, () => {
      res.json(data);
    })
  });
});

export default router;