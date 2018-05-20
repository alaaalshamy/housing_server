var mongoose = require('mongoose');
var Schema = mongoose.Schema;
ObjectId = Schema.ObjectId;

var  communicate= new Schema({
    text:  String,
    action: String,   
    _id:  {type:ObjectId  ,auto:true},
    landlord_fk:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"landlord",
    },
    tenant_fk:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"tenant",
    },
    
  });
  mongoose.model("communicate",communicate);