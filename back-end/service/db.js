const fs = require("fs");
const { createModel } = require("mongoose-gridfs");
const { default: mongoose } = require("mongoose");
const { GridFsStorage } = require("multer-gridfs-storage");
const uri =
  "mongodb+srv://hoang7301:vietxungg73@library-system.dcwhpui.mongodb.net/library-system?retryWrites=true&w=majority";
let bucket;


function storageBucket() {
  mongoose.connection.on("connected", () => {
    var db = mongoose.connections[0].db;
    bucket = new mongoose.mongo.GridFSBucket(db, {
      bucketName: "documentFiles",
    });
    // console.log(bucket);
  });
}
const storage = new GridFsStorage({
  url: uri,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      const filename = file.originalname;
      const fileInfo = {
        filename: filename,
        bucketName: "documentFiles",
      };
      resolve(fileInfo);
    });
  },
});
function getBucket() {
  return bucket;
}
async function connectDatabase() {
  try {
    mongoose.connect(uri, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    await storageBucket();

    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
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
module.exports = { connectDatabase, getBucket, storage };
