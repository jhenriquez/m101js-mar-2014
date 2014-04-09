// MongoDB for NodeJS Developer Homework Week 2, Assignment 2

var client = require('mongodb').MongoClient;

client.connect('mongodb://localhost:27017/weather', function(err, db) {
	if(err) throw err;

	var query = {};
	var projection = { 'State' : 1, 'Day' : 1, 'Time' : 1, '_id' : 1 };
	var options = { sort : { State : 1, Temperature : -1 } };
	var month_highs = [];
	var currentState = '';

	db.collection('data').find(query, projection, options).toArray(function(err, docs) { 
		if(err) throw err;

		docs.forEach(function(doc) {
			if(currentState == '' || currentState != doc.State) {
				currentState = doc.State;
				month_highs.push(doc);
			}
		});

		db.collection('data').update({ $or : month_highs }, { $set: { month_high : true }}, {multi : 1},
			function(err, updated) {
				if(err) throw err;
				console.log(updated + ' documents updted.');
			}
		);
	});

});