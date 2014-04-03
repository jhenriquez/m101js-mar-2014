// MongoDB for NodeJS Developer Homework Week 2, Assignment 2

var client = require('mongodb').MongoClient;

client.connect('mongodb://localhost:27017/m101', function(err, db) {
	if(err) {
	  console.log(err.message);
	  return;
	}

	var query = {};
	var projection = { 'State' : 1, Temperature : 1, _id : 0 };
	var options = { sort : { State : 1,  Temperature : -1 } };

	db.collection('hw2_1').find(query, projection, options).each(function(err, doc) {
		if(err) {
			console.log(err.message);
			return db.close();
		}

		if(!doc) return db.close();

		console.dir(doc);
	});
});
