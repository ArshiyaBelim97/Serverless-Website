var express = require('express');
var router = express.Router();
var csrf = require('csurf');
var passport = require('passport');
var Product = require('../models/product');
var Order = require('../models/order');
var Cart = require('../models/cart');
var Contact = require('../models/contact');
var nodemailer = require('nodemailer');
var AllProduct = require('../models/allproduct');
var async = require('async');
var crypto = require('crypto');
var User = require('../models/user');
var Subscribes = require('../models/subscribes');
var transporter = require('../mailer/mail');
var ip = require('ip');

var csrfProtection = csrf();

router.use(csrfProtection);



router.get('/forgot',function(req,res,next){

var message = req.session.message;
var error = req.session.error;
	res.render('users/forget' , { csrfToken: req.csrfToken(),message:message,error:error});
  req.session.message = '';
  req.session.error = '';
});

router.post('/forgot', function(req, res, next) {
  async.waterfall([
    function(done) {
      crypto.randomBytes(20, function(err, buf) {
        var token = buf.toString('hex');
        done(err, token);
      });
    },
    function(token, done) {
      User.findOne({ email: req.body.email }, function(err, user) {
        if (!user) {
          req.flash('error', 'No account with that email address exists.');
          var error = req.flash('error')[0];
       req.session.error = error;
          return res.redirect('/users/forgot');
        }

        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

        user.save(function(err) {
          done(err, token, user);
        });
      });
    },
     function(token, user, done) {
       let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'shailendra964@gmail.com', // generated ethereal user
            pass: '9825930226' // generated ethereal password
        },
        tls:{
            rejectUnauthorized:false
        }
    });
  
        var mailOptions = {
        to: user.email,
        from: 'shailendra964@gmail.com',
        subject: 'Password Reset',
        text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
          'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
          'http://' + req.headers.host + '/users/reset/' + token + '\n\n' +
          'If you did not request this, please ignore this email and your password will remain unchanged.\n'
      };
 
      transporter.sendMail(mailOptions, function(err) {
        req.flash('info', 'An e-mail has been sent to ' + user.email + ' with further instructions.');
        done(err, 'done');
      });
    }
  ], function(err) {
    if (err) return next(err);
    var successMsg = req.flash('info')[0];
       req.session.message = successMsg;
    res.redirect('/users/forgot');
  });
});


router.get('/reset/:token', function(req, res) {
  User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
    if (!user) {
      req.flash('error', 'Password reset token is invalid or has expired.');
      return res.redirect('/users/forgot');
    }
    res.render('users/reset', { token:req.params.token,csrfToken: req.csrfToken() });
  });
});


router.post('/reset/:token', function(req, res) {
  async.waterfall([
    function(done) {
      User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
        if (!user) {
          req.flash('error', 'Password reset token is invalid or has expired.');
          return res.redirect('back');
        }

        user.password = req.body.password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;

        user.save(function(err) {
         
            done(err, user);
        });
      });
    },
    function(user, done) {
      let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'shailendra964@gmail.com', // generated ethereal user
            pass: '9825930226' // generated ethereal password
        },
        tls:{
            rejectUnauthorized:false
        }
    });
      var mailOptions = {
        to: user.email,
        from: 'passwordreset@demo.com',
        subject: 'Your password has been changed',
        text: 'Hello,\n\n' +
          'This is a confirmation that the password for your account ' + user.email + ' has just been changed.\n'
      };
     transporter.sendMail(mailOptions, function(err) {
        req.flash('success', 'Success! Your password has been changed.');
        done(err);
      });
    }
  ], function(err) {
    res.redirect('/');
  });
});


router.get('/productEntry',function(req, res, next){

  res.render('shop/productEntry', { csrfToken: req.csrfToken()} );
});


router.post('/productEntry',function(req,res,next){

var ipaddress = ip.address();
console.log(ipaddress);

var product = new AllProduct({

imagePath: req.body.imagePath,
title: req.body.title,
price: req.body.price,
isbn10: req.body.isbn10,
isbn13: req.body.isbn13,
discount:req.body.discount,
author:req.body.author,
quantity:req.body.quantity,
paperback:req.body.paperback,
language: req.body.language,
review: req.body.review,
description: req.body.description,
publisher:req.body.publisher,
category: req.body.category,
ip:ipaddress
  });

   product.save(function(err, result) {
        req.flash('success', 'Query Submitted Successfully');
        res.redirect('/users/productEntry');
    });


});



