const express = require("express");
const documentTypeController = require("../controller/documentTypeController");
const router = express.Router();

router
  .route("/document-type")
  .get(documentTypeController.getAllTypes)
  .post(documentTypeController.createType);

router
  .route("/document-type/:id")
  .put(documentTypeController.updateType)
  .delete(documentTypeController.deleteDocumentType);
 
module.exports = router;    