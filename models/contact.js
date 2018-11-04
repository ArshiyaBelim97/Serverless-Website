var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({

user: {type:Schema.Types.ObjectId, ref: 'User'},
email:{type:String, required:true},
subject:{type:String,required:true},
description:{type:String,required:true},
date: { type: Date, default: Date.now },
action:{type:String},
ip:{type:String}

});


module.exports = mongoose.model('Contact', schema);