var express = require('express');
var app = express();
var router = express.Router();
var BaseController = require("./Base"),
	View = require("../views/Base"),
    model = new (require("../models/ContentModel"));

var MongoClient = require('mongodb').MongoClient;
/* GET home page. */
router.get('/', function(req, res, next) {
	var shop1SoldDrink = req.app.get('data').shop1.sold_drink;
    var shop2SoldDrink = req.app.get('data').shop2.sold_drink;
    
    responde = {
        productID : req.query.productID,
        productName: req.query.productName

    }
    
    // Use connect method to connect to the Server
    console.log(responde.productID)
    var product = responde.productID
    var name  = responde.productName
    var item = {}
    item[product] = responde.productName
    var url = 'mongodb://admin:admin@ds014578.mlab.com:14578/mylittleshop';
    if(name!=null)
    {
        MongoClient.connect(url, function(err, client) {
            const db = client.db('mylittleshop')
            console.log("Connected correctly to server");
            db.collection('secondCollection').update({"name":"firstDocument"},{$push:{"barcode":item}},{multi:true})
            
            
          });
    }
  res.render('barcodeGenerator', { 
    title: 'abc',
    content: req.app.get('data').barcode[1].product
   });

});

module.exports = router;