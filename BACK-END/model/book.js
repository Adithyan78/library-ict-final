const mongoose = require('mongoose');
var express = require('express');
const app = express();


// Define the schema
const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  year: { type: Number, required: true },
  genre: { type: String, required: true },
  desc:{type:String, required: true },
  isbn: { type: Number, required: true },
  imgurl: { type: String, required: true },
  price:{type: Number, required: true},
  rented: { type: Boolean, default: false } ,
  rentedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },// Added rented field
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }],
  comments: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'user' }, // Assuming user is an ObjectId referencing a User
      text: String,
      timestamp: { type: Date, default: Date.now }
    }
  ],
});

// Create the model
const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
