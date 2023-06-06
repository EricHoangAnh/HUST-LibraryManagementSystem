const path = require("path");
const fs = require("fs");
const mongoose = require("mongoose");
const Document = require("../model/documentModel");
const { getBucket } = require("../service/db");
const Grid = require('gridfs-stream');

const uri =
  "mongodb+srv://hoang7301:vietxungg73@library-system.dcwhpui.mongodb.net/library-system?retryWrites=true&w=majority";

let isSameFile;
let uploadedFile;
const isSameCurrentFile = async (fileId, req, res) => {
  const bucket = getBucket();
  const currentFile = await bucket.find({ _id: fileId });
  console.log(currentFile);
  const filename = req.file.filename;
  const chunkSize = req.file.chunkSize;
  const size = req.file.size;
  const contentType = req.file.contentType;
  const checkSameFile = false;
  if (
    filename === currentFile.filename &&
    chunkSize === currentFile.chunkSize &&
    size === currentFile.size &&
    contentType === currentFile.contentType
  ) {
    checkSameFile = true;
  }
  if (!checkSameFile) {
    console.log("File khác nhau");
    await bucket.delete(fileId);
    isSameFile = false;
  } else {
    console.log("File giống nhau");
    isSameFile = true;
  }
};

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
exports.createDocument = async (req, res) => {
  if (!req.body) {
    res.status(400).send({ message: "Request is empty !!!" });
    return;
  }
  try {
    console.log(uploadedFile);
    // Tạo một bản ghi mới với thông tin document và fileId
    const newDocument = new Document({
      documentCode: req.body.documentCode,
      documentTypeId: req.body.documentTypeId,
      name: req.body.name,
      file: uploadedFile,
      author: req.body.author,
      description: req.body.description,
      photo: req.body.photo,
    });

    await newDocument.save();
    console.log("Đã tải file lên mongoDB");

    res.status(200).send("Tạo document và tải lên file thành công");
  } catch (err) {
    console.log(err);
  }
};

// Update a document
exports.updateDocument = async (req, res) => {
  if (!req.body) {
    res.status(400).send({ message: "Request is empty !!!" });
    return;
  }
  const id = req.params.id;
  const fileId = req.file.id;
  try {
    console.log(fileId);
    await isSameCurrentFile(fileId, req, res);
    Document.findByIdAndUpdate(
      id,
      { ...req.body, file: req.file },
      { new: true }
    ).then((data) => {
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
exports.getIsSameFile = () => {
  return isSameFile;
};

exports.uploadedFile = (req, res) => {
  uploadedFile = req.file;
  console.log(uploadedFile);
  res.status(200).send("Tải lên file thành công");
};

exports.downloadFile = async (req, res) => {
  const bucket = await getBucket();
  const fileId = req.params.fileId;
  try {
    const downloadStream = bucket.openDownloadStream(new mongoose.Types.ObjectId(fileId));

    // Thiết lập các header để trình duyệt nhận biết và tải xuống file PDF
    res.set({
      'Content-Type': 'application/pdf', 
      'Content-Disposition': `attachment; filename="${fileId}"`,
    });

    // Đọc dữ liệu từ stream và gửi về trình duyệt
    downloadStream.pipe(res);

  } catch (error) {
    console.log(error);
  }
};
