var Product = require('../models/product');
var AllProduct = require('../models/allproduct');
var mongoose = require('mongoose');
//mongoose.Promise = require('bluebird');
var uri = "mongodb://shailendra:shailendra@bookshop-shard-00-01-7uhtu.mongodb.net:27017,bookshop-shard-00-00-7uhtu.mongodb.net:27017,bookshop-shard-00-02-7uhtu.mongodb.net:27017/ecommerce?ssl=true&replicaSet=bookshop-shard-0&authSource=admin";


process.on('unhandledRejection', error => {

  console.log('unhandledRejection', error.message);
}); 

mongoose.connect(uri , function(err, db) {
 
});



var products = [
	
new AllProduct({

imagePath:'https://s3.ap-south-1.amazonaws.com/serverlessproduct/allproduct/de.jpg',
title:'Database System Concepts ',
price:'600',
description:'The sixth edition of Database System Concepts is popularly considered to be one of the cornerstone texts of database education. The basic and fundamental concepts are presented in an intuitive manner, and is designed to help students begin working with databases as soon as possible. +The book commences with a basic introduction, which discusses fundamental topics like Database Languages, Database Users and Administrators, Database Design, and Data Storage and Querying. Then, the book is segregated into ten section. Relational Databases, System Architecture, Speciality Databases, and Transaction Management are a few. Chapters like Object-Relational Mapping, Relevance Ranking Using Terms, and Distributed Data Storage are discussed in detail. This edition also provides a revised coverage of SQL, with greater attention to variants of SQL in actual systems and SQL features. There is also new material on support vector machines, and validation of classifiers The text supplied in this book emphasises applications, practical issues, and implementation, coupled with a comprehensive coverage of the key theoretical concepts in a clear manner. Algorithms and concepts are presented in a general setting, while they is not tied to any database system in particular, annotations and variations specific to particular database systems are provided. The only prerequisites to getting the most out of the book are a familiarity with computer organisation, basic data structures, and a high-level programming language.This sixth edition of Database System Concepts was published by Tata McGraw '
 + 'Hill Education in 2013, and it is available in paperback.',
discount:'540',
author:'Abraham Silberschatz',
isbn10:'9332901384',
isbn13:'978-9332901384',
language:'English',
paperback:'1376' ,
quantity:'10'
}),

new AllProduct({

imagePath:'https://s3.ap-south-1.amazonaws.com/serverlessproduct/allproduct/ds.jpg',
title:'Introduction to Algorithms (Eastern Economy Edition)',
price:'800',
description:'This internationally acclaimed textbook provides a comprehensive introduction to the modern study of computer algorithms. It covers a broad range of algorithms in depth, yet makes their design and analysis accessible to all levels of readers. Each chapter is relatively selfcontained and presents an algorithm, a design technique, an application area, or a related topic. The algorithms are described and designed in a manner to be readable by anyone who has done a little programming. The explanations have been kept elementary without sacrificing depth of coverage or mathematical rigor.'+

'The third edition has been revised and updated throughout. It includes two completely new chapters, on Van Emde Boas trees and Multithreaded algorithms, and substantial additions to the chapter on recurrences (now called “Divide and Conquer”). It features improved treatment of dynamic programming and greedy algorithms and a new notion of edgebased flow in the material on flow networks. Many new exercises and problems have been added in this edition. The text is intended primarily for students studying algorithms or data structures. As it discusses engineering issues in algorithm design, as well as mathematical aspects, it is equally well suited for selfstudy by technical professionals.',
discount:'735',
author:'Thomas H. Cormen',
isbn10:'8120340078',
isbn13:'978-8120340077',
language:'English',
paperback:'1312' ,
quantity:'10'
}),

new AllProduct({

imagePath:'https://s3.ap-south-1.amazonaws.com/serverlessproduct/allproduct/ds1.jpg',
title:'Introduction to Algorithms (Eastern Economy Edition)',
price:'800',
description:'This internationally acclaimed textbook provides a comprehensive introduction to the modern study of computer algorithms. It covers a broad range of algorithms in depth, yet makes their design and analysis accessible to all levels of readers. Each chapter is relatively selfcontained and presents an algorithm, a design technique, an application area, or a related topic. The algorithms are described and designed in a manner to be readable by anyone who has done a little programming. The explanations have been kept elementary without sacrificing depth of coverage or mathematical rigor.'+

'The third edition has been revised and updated throughout. It includes two completely new chapters, on Van Emde Boas trees and Multithreaded algorithms, and substantial additions to the chapter on recurrences (now called “Divide and Conquer”). It features improved treatment of dynamic programming and greedy algorithms and a new notion of edgebased flow in the material on flow networks. Many new exercises and problems have been added in this edition. The text is intended primarily for students studying algorithms or data structures. As it discusses engineering issues in algorithm design, as well as mathematical aspects, it is equally well suited for selfstudy by technical professionals.',
discount:'735',
author:'Thomas H. Cormen',
isbn10:'8120340078',
isbn13:'978-8120340077',
language:'English',
paperback:'1312' ,
quantity:'10'
}),

new AllProduct({
imagePath:'https://s3.ap-south-1.amazonaws.com/serverlessproduct/allproduct/ds2.jpg',
title:'Introduction to Algorithms (Eastern Economy Edition)',
price:'800',
description:'This internationally acclaimed textbook provides a comprehensive introduction to the modern study of computer algorithms. It covers a broad range of algorithms in depth, yet makes their design and analysis accessible to all levels of readers. Each chapter is relatively selfcontained and presents an algorithm, a design technique, an application area, or a related topic. The algorithms are described and designed in a manner to be readable by anyone who has done a little programming. The explanations have been kept elementary without sacrificing depth of coverage or mathematical rigor.'+

'The third edition has been revised and updated throughout. It includes two completely new chapters, on Van Emde Boas trees and Multithreaded algorithms, and substantial additions to the chapter on recurrences (now called “Divide and Conquer”). It features improved treatment of dynamic programming and greedy algorithms and a new notion of edgebased flow in the material on flow networks. Many new exercises and problems have been added in this edition. The text is intended primarily for students studying algorithms or data structures. As it discusses engineering issues in algorithm design, as well as mathematical aspects, it is equally well suited for selfstudy by technical professionals.',
discount:'735',
author:'Thomas H. Cormen',
isbn10:'8120340078',
isbn13:'978-8120340077',
language:'English',
paperback:'1312' ,
quantity:'10'
}),

new AllProduct({
imagePath:'https://s3.ap-south-1.amazonaws.com/serverlessproduct/allproduct/os.jpg',
title:'Introduction to Operating System',
price:'800',
description:'This internationally acclaimed textbook provides a comprehensive introduction to the modern study of computer algorithms. It covers a broad range of algorithms in depth, yet makes their design and analysis accessible to all levels of readers. Each chapter is relatively selfcontained and presents an algorithm, a design technique, an application area, or a related topic. The algorithms are described and designed in a manner to be readable by anyone who has done a little programming. The explanations have been kept elementary without sacrificing depth of coverage or mathematical rigor.'+

'The third edition has been revised and updated throughout. It includes two completely new chapters, on Van Emde Boas trees and Multithreaded algorithms, and substantial additions to the chapter on recurrences (now called “Divide and Conquer”). It features improved treatment of dynamic programming and greedy algorithms and a new notion of edgebased flow in the material on flow networks. Many new exercises and problems have been added in this edition. The text is intended primarily for students studying algorithms or data structures. As it discusses engineering issues in algorithm design, as well as mathematical aspects, it is equally well suited for selfstudy by technical professionals.',
discount:'735',
author:'Thomas H. Cormen',
isbn10:'8120340078',
isbn13:'978-8120340077',
language:'English',
paperback:'1312' ,
quantity:'10'
}),

];

var done = 0;
for (var i=0; i<products.length; i++)
{
	products[i].save(function (error , result){
		done++;
		if(done == products.length){
			exit();
		}
	});
}

function exit(){


mongoose.disconnect();

}