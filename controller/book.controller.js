var mongodb = require('mongodb').MongoClient;
var mongoose = require('mongoose');
var express = require('express');
var url="mongodb://127.0.0.1:27017/housing";
var router = express.Router();
require('../model/book');
var mongooseModule=mongoose.model("book");  
var bodyParser = require('body-parser');
var parseUrlencoded = bodyParser.urlencoded({extended: false});

//////////////////////get////////////////////
router.get('/list/:aFK/:tFK',function(req,resp){

        console.log("conected Db");
        mongoose.model("book").find({apartment_fk:req.params.aFK,tenant_fk:req.params.tFK},function(err,doc){
        resp.json(doc);
        });
});

/////////////////////////post///////////////////
router.post('/add',function(req,resp,next){     
        console.log("conected Db");
    
        var bookAdd=new mongooseModule({
            action: req.body.action,   
            apartment_fk:req.body.apartment_fk,
            tenant_fk:req.body.tenant_fk,
       });
       console.log(req.body.action);
       bookAdd.save(function(err,doc){
        if(err) 
        resp.json(err);
        resp.json(doc);
       })     
    });

//////////////////////////////put////////////
router.put('/edit/:aFK/:tFK',function(req,resp){
    mongoose.model("book").update({apartment_fk:req.params.aFK,tenant_fk:req.params.tFK},
    {"$set":{   
        text:  req.body.text,
        action: req.body.action,   
        apartment_fk:req.body.apartment_fk,
        tenant_fk:req.body.tenant_fk
        }},function(err,doc){
      if(!err)
      resp.json(doc)
      else
      resp.json(err);
  
  
    });
  });
////////////////////////////delete/////////////////

router.delete('/delete/:aFK/:tFK',function(req,resp){
    console.log(req.params.id);
    mongoose.model("book").remove({apartment_fk:req.params.aFK,tenant_fk:req.params.tFK},function(err, obj) {
        if (err) throw err;
        console.log(" document(s) deleted");
    if(err)
    resp.json(err);
    resp.json(obj);
});
  });
module.exports = router;