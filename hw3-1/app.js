var mongo = require('mongodb').MongoClient;

mongo.connect('mongondb://localhost:27017/school', function(err, db) {
	if(err) throw err;
	
	db.collection('students').find().toArray(function(err, students) {
		if(err) throw err;

		students.forEach(function(student) {
			var grades = student.grades;
			var lowest = grades.shift();
			for(i = 0; i < grades.length; i++) {
				if(lowest.score > grades[i])
					lowest = grades[i];
			}
		});
	});
});