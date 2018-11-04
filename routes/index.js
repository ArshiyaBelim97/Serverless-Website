var express = require('express');
var router = express.Router();
var Product = require('../models/product');
var AllProduct = require('../models/allproduct');
var Cart = require('../models/cart');
var Order = require('../models/order');
var transporter = require('../mailer/mail');

var csrf = require('csurf');
var csrfProtection = csrf();




router.use(csrfProtection);


router.get('/page/:page',function(req,res,next){

var pageNumber = null ;
var totalPage = null;

if(req.params.page < 1)
{   
    pageNumber = 1;
}
else{
 pageNumber = req.params.page;   
}

AllProduct.paginate({ }, { page:pageNumber, limit: 12 }, function(err, result) {
 
             var successMsg = req.flash('success')[0];
            var productChunks = [];
            var chunkSize = 4;
            for (var i = 0; i < result.docs.length; i += chunkSize) {
                productChunks.push(result.docs.slice(i, i + chunkSize));
            }

            totalPage = Math.floor(result.total/result.limit); 
            
            if(pageNumber>totalPage)
            {
                pageNumber = 1;
                 res.render('shop/all-product', { title: 'Serverless', products: productChunks,page:result.page ,totalPage:totalPage});
            }
                else{       
            res.render('shop/all-product', { title: 'Serverless', products: productChunks,page:result.page ,totalPage:totalPage});
       }

 
});



});






/* GET home page. */
router.get('/', function(req, res, next) {

    var noMatch = null;
    if (req.query.search) {
        const regex = new RegExp(escapeRegex(req.query.search), 'gi');
        AllProduct.find({  $or:[{'title':regex}, {'description':regex}, {'author':regex}, {'category':regex}]}, function(err, docs) {
            if (err) {
                console.log(err);
            } else {
                if (docs.length < 1) {
                    
                    noMatch = "No product match that query, please try again.";


                }

                
                var successMsg = req.flash('success')[0];

                var productChunks = [];
                var chunkSize = 4;
                for (var i = 0; i < docs.length; i += chunkSize) {
                    productChunks.push(docs.slice(i, i + chunkSize));
                }

                res.render('shop/all-product', { title: 'Serverless', products: productChunks, successMsg: successMsg, noMessages: !successMsg, noMatch: noMatch});


            }
        });
    } else {

        Product.find(function(error, docs) {
            var successMsg = req.flash('success')[0];
            var productChunks = [];
            var chunkSize = 4;
            for (var i = 0; i < docs.length; i += chunkSize) {
                productChunks.push(docs.slice(i, i + chunkSize));
            }


            res.render('index', { title: 'Serverless',  csrfToken: req.csrfToken(), products: productChunks, successMsg: successMsg, noMessages: !successMsg, noMatch: noMatch});
        });


    }
});


router.get('/add-to-cart-index/:id', function(req, res, next) {
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});

    Product.findById(productId, function(err, product) {

        if (err) {
            return res.redirect('error');
        }
        cart.add(product, product.id);
        req.session.cart = cart;
        res.redirect('/');
    });

});





router.get('/add-to-cart/:id', function(req, res, next) {
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});

    AllProduct.findById(productId, function(err, product) {

        if (err) {
            return res.redirect('error');
        }
        cart.add(product, product.id);
        req.session.cart = cart;
        res.redirect('/');
    });

});


router.get('/buy-now/:id', function(req, res, next) {
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});

    AllProduct.findById(productId, function(err, product) {

        if (err) {
            return res.redirect('error');
        }
        cart.add(product, product.id);
        req.session.cart = cart;
        res.redirect('/page/:page');
    });

});


router.get('/buy-now-index/:id', function(req, res, next) {
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});

    Product.findById(productId, function(err, product) {

        if (err) {
            return res.redirect('error');
        }
        cart.add(product, product.id);
        req.session.cart = cart;
        res.redirect('/page/:page');
    });

});



router.get('/product-description-index/:id', function(req, res, next) {
    var productId = req.params.id;
    
    Product.findById(productId, function(err, product) {

      var prd = product;
      
        if (err) {
            return res.redirect('/');
        }
      res.render('shop/product-description-index', { prd:prd });
    });

});

