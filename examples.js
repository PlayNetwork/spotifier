var
	spotifier = require('./lib'),

	client = spotifier();

client.findBestMatch('foo fighters', 'breakout', function (err, result) {
	if (err) {
		console.error(err);
	}

	console.log('best match:');
	console.log(result);
});

client.search({ limit : 2 }, 'beck', 'loser', function (err, result) {
	if (err) {
		console.error(err);
	}

	console.log('search:');
	console.log(JSON.stringify(result, 0, 2));
});
