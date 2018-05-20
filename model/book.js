var mongoose = require('mongoose');
var Schema = mongoose.Schema;
ObjectId = Schema.ObjectId;

var  book= new Schema({
    _id:  {type:ObjectId  ,auto:true},
    action: String,   
    apartment_fk:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"apartment",
    },
    tenant_fk:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"tenant",
    },
    
  });
  mongoose.model("book",book);