const { default: mongoose } = require("mongoose");
const config= require("../config/config");
const uri =
  "mongodb+srv://hoang7301:vietxungg73@library-system.dcwhpui.mongodb.net/library-system?retryWrites=true&w=majority";
async function connectDatabase() {
  try {
    // app.get("/");
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();
    // // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    // const db = await client.db("library-system");
    await mongoose.connect(uri)
    // const
    // const students = await db.collection("student").find({}).toArray();
    // const librarians = await db.collection("librarian").find({}).toArray();
    // const documents = await db.collection("document").find({}).toArray();

    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
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
module.exports = connectDatabase
