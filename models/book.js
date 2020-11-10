var mongoose = require("mongoose");
const { Schema } = mongoose;

var bookSchema = mongoose.Schema({
  date: Date,
  time: String, 
  username: String,  
  createdAt:{type:Date,default:Date.now},  
});

var Book = mongoose.model("Book", bookSchema);
module.exports = Book;
