const { MongoClient, ServerApiVersion } = require("mongodb");

const uri =
  "mongodb+srv://hoang7301:vietxungg73@library-system.dcwhpui.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
const config =  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}

module.exports = config