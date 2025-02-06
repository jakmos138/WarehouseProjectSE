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
        sendSuccess(res, 200, data);
      })
    });
  })
});
router.delete("/:typeId", checkPerm(3), (req, res) => {
  repo.deleteItemType(req, req.params.typeId, (err, data) => {
    repo.errorHandling(err, res, () => {
      sendSuccess(res, 204);
    })
  });
});

router.post("/:typeId/props", checkPerm(2), (req, res) => { // add property to item type
  const form = formidable({});
  form.parse(req, (err, fields, files) => {
    if (err) {
      sendError(res, 500);
      return;
    }
    let formData = secondaryParseFields(fields, "name", "description", "type");  
    repo.addItemTypeProperty(req, req.params.typeId, formData, (err, data) => {
      repo.errorHandling(err, res, () => {
        sendSuccess(res, 201, data);
      })
    });
  });
});

router.put("/props/:propId", checkPerm(2), (req, res) => { // edit property of item type
  const form = formidable({});
  form.parse(req, (err, fields, files) => {
    if (err) {
      sendError(res, 500);
      return;
    }
    let formData = secondaryParseFields(fields, "name", "description");  
    repo.updateItemTypeProperty(req, req.params.propId, formData, (err, data) => {
      repo.errorHandling(err, res, () => {
        sendSuccess(res, 200, data);
      })
    });
  });
});

router.delete("/props/:propId", checkPerm(2), (req, res) => {
  repo.deleteItemTypeProperty(req, req.params.propId, (err, data) => {
    repo.errorHandling(err, res, () => {
      sendSuccess(res, 204);
    })
  });
});

export default router;