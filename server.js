//-----------------------------------------------------------------------------------------------
//Set up
//-----------------------------------------------------------------------------------------------

var express = require('express');
// create our app w/ express
var app = express(); 
/*Gzip compressing can greatly decrease the size of the response body and hence increase 
the speed of a web app. Use the compression middleware for gzip compression in your Express app.*/
var compression = require('compression');
// mongoose for mongodb
var mongoose = require('mongoose'); 
// log requests to the console (express4)
var morgan = require('morgan'); 
// pull information from HTML POST (express4)
var bodyParser = require('body-parser'); 

var appRoutes = require('./app/routes/routes');
/*Multer is a node.js middleware for handling multipart/form-data, which is primarily used 
for uploading files. It is written on top of busboy for maximum efficiency.*/
var multer = require('multer');
/*Express middleware for reaping uploaded files saved to disk by multer or any multipart 
middleware propagating the req.files object. The middleware will automatically remove any 
uploaded files left in their temporary location upon response end or close.*/
var autoReap  = require('multer-autoreap');

var oneDay = 86400000;

var port = process.env.PORT || 3000;
//-----------------------------------------------------------------------------------------------
//Configuration
//-----------------------------------------------------------------------------------------------
var database = require('./config/database');
mongoose.connect(database.url);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    // we're connected!
    console.log("Successfully connected to the database!");
});
//static content is compressed using gzip
app.use(compression())
// set the static files location /public/img will be /img for users
//app.use(express.static(__dirname + '/public', { maxAge: oneDay })); 
app.use(express.static(__dirname + '/public')); 
//app.use('/image', express.static(__dirname + '/public/img'));
// *log every request to the console*
app.use(morgan('dev')); 
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({'extended':'true'})); 
// parse application/json
app.use(bodyParser.json()); 
//allow cross origin requests
app.use(function(req, res, next) { 
    res.setHeader("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
    res.header("Access-Control-Allow-Origin", "http://localhost");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//app.use(autoReap);
//-----------------------------------------------------------------------------------------------
//Load the routes
//-----------------------------------------------------------------------------------------------
app.use('/api', appRoutes);
//-----------------------------------------------------------------------------------------------
//listen (start app with node server.js)
//-----------------------------------------------------------------------------------------------
app.listen(port, function (){
    console.log("Portfolio App listening on port " + port);
});
