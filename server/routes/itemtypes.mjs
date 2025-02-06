import express from 'express';
import formidable, {errors as formidableErrors} from 'formidable';
import { secondaryParseFields } from "../fieldparse.mjs"
import { repo } from '../repo.mjs';
import { checkLogin, checkPerm } from '../perm.mjs';
import { sendSuccess, sendError } from '../resutil.mjs';

let router = express.Router();

router.get("/", checkLogin, (req, res) => {
  repo.getItemTypes((err, data) => {
    repo.errorHandling(err, res, () => {
      sendSuccess(res, 200, data);
    })
  });
});
router.get("/:typeId", checkLogin, (req, res) => {
  repo.getItemTypesById(req.params.typeId, (err, data) => {
    repo.errorHandling(err, res, () => {
      sendSuccess(res, 200, data);
    })
  });
});
router.post("/", checkPerm(1), (req, res) => {
  const form = formidable({});
  form.parse(req, (err, fields, files) => {
    if (err) {
      sendError(res, 500);
      return;
    }
    let formData = secondaryParseFields(fields, "name", "description", "price", "restricted_level");  
    repo.addItemType(req, formData, (err, data) => {
      repo.errorHandling(err, res, () => {
        sendSuccess(res, 201, data);
      })
    });
  })
});
router.put("/:typeId", checkPerm(2), (req, res) => {
  const form = formidable({});
  form.parse(req, (err, fields, files) => {
    if (err) {
      sendError(res, 500);
      return;
    }
    let formData = secondaryParseFields(fields, "name", "description", "price", "restricted_level");
    repo.updateItemType(req, req.params.typeId, formData, (err, data) => {
      repo.errorHandling(err, res, () => {
        sendSuccess(res, 204, data);
      })
    });
  })
});
router.delete("/:typeId", checkPerm(3), (req, res) => {
  repo.deleteItemType(req, req.params.typeId, (err, data) => {
    repo.errorHandling(err, res, () => {
      sendSuccess(res, 204, data);
    })
  });
});

router.post("/:typeId/props", (req, res) => {
  sendError(res, 501);
});

router.put("/props/:propId", (req, res) => {
  sendError(res, 501);
});

router.delete("/props/:propId", (req, res) => {
  sendError(res, 501);
});

export default router;