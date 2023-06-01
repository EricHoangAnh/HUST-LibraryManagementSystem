const express = require("express");
const fileController = require("../controller/fileController");
const multer = require("multer");
const { storage } = require("../service/db");
const router = express.Router();
const upload = multer({
  storage,
});

router.route("/upload").post(upload.single("file"), fileController.uploadFile);
router.route("/download/:filename").get(fileController.downloadFile);
module.exports = router;
