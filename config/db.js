// database local connection
var mongoose = require('mongoose');
// mongodb+srv://admin:<password>@cluster0.ko9v1.mongodb.net/myFirstDatabase?retryWrites=true&w=majority

// const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://admin:admin@cluster07.dtrwf.mongodb.net/test?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connect(uri,{ useNewUrlParser: true },{ useUnifiedTopology: true },{useNindexed: true}).then(()=>{
    console.log('`Connection Successfull');
}).catch((err)=>{
    console.log("connection to database failed!");
})


