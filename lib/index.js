var
	levenshtein = require('levenshtein'),
	request = require('request'),
	unidecode = require('unidecode');


var spotifier = (function (self) {
	'use strict';

	self = self || {};

	var defaultOptions = {
		searchUrl : 'http://ws.spotify.com/search/1/track.json',
		timeout : 10000 // 10 seconds
	};

	function closestMatch (query, matches) {
		var
			artistName = '',
			bestDistance = null,
			bestMatch = null,
			distance = 0;

		matches.some(function (match) {
			artistName = (match.artists && match.artists.length) ?
				match.artists[0].name :
				'';

			distance = new levenshtein(
				query,
				sanitize(artistName) + ' ' + sanitize(match.name))
			.distance;

			if (bestDistance === null || distance < bestDistance) {
				bestDistance = distance;
				bestMatch = match;
			}

			// 0 is an exact match - no need to process further
			return bestDistance === 0;
		});

		return bestMatch;
	}

	function sanitize (term) {
		var
			i = 0,
			reFeaturing = /\sfeat(uring)?/g, // match " feat" and " featuring"
			reInBracket = /\s*\[.*?\]\s*/g, // match phrases within brackets
			reInParen = /\s*\(.*?\)\s*/g, // match phrases within parentheses
			reNonAllowableChar = /[^\-_'a-zA-Z 0-9]+/g; // match anything that is not alpha, numeric, space, -, _ and '

		term = unidecode(term.toLowerCase())
			.replace(reInBracket, ' ') // remove [phrases within brackets]
			.replace(reInParen, ' ') // remove (phrases within parentheses)
			.replace(reNonAllowableChar, ' ') // remove unallowed chars !
			.split(/\s+/).join(' '); // normalize      spaces

		// remove featuring
		i = term.search(reFeaturing);
		if (i > 0) {
			term = term.substring(0, i);
		}

		return term;
	}

	self.findBestMatch = function (query, callback) {
		var match = null;

		self.search(query, function (err, result) {
			if (err) {
				return callback(err);
			}

			/*jshint camelcase:false */
			if (result.info.num_results > 0) {
				match = closestMatch(query, result.tracks);
			}

			return callback(null, match);
		});
	};

	self.search = function (options, query, callback) {
		if (typeof callback === 'undefined' && typeof query === 'function') {
			callback = query;
			query = options;
			options = {};
		}

		var result = {};

		// sanitize query
		query = sanitize(query);

		request({
			method : 'GET',
			qs : {
				page : options.page || 1,
				q : query
			},
			timeout : self.options.timeout,
			uri : self.options.searchUrl
		}, function (err, res, body) {
			if (err) {
				return callback(err);
			}

			if (res.statusCode >= 200 && res.statusCode <= 299) {
				if (body) {
					try {
						result = JSON.parse(body);
					} catch (ex) {
						ex.body = body;
						return callback(ex);
					}

					return callback(null, result);
				}
			}

			return callback(new Error(body));
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
