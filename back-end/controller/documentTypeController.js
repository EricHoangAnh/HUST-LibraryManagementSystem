const DocumentType = require("../model/documentTypeModel");

exports.getAllTypes = async (req, res) => {
  await DocumentType.find()
    .then((type) => {
      res.send(type);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ message: err || "Fail to get all types !!!" });
    });
};

exports.createType = async (req, res) => {
  if (!req.body) {
    res.status(400).send({ message: "Request is empty !!!" });
    return;
  }
  try {
    const type = new DocumentType({
      typeTitle: req.body.typeTitle,
      note: req.body.note,
    });
    type
      .save(type)
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

exports.updateType = (req, res) => {
  if (!req.body) {
    res.status(400).send({ message: "Request is empty !!!" });
    return;
  }
  const id = req.params.id;
  try {
    DocumentType.findByIdAndUpdate(id, req.body, { new: true }).then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot find type with id ${id} !!!`,
        });
      } else {
        res.status(200).send(data);
      }
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: err || `Fail to update type with id: ${id} !!!`,
    });
  }
};
