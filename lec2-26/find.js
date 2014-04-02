var client = require('mongodb').MongoClient;

client.connect('mongodb://localhost:27017/course', function(err, db) {
	if(err) throw err;
	db.collection('grades').find({ grade : 100}).toArray(function(err, doc) {
		if(err) throw err;
		console.dir(doc);
		db.close();
	});
});