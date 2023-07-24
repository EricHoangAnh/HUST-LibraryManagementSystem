const express = require("express");
const requestController = require("../controller/requestController");
const multer = require("multer");
const { storage } = require("../service/db");
const router = express.Router();
const upload = multer({
  storage,
});

router
  .route("/request")
  .get(requestController.getAllRequests)
  .post(upload.single("file"), requestController.createRequest)
  .delete(requestController.userDeleteRequest)
  ;

router
  .route("/request/:id")
  .get(requestController.getRequestById) 
  .put(upload.single("file"), requestController.updateRequest)
  .delete(requestController.deleteRequest);

// router
//   .route("/user-upload")
//   .post(upload.single("file"), requestController.uploadedFile);

  router.route("/download/:fileId").get(requestController.downloadFile);

module.exports = router;  