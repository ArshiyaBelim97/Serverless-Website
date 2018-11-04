var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var userSchema = new Schema({



email: {type:String },
password: {type:String  },
name: {type:String,default:'Name' },
mobile:{type:String},
date: { type: Date, default: Date.now },
ip:{type:String},
resetPasswordToken: String,
resetPasswordExpires: Date


});


userSchema.methods.encryptPassword = function (password){
	return password;
};

userSchema.methods.validPassword = function(password){
	return password==this.password;
};

module.exports = mongoose.model('user', userSchema);