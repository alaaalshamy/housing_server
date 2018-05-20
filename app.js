var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var landlordRouter = require('./controller/landlord.controller');
var tenantRouter = require('./controller/tenant.controller');
var apartmentRouter=require('./controller/apartment.controller');
var bookRouter=require('./controller/book.controller');
var communicateRouter=require('./controller/communicate.controller');

var app = express();
////////////////////////////
var mongodb = require('mongodb').MongoClient;
var mongoose = require('mongoose');
var url="mongodb://127.0.0.1:27017/housing";
mongoose.connect("mongodb://127.0.0.1:27017/housing");

require('./model/landlord');
require('./model/apartment');
require('./model/communicate');
require('./model/book');
require('./model/tenant');
var router = express.Router();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({
  extended: true}))
app.use(bodyParser.json());


///////////////validation//////////////
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/landlord', landlordRouter);
app.use('/tenant', tenantRouter);
app.use('/apartment', apartmentRouter);
app.use('/communicate',communicateRouter);
app.use('/book', bookRouter);




app.listen(9061, function(){
  console.log("Starting .... on 9061");
  
  });



module.exports = app;
