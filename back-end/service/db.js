const { default: mongoose } = require("mongoose");
const config = require("../config/config");
const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");
const Grid = require("gridfs-stream");
const uri =
  "mongodb+srv://hoang7301:vietxungg73@library-system.dcwhpui.mongodb.net/library-system?retryWrites=true&w=majority";
async function connectDatabase() {
  try {
    await mongoose.connect(uri, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });

    // console.log(documents);
  } catch (error) {
    console.dir;
    console.log(error);
  }
  // finally {
  //   // Ensures that the client will close when you finish/error
  //   await mongoose.connection.close();
  //   console.log("Connection has been closed !")
  // }
}
module.exports = connectDatabase;
