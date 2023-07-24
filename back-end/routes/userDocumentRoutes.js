const express = require("express");
const userDocumentController = require("../controller/userDocumentController");
const multer = require("multer");
const { storage } = require("../service/db");
const router = express.Router();
const upload = multer({
  storage,
});

router
  .route("/user-document")
  .get(userDocumentController.getAllDocuments)
  .post(upload.single("file"), userDocumentController.createDocument);

router
  .route("/user-document/:id")
  .get(userDocumentController.getDocumentById)
  .put(upload.single("file"), userDocumentController.updateDocument)
  .delete(userDocumentController.deleteDocument);

router
  .route("/user-upload")
  .post(upload.single("file"), userDocumentController.uploadedFile);


router.route("/download/:fileId").get(userDocumentController.downloadFile);
module.exports = router;