
const mongoose = require("mongoose");
const UserDocument = require("../model/userDocumentModel");
const { getBucket } = require("../service/db");


const uri =
  "mongodb+srv://hoang7301:vietxungg73@library-system.dcwhpui.mongodb.net/library-system?retryWrites=true&w=majority";

let isSameFile;
let uploadedFile; 

 
// Get all documents
exports.getAllDocuments = async (req, res) => {
  await UserDocument.find()
    .then((document) => {
      // console.log(document)
      res.send(document);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ message: err || "Fail to get all documents !!!" });
    });
};
exports.getDocumentById = async (req, res) => {
  const documentId = ObjectId(req.params.id);
  try {
    const document = await UserDocument.findById(documentId); // Tìm document trong MongoDB  theo ID

    if (!document) {
      // Nếu không tìm thấy document, trả về lỗi hoặc thông báo không tìm thấy
      return res.status(404).json({ message: "Document not found" });
    } 

    // Nếu tìm thấy document, trả về document đã tìm thấy
    res.json(document);
  } catch (error) {
    // Xử lý lỗi trong quá trình tìm kiếm document
    res.status(500).json({ message: "Server error" });
  }
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
    const newDocument = new UserDocument({
      documentCode: req.body.documentCode,
      documentTypeId: req.body.documentTypeId,
      name: req.body.name,
      file: uploadedFile, 
      author: req.body.author,
      description: req.body.description,
      photo: req.body.photo,
      userId: req.body.userId,
      createdAt: req.body.createdAt,
      lastUpdated: req.body.lastUpdated
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
  try { 
    UserDocument.findByIdAndUpdate(
      id,
      { ...req.body, file: uploadedFile ? uploadedFile : req.body.file  }, 
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
  UserDocument.findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: `Cannot find document with id ${id}` });
      } else {
        res
          .status(200)
          .send(data);
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
    const downloadStream = bucket.openDownloadStream(
      new mongoose.Types.ObjectId(fileId)
    );

    // Thiết lập các header để trình duyệt nhận biết và tải xuống file PDF
    res.set({ 
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${fileId}"`,
    });

    // Đọc dữ liệu từ stream và gửi về trình duyệt
    downloadStream.pipe(res);
  } catch (error) {
    console.log(error);
  }
};
 