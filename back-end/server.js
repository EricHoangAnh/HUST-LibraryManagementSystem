const express = require("express");
const documentRouter = require('./routes/documentRoutes')
const app = express();
const port = 8080;
const connectDatabase = require("./service/db");

app.get("/", (req, res) => {
  res.send("Hello");
});
app.use(express.json());
app.use("/", documentRouter)
app.listen(port, async () => {
  await connectDatabase();
  console.log(`App is running on port ${port}!`);
});
