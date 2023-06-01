const express = require("express");
const cors = require("cors");
// const fs = require("fs");
// const multer = require("multer");
const documentRouter = require("./routes/documentRoutes");
const studentRouter = require("./routes/studentRoutes");
const fileRouter = require("./routes/filesRoutes")
const app = express();
const port = 8000;
const {connectDatabase} = require("./service/db");

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
// app.post("/upload", upload.single("file"), (req, res) => {
//   res.status(200).send("File uploaded successfully");
// });
app.use("/", documentRouter);
app.use("/", studentRouter);
app.use("/", fileRouter);
app.listen(port, async () => {
  await connectDatabase();
  console.log(`App is running on port ${port}!`);
});
