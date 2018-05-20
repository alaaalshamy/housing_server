var mongoose = require('mongoose');
var Schema = mongoose.Schema;
ObjectId = Schema.ObjectId;

var  tenant= new Schema({
    _id:  {type:ObjectId  ,auto:true},
    name:  String,
    phone: String,
    email:String,
    password:String,   
    apartment_fk:
    [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'apartment'
    }
    ]
    
  });
  mongoose.model("tenant",tenant);