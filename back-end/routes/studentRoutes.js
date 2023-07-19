const express = require("express");
const studentController = require("../controller/studentController");
const router = express.Router();

router
  .route("/student")
  .get(studentController.getAllStudents)
  .post(studentController.createStudent);

router
  .route("/student/:id")
  .put(studentController.updateStudent)
  .delete(studentController.deleteStudent);
module.exports = router;  




