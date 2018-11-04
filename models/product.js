var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({

imagePath: {type:String},
title: {type:String  },
price: {type:Number  },
isbn10: {type:String},
isbn13: {type:String},
discount: {type:Number},
author: {type:String},
quantity: {type:Number},
paperback: {type:String},
language: {type:String},
review: {type:String},
description: {type:String},
publisher:{type:String},
date: { type: Date, default: Date.now },
category:{type:String,default:'default'},
ip:{type:String}
});


module.exports = mongoose.model('product', schema);