router.get('/product-description/:id', function(req, res, next) {
    var productId = req.params.id;
    
    AllProduct.findById(productId, function(err, product) {

      var prd = product;
      
        if (err) {
            return res.redirect('/');
        }
      res.render('shop/product-description', { prd:prd });
    });

});



router.get('/category/:category/:page',function(req,res,next){

var pageNumber = null ;
var totalPage = null;
var category = req.params.category;
if(req.params.page < 1)
{   
    pageNumber = 1;
}
else{
 pageNumber = req.params.page;   
}

AllProduct.paginate({category : category}, { page:pageNumber, limit: 12 }, function(err, result) {
 
             var successMsg = req.flash('success')[0];
            var productChunks = [];
            var chunkSize = 4;
            for (var i = 0; i < result.docs.length; i += chunkSize) {
                productChunks.push(result.docs.slice(i, i + chunkSize));
            }

            totalPage = Math.floor(result.total/result.limit); 
            
            if(pageNumber>totalPage)
            {
                pageNumber = 1;
                 res.render('shop/all-product', { title: 'Serverless', products: productChunks,page:result.page ,totalPage:totalPage});
            }
                else{       
            res.render('shop/all-product', { title: 'Serverless', products: productChunks,page:result.page ,totalPage:totalPage});
       }

 
});



});



router.get('/all-product', function(req, res, next) {

    
            AllProduct.find(function(error, docs) {
            var successMsg = req.flash('success')[0];
            var productChunks = [];
            var chunkSize = 4;
            for (var i = 0; i < docs.length; i += chunkSize) {
                productChunks.push(docs.slice(i, i + chunkSize));
            }

            res.render('shop/all-product', { title: 'Serverless', products: productChunks, successMsg: successMsg, noMessages: !successMsg});
        });
});




router.get('/reduce/:id', isLoggedIn, function(req, res, next) {
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});
    cart.reduceByOne(productId);
    req.session.cart = cart;
    res.redirect('/shopping-cart');

});


router.get('/remove/:id', isLoggedIn, function(req, res, next) {
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});
    cart.removeItem(productId);
    req.session.cart = cart;
    res.redirect('/shopping-cart');

});


router.get('/shopping-cart/', isLoggedIn, function(req, res, next) {
    if (!req.session.cart) {
        return res.render('shop/shopping-cart', { products: null });
    }
    var cart = new Cart(req.session.cart);
    res.render('shop/shopping-cart', { products: cart.generateArray(), totalPrice: cart.totalPrice });
});



router.get('/cod/', isLoggedIn, function(req, res, next) {

    if (!req.session.cart) {
        return res.redirect('/shopping-cart');
    }
    var cart = new Cart(req.session.cart);
    var errMsg = req.flash('error')[0];
    res.render('shop/cod', { total: cart.totalPrice, csrfToken: req.csrfToken(), errMsg: errMsg, noError: !errMsg });
});

router.post('/checkout/', isLoggedIn, function(req, res, next) {

    if (!req.session.cart) {
        return res.redirect('/shopping-cart');
    }

    var cart = new Cart(req.session.cart);
    var order = new Order({
        user: req.user,
        name: req.body.name,
        mobile: req.body.mobile,
        address: req.body.address,
        city: req.body.city,        
        state: req.body.state,
        pincode: req.body.pincode,
          cart: cart,
          status:'Active'
    });

    // setup email data with unicode symbols
    let mailOptions = {
        from: '"serverless BookShop" <shailendra964@gmail.com>', // sender address
        to:  req.user.email, // list of receivers
        subject: 'Order Placed', // Subject line
        text: 'Your order at bookshop has been successfully placed.', // plain text body
        html: '<h3> order details <h3>' + '<b>'+ req.session.cart +'</b>' // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    });

    order.save(function(err, result) {
        req.flash('success', 'successfully bought product');
        req.session.cart = null;
        res.render('users/order-success',{successMsg:req.flash('success')[0]});
    });

});


router.get('/categories/', isLoggedIn , function(req,res,next){

res.render('shop/categories',{ });

});

function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};





module.exports = router;


function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/users/signin/');
}