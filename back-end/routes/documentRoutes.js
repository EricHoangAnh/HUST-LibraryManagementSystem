const express = require("express");
const documentController = require("../controller/documentController");
const router = express.Router();

router
  .route("/document")
  .get(documentController.getAllDocuments)
  .post(documentController.createDocument);

router
  .route("/document/:id")
  .put(documentController.updateDocument)
  .delete(documentController.deleteDocument);
module.exports = router;
