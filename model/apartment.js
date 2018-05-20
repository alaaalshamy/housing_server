var mongoose = require('mongoose');
var Schema = mongoose.Schema;
ObjectId = Schema.ObjectId;

var  apartment= new Schema({
    _id:  {type:ObjectId  ,auto:true},
    rooms:  Number,
    description: String,
    address:{
        long:String,
        lat:String
    },
    price:Number,
    landlord_fk:[{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'landlord'}]
    
  });
  mongoose.model("apartment",apartment);