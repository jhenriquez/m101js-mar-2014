var client = require('mongodb').MongoClient;

client.connect('mongodb://localhost:27017/course', function(err, db) {
	if(err) throw err;
	var cursor = db.collection('grades').find({ grade : 100});
	cursor.each(function(err, doc) {
		if(err) throw err;
		if(doc == null) return db.close();
		console.dir(doc.student + ' es la rabia!');
	});
});