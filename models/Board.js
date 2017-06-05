var mongoose = require("mongoose");

var boardSchema = mongoose.Schema({
 name:{type:String, required:true, unique:true},
 title:{type:String},
 content:{type:String}
});

var board = mongoose.model("board", boardSchema);

module.exports = board;
