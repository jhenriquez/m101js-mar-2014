var mongo = require('mongodb').MongoClient;

mongo.connect('mongodb://localhost:27017/school', function(err, db) {
	if(err) throw err;
	
	db.collection('students').find().toArray(function(err, students) {
		if(err) throw err;

		students.forEach(function(student) {
			var lowest = undefined;
			var lowestIndex = undefined;

			for(i = 0; i < student.scores.length; i++) {
				if ((lowest === undefined && student.scores[i].type === 'homework') 
					|| (student.scores[i].type === 'homework' && lowest.score > student.scores[i].score)) {
					lowest = student.scores[i];
					lowestIndex = i;
				}
			}

			student.scores.splice(lowestIndex, 1);

			db.collection('students').update({ _id : student._id, name : student.name }, student, function(err, upd) {				
				if(err) throw err;
			});
		});
	});
});