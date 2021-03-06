var mongodb = require('mongodb').MongoClient;
var mongoose = require('mongoose');
var express = require('express');
var url="mongodb://127.0.0.1:27017/housing";
var router = express.Router();
require('../model/landlord');
var mongooseModule=mongoose.model("landlord");  
var bodyParser = require('body-parser');
var parseUrlencoded = bodyParser.urlencoded({extended: false});

var ExpressJoi = require('express-joi-validator');

var Joi = require('joi');



var bodySchema = {
    body: {
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().regex(/[a-zA-Z0-9]{3,30}/).required()

    }
};

//////////////////////get////////////////////
router.get('/list',function(req,resp){

        console.log("conected Db");
        mongoose.model("landlord").find({},function(err,doc){
            resp.json(doc);
        });
});

/////////////////////////post///////////////////
router.post('/add',ExpressJoi(bodySchema),function(req,resp,next){     
        console.log("conected Db");
    
        var landlordAdd=new mongooseModule({
           name:req.body.name,
           email:req.body.email,
           password:req.body.password,
       });
       console.log(req.body.name);
       landlordAdd.save(function(err,doc){
        if(err) 
        resp.json(err);
        resp.json(err);
       })     
    });

// router.use(function (err, req, res, next) {
//     if (err.isBoom) {
//        return res.status(err.output.statusCode).json(err.output.payload);
//     console.log("hjhhhhhhhhhhhhhhhhhhhhhhhhhhh");
//       }
//   });
//////////////////////////////put////////////
router.put('/edit/:id',function(req,resp){
    console.log(req.params.id);
    mongoose.model("landlord").update({_id:mongoose.Types.ObjectId(req.params.id)},
  {"$set":{name:req.body.name,email:req.body.email,password:req.body.password}},function(err,doc){
      if(!err)
      resp.json(doc)
      else
      resp.json(err);
  
  
    });
  });
////////////////////////////delete/////////////////

router.delete('/delete/:id',function(req,resp){
    console.log(req.params.id);
    mongoose.model("landlord").remove({_id:mongoose.Types.ObjectId(req.params.id)},function(err, obj) {
        if (err) throw err;
        console.log(" document(s) deleted");
    if(err)
    resp.json(err);
    resp.json(obj);
});
  });
module.exports = router;