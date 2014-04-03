var client = require('mongodb').MongoClient;

var onConnect = function(err, db) {
	
	if(err) throw err;

	db.collection('grades').findOne({ grade : 100}, function(err, doc) {
		if(err) throw err;
		console.dir(doc);
		db.close();
	});
}

client.connect('mongodb://localhost:27017/course', onConnect);

console.log('After client connect called.');