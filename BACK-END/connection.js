

var mongoose = require('mongoose');

mongoose.connect("mongodb+srv://user2005:userorgin@cluster1.s3wkaoe.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1")
.then(()=>{
    console.log("connected to db");
})
    .catch((error)=>{
        console.log(error)
    }
);