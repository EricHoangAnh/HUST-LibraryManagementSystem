const res = require("express/lib/response");

const Document = require("../model/documentModel");

// Get all documents
exports.getAllDocuments = async (req, res) => {
  await Document.find()
    .then((document) => {
      res.send(document);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ message: err || "Fail to get all documents !!!" });
    });
};

// Add a new document
exports.createDocument = (req, res) => {
  if (!req.body) {
    res.status(400).send({ message: "Request is empty !!!" });
    return;
  }
  try {
    const document = new Document({
      documentCode: req.body.documentCode,
      name: req.body.name,
      author: req.body.author,
      publishYear: req.body.publishYear,
      documentTypeId: req.body.documentTypeId,
      description: req.body.description,
      photo: req.body.photo,
    });

    document
      .save(document)
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

// Update a document
exports.updateDocument = (req, res) => {
  if (!req.body) {
    res.status(400).send({ message: "Request is empty !!!" });
    return;
  }
  const id = req.params.id;
  try {
    Document.findByIdAndUpdate(id, req.body, { new: true }).then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot find document with id ${id} !!!`,
        });
      } else {
        res.status(200).send(data);
      }
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: err || `Fail to update document with id: ${id} !!!`,
    });
  }
};

// Delete a document
exports.deleteDocument = (req, res) => {
  if (!req.body) {
    res.status(400).send({ message: "Request is empty !!!" });
    return;
  }
  const id = req.params.id;
  Document.findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: `Cannot find document with id ${id}` });
      } else {
        res
          .status(200)
          .send({ message: "Document has been delete successfully" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        message: err || `Fail to delete document with id: ${id} !!!`,
      });
    });
};
