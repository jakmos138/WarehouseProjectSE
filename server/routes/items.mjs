import express from 'express';
import formidable, {errors as formidableErrors} from 'formidable';
import { secondaryParseFields } from "../fieldparse.mjs"
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
      sendError(res, 500);
      return;
    }
    let formData = secondaryParseFields(fields, "item_id", "location_id", "details", "quantity", "restricted_level");
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
      sendError(res, 500);
      return;
    }
    let formData = secondaryParseFields(fields, "location_id", "details", "quantity", "restricted_level");
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

router.put("/:itemId/props/:propertyId", (req, res) => {
  sendError(res, 501);
});

router.delete("/:itemId/props/:propertyId", (req, res) => {
  sendError(res, 501);
});

export default router;