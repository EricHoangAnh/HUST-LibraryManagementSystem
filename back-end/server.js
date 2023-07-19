const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');
const documentRouter = require("./routes/documentRoutes");
const documentTypeRouter = require("./routes/documentTypeRoute")
const studentRouter = require("./routes/studentRoutes");
const userRouter = require("./routes/userRoutes");
const requestRouter = require("./routes/requestRoutes")
const userDocumentRouter = require("./routes/userDocumentRoutes")
const app = express();
const port = 8000;
const {connectDatabase} = require("./service/db");

app.get("/", (req, res) => {
  res.send("Hello");
});
// app.use(express.json());
app.use(cors());
//to parse body from url
app.use(bodyParser.json({ limit: '100mb' }));
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));

app.use("/", documentRouter);
app.use("/", documentTypeRouter);
app.use("/", studentRouter);
app.use("/", userRouter);
app.use("/", requestRouter);
app.use("/", userDocumentRouter)
app.listen(port, async () => {
  await connectDatabase();
  console.log(`App is running on port ${port}!`);
});
