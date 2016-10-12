var
	spotifier = require('./lib'),

	client = spotifier();

//*
client.findBestMatch({ artist: 'foo fighters', title: 'breakout' }, function (err, result) {
	if (err) {
		console.error(err);
	}

	console.log('best match by artist and title:');
	console.log(result);
});
//*/

//*
client.findBestMatch({ multi : true }, { artist: 'beck', title: 'loser' }, function (err, result) {
	if (err) {
		console.error(err);
	}

	console.log('find best match by artist and title (multi):');
	console.log(JSON.stringify(result, 0, 2));
});
//*/


//*
client.findBestMatch({ multi : true, market : 'SE' }, { artist: 'beck', title: 'loser' }, function (err, result) {
	if (err) {
		console.error(err);
	}

	console.log('find best match by artist and title (multi in Sweden):');
	console.log(JSON.stringify(result, 0, 2));
});
//*/

//*
client.search({ limit : 2 }, { artist: 'beck', title: 'loser' }, function (err, result) {
	if (err) {
		console.error(err);
	}

	console.log('search by artist and title:');
	console.log(JSON.stringify(result, 0, 2));
});
//*/

//*
client.findBestMatch({ isrc: 'USGF19463401' }, function (err, result) {
	if (err) {
		console.error(err);
	}

	console.log('best match by ISRC:');
	console.log(result);
});
//*/
