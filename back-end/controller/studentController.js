const res = require("express/lib/response");

const Student = require("../model/studentModel");

// Get all students
exports.getAllStudents = async (req, res) => {
  await Student.find()
    .then((student) => {
      res.send(student);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ message: err || "Fail to get all students !!!" });
    });
};

// Add a new student
exports.createStudent = (req, res) => {
  if (!req.body) {
    res.status(400).send({ message: "Request is empty !!!" });
    return;
  }
  try {
    const student = new Student({
      studentCode: req.body.studentCode,
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      address: req.body.address
    });
    student
      .save(student)
      .then((data) => {
        res.status(200).send(data);
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (err) {
    console.log(err);
  }
};

// Update a student
exports.updateStudent = (req, res) => {
  if (!req.body) {
    res.status(400).send({ message: "Request is empty !!!" });
    return;
  }
  const id = req.params.id;
  try {
    Student.findByIdAndUpdate(id, req.body, { new: true }).then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot find student with id ${id} !!!`,
        });
      } else {
        res.status(200).send(data);
      }
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: err || `Fail to update student with id: ${id} !!!`,
    });
  }
};

// Delete a student
exports.deleteStudent = (req, res) => {
  if (!req.body) {
    res.status(400).send({ message: "Request is empty !!!" });
    return;
  }
  const id = req.params.id;
  Student.findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: `Cannot find student with id ${id}` });
      } else {
        res
          .status(200)
          .send({ message: "Student has been delete successfully" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        message: err || `Fail to delete student with id: ${id} !!!`,
      });
    });
};
