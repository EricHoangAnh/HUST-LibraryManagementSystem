const Request = require("../model/requestModel");
const { getBucket } = require("../service/db");

let uploadedFile

// Get all request
exports.getAllRequests = async (req, res) => {
  await Request.find()
    .then((request) => {
      res.send(request);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ message: err || "Fail to get all request !!!" });
    });
};

// Add a new request
exports.createRequest = async (req, res) => {
  if (!req.body) {
    res.status(400).send({ message: "Request is empty !!!" });
    return;
  }
  try {
    const request = new Request({
      documentCode: req.body.documentCode,
      documentTypeId: req.body.documentTypeId,
      name: req.body.name,
      file: req.body.file,
      author: req.body.author,
      description: req.body.description,
      photo: req.body.photo,
      userId: req.body.userId,
      docId: req.body.docId,
      createdAt: req.body.createdAt,
      status: 1

    });
    await request.save();
    res.status(200).send("Tạo document và tải lên file thành công");
  } catch (err) {
    console.log(err);
  }
}; 

exports.getRequestById = async (req, res) => {
    const requestId = ObjectId(req.params.id);
    try { 
      const request = await Request.findById(requestId); // Tìm Request trong MongoDB theo ID
  
      if (!request) {
        // Nếu không tìm thấy Request, trả về lỗi hoặc thông báo không tìm thấy
        return res.status(404).json({ message: "Request not found" });
      }
  
      // Nếu tìm thấy Request, trả về Request đã tìm thấy
      res.json(request);
    } catch (error) {
      // Xử lý lỗi trong quá trình tìm kiếm Request
      res.status(500).json({ message: "Server error" });
    }
  };

// Update a request
exports.updateRequest = (req, res) => {
  if (!req.body) {
    res.status(400).send({ message: "Request is empty !!!" });
    return;
  }
  const id = req.params.id;
  try {
    Request.findByIdAndUpdate(id, req.body, { new: true }).then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot find request with id ${id} !!!`,
        });
      } else {
        res.status(200).send(data);
      }
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: err || `Fail to update request with id: ${id} !!!`,
    });
  }
};

// Delete a request
exports.deleteRequest = (req, res) => {
  if (!req.body) {
    res.status(400).send({ message: "Request is empty !!!" });
    return;
  }
  const id = req.params.id;
  Request.findByIdAndDelete(id)
    .then((data) => {
      if (!data) { 
        res.status(404).send({ message: `Cannot find request with id ${id}` });
      } else {
        res
          .status(200)
          .send({ message: "Request has been delete successfully" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        message: err || `Fail to delete request with id: ${id} !!!`,
      });
    });
};

exports.userDeleteRequest= async (req, res) => {
  if (!req.body) {
    res.status(400).send({ message: "Request is empty !!!" });
    return;
  }
  const filter = { _id: req.body.reqId };
  debugger
  try {
    console.log('reqId: ', req.body.reqId) 
    const data = await Request.findOneAndDelete(filter);
    console.log(data)
    if (!data) {
      res.status(404).send({ message: `Cannot find document with id` });
    } else {
      res.status(200).send(data);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: err || `Fail to delete document with id: !!!`,
    });
  }
};

exports.uploadedFile = (req, res) => {
    uploadedFile = req.file;
    console.log("uploadFile: ", uploadedFile);
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