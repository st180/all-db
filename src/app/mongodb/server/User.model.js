var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
   id:Number,
   name:String,
   email:String,
   city:String
});
module.exports = mongoose.model('user', userSchema); 
