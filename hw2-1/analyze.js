// MongoDB for NodeJS Developer Homework Week 2, Assignment 1

var client = require('mongodb').MongoClient;

client.connect('mongodb://localhost:27017/weather', function(err, db) {
	if(err) {
	  console.log(err.message);
	  return;
	}

	var query = {'Wind Direction' : { $gt : 180, $lt : 360 } };
	var projection = { 'State' : 1, Temperature : 1, 'Wind Direction' : 1,_id : 0 };
	var options = { sort : { Temperature : 1 }, limit : 1 };

	db.collection('data').find(query, projection, options).each(function(err, doc) {
		if(err) {
			console.log(err.message);
			return db.close();
		}

		if(!doc) return db.close();

		console.dir(doc.State);
	});
});
