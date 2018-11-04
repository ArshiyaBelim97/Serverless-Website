var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({

user: {type:Schema.Types.ObjectId, ref: 'User'},
name:{type:String},
mobile:{type:Number},
address:{type:String},
city:{type:String},
state:{type:String},
pincode:{type:Number},
cart:{type:Object},
status:{type:String},
date: { type: Date, default: Date.now },
category:{type:String,default:'default'},
ip:{type:String}


});


module.exports = mongoose.model('Order', schema);