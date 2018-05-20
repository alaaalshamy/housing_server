var mongoose = require('mongoose');
var Schema = mongoose.Schema;
ObjectId = Schema.ObjectId;

var  landlord= new Schema({
     _id:  {type:ObjectId  ,auto:true},
    name:  String,
    email: String,
    password: String,
    
  });
  mongoose.model("landlord",landlord);