router.post('/contact', function(req,res,next){

var contact = new Contact({
        user: req.user,
        email: req.body.email,
        subject: req.body.subject,
        description: req.body.description,
        action:'pending'
    });



    contact.save(function(err, result) {
        req.flash('success', 'Query Submitted Successfully');
        res.redirect('/');
    });


});




router.post('/subscribe', function(req,res,next){

var subscribes = new Subscribes({
        user: req.user,
        email: req.body.email,
        action:'pending'
    });



    subscribes.save(function(err, result) {
        req.flash('success', 'Query Submitted Successfully');
        res.redirect('/');
    });


});


router.get('/contact', function(req,res,next){

res.render('users/contact',{ csrfToken: req.csrfToken()});

});

router.get('/change-password', function(req,res,next){

res.render('users/change-password',{ csrfToken: req.csrfToken()});

});

router.post('/change-password',  function(req,res,next){
var findUser = req.user.email;

User.findOne( {'email':findUser}, function(err, user)
  {
    if(err){
     return res.redirect('error');    
    }
   
    user.password = req.body.password;
    
    user.save(function(err,user){  
       if(err)
       {

          return res.redirect('error');

       }  

      req.flash('success', 'Password Changed Successfully');
       res.render('users/user-account',{success:req.flash('success')[0]}); 
    });
   
  
  });

});



router.get('/user-profile/', isLoggedIn ,function(req,res,next){


var findUser = req.user.email;



User.findOne( {'email':findUser}, function(err, user)
  {
    if(err){
      
    }
   
res.render('users/user-profile',{ user:user});   
  
  });
});

router.get('/user-account/', isLoggedIn , function(req,res,next){

res.render('users/user-account',{ });

});


router.get('/orders',  isLoggedIn, function(req, res, next){
	Order.find( { $and: [{user: req.user},{status:'Active'}]},function(err,orders){
		if(err){
			return res.write('error');
		}
		var cart;
		orders.forEach(function(order){
			cart = new Cart(order.cart);
			order.items = cart.generateArray();
		});
		res.render('users/orders', {orders : orders });
	});
	
});






router.get('/cancelled-orders',  isLoggedIn, function(req, res, next){
  Order.find( { $and: [{user: req.user},{status:'Cancelled'}]},function(err,orders){
    if(err){
      return res.write('error');
    }
    var cart;
    orders.forEach(function(order){
      cart = new Cart(order.cart);
      order.items = cart.generateArray();
    });
    res.render('users/cancelled-orders', {orders : orders });
  });
  
});

router.get('/cancel-order/:id', isLoggedIn, function(req, res, next) {
    var orderId = req.params.id;
  Order.update( {_id:orderId} ,{ $set: { status: 'Cancelled' }} ,{ multi: true }, function(err,order){
    if(!err){
  res.redirect('/users/cancelled-orders/');

    }


  });
   

});




router.get('/logout', isLoggedIn , function(req,res,next){
req.logout();
res.redirect('/');
});




router.use('/', notLoggedIn, function(req, res, next )
	{
		next();
	});

router.get('/signup', notLoggedIn ,function(req, res, next){
	var messages = req.flash('error');
	res.render('users/signup', { csrfToken: req.csrfToken(), messages:messages, hasErrors:messages.length>0} );
});

router.post('/signup',passport.authenticate('local.signup',{

successRedirect : '/users/user-account',
failureRedirect : '/users/signup',
failureFlash    :  true

}));


router.get('/signin',notLoggedIn, function(req,res,next){

	var messages = req.flash('error');
	res.render('users/signin', { csrfToken: req.csrfToken(), messages:messages, hasErrors:messages.length>0} );
});



router.post('/signin', passport.authenticate('local.signin',{
successRedirect : '/',
failureRedirect : '/users/signin',
failureFlash    :  true

}));





module.exports = router;

function isLoggedIn(req,res,next)
{
	if(req.isAuthenticated())
	{
		return next();
	}
	res.redirect('/users/signin/');
}

function notLoggedIn(req,res,next)
{
	if(!req.isAuthenticated())
	{
		return next();
	}
	res.redirect('/');
}


