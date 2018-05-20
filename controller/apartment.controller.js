var mongodb = require('mongodb').MongoClient;
var mongoose = require('mongoose');
var express = require('express');
var url="mongodb://127.0.0.1:27017/housing";
var router = express.Router();
require('../model/apartment');
var mongooseModule=mongoose.model("apartment");  
var bodyParser = require('body-parser');
var parseUrlencoded = bodyParser.urlencoded({extended: false});

//////////////////////get////////////////////
router.get('/list',function(req,resp){

        console.log("conected Db");
        mongoose.model("apartment").find({},function(err,doc){
            resp.json(doc);
        });
});

/////////////////////////post///////////////////
router.post('/add',function(req,resp,next){     
        console.log("conected Db");
    
        var apartmentAdd=new mongooseModule({
            rooms:req.body.rooms,
            description:req.body.description,
            address:req.body.address,
            price:req.body.price,
           landlord_fk:req.body.landlord_fk
         
       });
       console.log(req.body.rooms);
       apartmentAdd.save(function(err,doc){
        if(err) 
        resp.json(err);
        resp.json(doc);
       })     
    });

//////////////////////////////put////////////
router.put('/edit/:id',function(req,resp){
    console.log(req.params.id);
    mongoose.model("apartment").update({_id:mongoose.Types.ObjectId(req.params.id)},
    {"$set":{
            rooms:req.body.rooms,
            description:req.body.description,
            address:req.body.address,
            price:req.body.price,
            tenant_fk:req.body.apartment_fk
        }},function(err,doc){
      if(!err)
      resp.json(doc)
      else
      resp.json(err);
  
  
    });
  });
////////////////////////////delete/////////////////

router.delete('/delete/:id',function(req,resp){
    console.log(req.params.id);
    mongoose.model("apartment").remove({_id:mongoose.Types.ObjectId(req.params.id)},function(err, obj) {
        if (err) throw err;
        console.log(" document(s) deleted");
    if(err)
    resp.json(err);
    resp.json(obj);
});
  });
module.exports = router;