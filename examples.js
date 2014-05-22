var
	spotifier = require('./lib'),

	client = spotifier();


client.findBestMatch('beck loser', function (err, result) {
	if (err) {
		console.error(err);
	}

	console.log('best match:');
	console.log(result);
});

client.search('beck loser', function (err, result) {
	if (err) {
		console.error(err);
	}

	console.log('search:');
	console.log(result);
});