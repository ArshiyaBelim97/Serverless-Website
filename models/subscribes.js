var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({

user: {type:Schema.Types.ObjectId, ref: 'User'},
email:{type:String, required:true},
action:{type:String},
ip:{type:String}

});


module.exports = mongoose.model('Subscribes', schema);