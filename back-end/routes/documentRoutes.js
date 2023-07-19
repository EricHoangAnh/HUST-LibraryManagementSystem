const express = require("express");
const documentController = require("../controller/documentController");
const multer = require("multer");
const { storage } = require("../service/db");
const router = express.Router();
const upload = multer({
  storage,
});

router
  .route("/document")
  .get(documentController.getAllDocuments)
  .post(upload.single("file"), documentController.createDocument);

router
  .route("/document/:id")
  .get(documentController.getDocumentById)
  .put(upload.single("file"), documentController.updateDocument)
  .delete(documentController.deleteDocument);
router
  .route("/user-action-document")
  .put(upload.single("file"), documentController.userUpdateDocument)
  .delete(documentController.userDeleteDocument);

router
  .route("/upload")
  .post(upload.single("file"), documentController.uploadedFile);

router
  .route("/request-document")
  .post(documentController.createDocumentFromRequest);

router.route("/download/:fileId").get(documentController.downloadFile);
module.exports = router;
