import express from 'express';
import formidable, {errors as formidableErrors} from 'formidable';
import { repo } from '../repo.mjs';
import { checkLogin, checkPerm } from '../perm.mjs';
import { sendSuccess, sendError } from '../resutil.mjs';

let router = express.Router();

router.get("/", checkLogin, (req, res) => {
  repo.getItems((err, data) => {
    repo.errorHandling(err, res, () => {
      sendSuccess(res, 200, data);
    })
  });
});
router.get("/:itemId", checkLogin, (req, res) => {
  repo.getItemById(req.params.itemId, (err, data) => {
    repo.errorHandling(err, res, () => {
      sendSuccess(res, 200, data);
    })
  });
});
router.post("/", checkPerm(4), (req, res) => {
  const form = formidable({});
  form.parse(req, (err, fields, files) => {
    if (err) {
      sendError(res, 500, "500 Internal Server Error");
      return;
    }
    let formData = {
      item_id: fields.item_id[0],
      location_id: fields.location_id[0],
      details: fields.details[0],
      quantity: fields.quantity[0],
      restricted_level: fields.restricted_level[0],
    };
    repo.addItem(req, formData, (err, data) => {
      repo.errorHandling(err, res, () => {
        sendSuccess(res, 201, data);
      })
    });
  })
});
router.put("/:itemId", checkPerm(5), (req, res) => {
  const form = formidable({});
  form.parse(req, (err, fields, files) => {
    if (err) {
      sendError(res, 500, "500 Internal Server Error");
      return;
    }
    let formData = {
      item_id: fields.item_id[0],
      location_id: fields.location_id[0],
      details: fields.details[0],
      quantity: fields.quantity[0],
      restricted_level: fields.restricted_level[0],
    };
    repo.updateItem(req, req.params.itemId, formData, (err, data) => {
      repo.errorHandling(err, res, () => {
        sendSuccess(res, 204, data);
      })
    });
  })
});
router.delete("/:itemId", checkPerm(6), (req, res) => {
  repo.deleteItem(req, req.params.itemId, (err, data) => {
    repo.errorHandling(err, res, () => {
      sendSuccess(res, 204, data);
    })
  });
});

export default router;