var express = require('express');
var router = express.Router();
var BaseController = require("./Base"),
	View = require("../views/Base"),
	model = new (require("../models/ContentModel"));

/* GET home page. */
router.get('/', function(req, res, next) {
	var shop1SoldDrink = req.app.get('data').shop1.sold_drink;
	var shop2SoldDrink = req.app.get('data').shop2.sold_drink;
	var self = this;
	console.log(shop1SoldDrink.length)
  res.render('index', { 
	title: 'abc',
	item:shop1SoldDrink,
	item2:shop2SoldDrink,
	totalSoldShop1: shop1SoldDrink.Fanta.quantity_sold+shop1SoldDrink.Coca_cola.quantity_sold
	+shop1SoldDrink.Pepsi.quantity_sold +shop1SoldDrink.MountainDew.quantity_sold

   });

});

module.exports = router;