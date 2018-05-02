var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var lessMiddleware = require('less-middleware');
var logger = require('morgan');

var MongoClient = require('mongodb').MongoClient;
var http = require('http');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var barcodeRouter = require('./routes/barcodeGenerator');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'templates'));
app.set('view engine', 'hjs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(lessMiddleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/barcodeGenerator',barcodeRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// connect database server-side
var url = 'mongodb://admin:admin@ds014578.mlab.com:14578/mylittleshop';
var findDocuments = function(db, callback) {
  // Get the documents collection
  var collection = db.collection('secondCollection');
  // Find some documents
  
  collection.find().toArray(function(err, items) {
    console.log("Found the following records");
    callback(items[0]);
  });


}

// Use connect method to connect to the Server
MongoClient.connect(url, function(err, client) {
  const db = client.db('mylittleshop')
  console.log("Connected correctly to server");
  //db.collection('secondCollection').update({"name":"firstDocument"},{$pull:{"barcode":[{"3":"Fnta"}]}},{multi:true})
  findDocuments(db, function(docs) {
    exports.getDataShop1 = function() {
      return docs;
    }
    console.log(exports.getDataShop1())
    app.set('data',docs)
    console.log(docs.barcode);
    
  });
  
  
});


module.exports = app;