var
	levenshtein = require('levenshtein'),
	request = require('request'),
	unidecode = require('unidecode');


var spotifier = (function (self) {
	'use strict';

	self = self || {};

	var
		accessToken,
		defaultOptions = {
			authorizationUrl : 'https://accounts.spotify.com/api/token',
			searchResultLimit : 10,
			searchUrl : 'https://api.spotify.com/v1/search',
			timeout : 10000 // 10 seconds
		};

	function closestMatch (artist, title, matches) {
		var
			artistName = '',
			bestDistance = null,
			bestMatches = [],
			distance = 0,
			distances = [];

		// sanitize query
		artist = sanitize(artist);
		title = sanitize(title);

		// iterate each match and determine the distance from the normalized
		// search artist and title
		matches.forEach(function (match) {
			artistName = (match.artists && match.artists.length) ?
				match.artists[0].name :
				'';

			distance = new levenshtein(
				artist + ' ' + title,
				sanitize(artistName) + ' ' + sanitize(match.name))
			.distance;

			// store the distance
			distances.push(distance);

			if (bestDistance === null || distance < bestDistance) {
				bestDistance = distance;
			}
		});

		// retrieve all matches that tie with the best match
		distances.forEach(function (distance, i) {
			if (distance === bestDistance) {
				bestMatches.push(matches[i]);
			}
		});

		return bestMatches;
	}

	function ensureAccessToken (authorization, callback) {
		// if there is nothing to authenticate with, return immediately
		if (!authorization || !authorization.length) {
			return setImmediate(callback);
		}

		// if we already have a valid access token, return it
		if (accessToken && new Date() < accessToken.expiresAt) {
			return setImmediate(function () {
				return callback(null, accessToken);
			});
		}

		var requestedAt = new Date();

		return request({
			form : 'grant_type=client_credentials',
			headers : {
				Authorization : ['Basic', authorization].join(' ')
			},
			method : 'POST',
			url : self.options.authorizationUrl
		}, function (err, res, body) {
			if (err) {
				return callback(err);
			}

			if (res.statusCode >= 200 && res.statusCode <= 299) {
				if (body) {
					try {
						accessToken = JSON.parse(body);
					} catch (ex) {
						ex.body = body;
						return callback(ex);
					}

					// jshint sub : true
					accessToken.expiresAt = new Date(
						Number(requestedAt) + (accessToken['expires_in'] * 1000));

					return callback(null, accessToken);
				}
			}

			return callback(new Error(body));
		});
	}

	function sanitize (term) {
		var
			i = 0,
			reFeaturing = /\sfeat(uring)?/g, // match " feat" and " featuring"
			reNonAllowableChar = /[^\*\.\(\)\-_'a-zA-Z 0-9]+/g; // match anything that is not alpha, numeric, space, -, _ and '

		term = unidecode(term.toLowerCase())
			.replace(reNonAllowableChar, ' ') // remove unallowed chars !
			.split(/\s+/).join(' '); // normalize      spaces

		// remove featuring
		i = term.search(reFeaturing);
		if (i > 0) {
			term = term.substring(0, i);
		}

		return term;
	}

	self.findBestMatch = function (options, params, callback) {
		if (typeof callback === 'undefined' && typeof params === 'function') {
			callback = params;
			params = options;
			options = {};
		}

		var bestMatches = [];

		return self.search(options, params, function (err, result) {
			if (err) {
				return callback(err);
			}

			if (result.total > 0) {
				if (params.isrc) {
					bestMatches = result.items;
				} else {
					bestMatches = closestMatch(params.artist, params.title, result.items);
				}
			}

			// if the multi param is supplied, return all top matches
			return callback(null, options.multi ? bestMatches : bestMatches[0]);
		});
	};

	self.search = function (options, params, callback) {
		if (typeof callback === 'undefined' && typeof params === 'function') {
			callback = params;
			params = options;
			options = {};
		}

		var
			authorization = '',
			clientId = options.clientId || self.options.clientId,
			clientSecret = options.clientSecret || self.options.clientSecret,
			market = options.market || params.market || self.options.market,
			query = '',
			result = {};

		if (params.isrc) {
			query = ['isrc:', params.isrc].join('');
		}

		// sanitize artist and title if supplied
		if (params.artist && params.title) {
			query = [
				'artist:',
				sanitize(params.artist),
				'+track:',
				sanitize(params.title)].join('');
		}

		if (!query.length) {
			return setImmediate(
				callback,
				new Error('either isrc or artst and title must be supplied as params'));
		}

		// check for authorization
		if (clientId && clientSecret) {
			authorization = new Buffer(
				[clientId, clientSecret].join(':')).toString('base64');
		}

		// ensure an access token (if applicable)
		return ensureAccessToken(authorization, function (err, token) {
			if (err) {
				return callback(err);
			}

			// jshint sub : true
			return request({
				headers : {
					Authorization : (token ?
						['Bearer', token['access_token']].join(' ') :
						undefined)
				},
				method : 'GET',
				qs : {
					limit : options.limit || self.options.searchResultLimit,
					market : market,
					offset : options.start || 0,
					type : 'track',
					useQuerystring : true
				},
				timeout : self.options.timeout,
				uri : [self.options.searchUrl, '?q=', query].join('')
			}, function (err, res, body) {
				if (err) {
					return callback(err);
				}

				/*
				// debugging
				console.log([
					self.options.searchUrl,
					'?q=',
					query,
					'&limit=',
					options.limit || self.options.searchResultLimit,
					'&offset=',
					options.start || 0,
					'&type=track',
					'&market=',
					market].join(''));
				//*/

				if (body) {
					try {
						result = JSON.parse(body);
					} catch (ex) {
						ex.body = body;
						return callback(ex);
					}
				}

				// if the response was a success, return the body
				if (res.statusCode >= 200 && res.statusCode <= 299) {
					return callback(null, result.tracks || []);
				}

				// return the error response
				return callback(result);
			});
		});
	};

	return function (options) {
		options = options || {};

		// apply default for missing keys
		Object.keys(defaultOptions).forEach(function (key) {
			if (typeof options[key] === 'undefined') {
				options[key] = defaultOptions[key];
			}
		});

		self.options = options;

		return self;
	};
}({}));

exports = module.exports = spotifier;
exports.initialize = spotifier;
