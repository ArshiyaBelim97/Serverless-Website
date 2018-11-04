var express = require('express');
var router = express.Router();


var Product = require('../models/product');
var Cart = require('../models/cart');
var Order = require('../models/order');

var cart = new Cart('req.session.cart');
var order = new Order({
		user: req.user,
		cart: cart,
		address: req.body.address,
		name: req.body.name,
		
});

	order.save(function(err,result)
{
	req.flash('success', 'successfully bought product');
	req.session.cart=null;
	res.redirect('/');
});
