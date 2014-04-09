var mongo = require('mongodb').MongoClient;

mongo.connect('mongondb://localhost:27017/school', function(err, db) {
	if(err) throw err;
	
	
});