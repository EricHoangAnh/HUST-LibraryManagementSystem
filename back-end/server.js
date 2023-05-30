const express = require("express");
const cors = require("cors");
const fs = require("fs");
const multer = require("multer");
const documentRouter = require("./routes/documentRoutes");
const studentRouter = require("./routes/studentRoutes");
const { default: mongoose } = require("mongoose");
const { GridFsStorage } = require("multer-gridfs-storage");
const Grid = require("gridfs-stream");
const uri =
  "mongodb+srv://hoang7301:vietxungg73@library-system.dcwhpui.mongodb.net/library-system?retryWrites=true&w=majority";
const app = express();
let bucket;
mongoose.connection.on("connected", () => {
  var db = mongoose.connections[0].db;
  bucket = new mongoose.mongo.GridFSBucket(db, {
    bucketName: "newBucket",
  });
  // console.log(bucket);
});

const storage = new GridFsStorage({
  url: uri,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      const filename = file.originalname;
      const fileInfo = {
        filename: filename,
        bucketName: "newBucket",
      };
      resolve(fileInfo);
    });
  },
});
const upload = multer({
  storage,
});
const port = 8000;
const connectDatabase = require("./service/db");

app.get("/", (req, res) => {
  res.send("Hello");
});
app.use(express.json());
app.use(cors());
//to parse json content
app.use(express.json());
//to parse body from url
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.get("/fileinfo/:filename", async (req, res) => {
  const filename = req.params.filename;
  try {
    const downloadStream = bucket.openDownloadStreamByName(filename);
    const writeStream = fs.createWriteStream(`../${filename}`);

    downloadStream.pipe(writeStream);

    downloadStream.on("end", () => {
      console.log("Tập tin đã được tải xuống thành công!");
      res.status(200).send("Tập tin đã được tải xuống thành công!");
    });

    downloadStream.on("error", (error) => {
      console.error("Lỗi khi tải xuống tập tin:", error);
    });
  } catch (error) {
    console.log(error);
  }
});
app.post("/upload", upload.single("file"), (req, res) => {
  res.status(200).send("File uploaded successfully");
});
app.use("/", documentRouter);
app.use("/", studentRouter);
app.listen(port, async () => {
  await connectDatabase();
  console.log(`App is running on port ${port}!`);
});
