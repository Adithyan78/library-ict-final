var mongoose = require('mongoose');
var express = require('express');
const app = express();


// Assuming your MongoDB connection is established somewhere else
// mongoose.connect(...); 

// Define the schema and model as you've shown
const userschema =new mongoose.Schema({
    firstName:String,
    lastName :String,
    age:Number,
    place:String,
    Email: String,
    Password: String,
    likedBooks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }],
    rentedBooks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }], // Reference to Book model
    
});

    
    // other user fields
    
 



const usermodel = mongoose.model("user", userschema);

module.exports = usermodel;