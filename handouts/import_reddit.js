var client = require('mongodb').MongoClient,
	request = require('request');

request('http://www.reddit.com/r/technology.json', function(err, res, body) {
	if(err || res.statusCode != 200) {
		console.log('Error during the request:');
		console.log('Messge: ' + err);
		console.log('Response Status: ' + res.statusCode);
		return undefined;
	}
	
	var reddit_raw = JSON.parse(body);
	var stories = reddit_raw.data.children.map(function(story) { return story.data });

	client.connect('mongodb://localhost:27017/course', function(err, db) {
		if(err) throw err;
	
		db.collection('reddit').insert(stories, function(err, data) {
			if(err) throw err;
			console.dir(data);
			db.close();
		});
	});
});