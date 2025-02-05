import express from 'express';
import formidable, {errors as formidableErrors} from 'formidable';
import { repo } from '../repo.mjs';
import { checkLogin, checkPerm } from '../perm.mjs';

let router = express.Router();

router.get("/", checkLogin, (req, res) => {
  repo.getItems((err, data) => {
    repo.errorHandling(err, res, () => {
      res.json(data);
    })
  });
});
router.get("/:itemId", checkLogin, (req, res) => {
  repo.getItemById(req.params.itemId, (err, data) => {
    repo.errorHandling(err, res, () => {
      res.json(data);
    })
  });
});
router.post("/", checkPerm(4), (req, res) => {
  const form = formidable({});
  form.parse(req, (err, fields, files) => {
    if (err) {
      res.status(500).send("500 Internal Server Error");
      return;
    }
    repo.addItem(req, fields, (err, data) => {
      repo.errorHandling(err, res, () => {
        res.json(data);
      })
    });
  })
});
router.put("/:itemId", checkPerm(5), (req, res) => {
  const form = formidable({});
  form.parse(req, (err, fields, files) => {
    if (err) {
      res.status(500).send("500 Internal Server Error");
      return;
    }
    repo.updateItem(req, req.params.itemId, fields, (err, data) => {
      repo.errorHandling(err, res, () => {
        res.json(data);
      })
    });
  })
});
router.delete("/:itemId", checkPerm(6), (req, res) => {
  repo.deleteItem(req, req.params.itemId, (err, data) => {
    repo.errorHandling(err, res, () => {
      res.json(data);
    })
  });
});

export default router;