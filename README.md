# Spotifier

Simple Spotify search library that provides song search and best match retrieval from the Spotify API

## Install

```bash
npm install spotifier
```

## Usage:

In your code, require the `spotifier` module as follows:

### Artist and Track search

```javascript
var spotifier = require('spotifier');

var
  client = spotifier(),
  params = {
    artist : 'foo fighters',
    title : 'breakout'
  };

client.search(params, function (err, result) {
  // work with results here...
});
```

### ISRC search

```javascript
var spotifier = require('spotifier');

var
  client = spotifier(),
  params = {
    isrc : 'USWB10303069'
  };

client.search(params, function (err, result) {
  // work with results here...
});
```

### Options:

* authorizationUrl - URL of authorization endpoint (defaults to `https://accounts.spotify.com/api/token`)
* clientId - Optional - when specified, client credentials are authenticated and the resulting access token is used for subsequent search requests
* clientSecret - Optional - when specified, client credentials are authenticated and the resulting access token is used for subsequent search requests
* market - Optional - when specified, searches for matching tracks will utilize the specified market
* searchResultLimit - Limit of results to return (defaults to 10)
* searchUrl - URL of API endpoint (defaults to `https://api.spotify.com/v1/search`)
* timeout - Timeout for request in milliseconds (defaults to `10000`)

```javascript
var spotifier = require('spotifier');

var client = spotifier({
  albumUrl : 'https://api.spotify.com/v1/albums',
  authorizationUrl : 'https://accounts.spotify.com/api/token',
  clientId : '<client_id value here>',
  clientSecret : '<client_secret value here>',
  searchResultLimit : 10,
  searchUrl : 'https://api.spotify.com/v1/search',
  timeout : 10000
});
```

### Find Best Match

Find the best match (or matches) for a search:

`client.findBestMatch(options, params, callback)`

Where options is an _optional_ object supporting the following fields:

+ `multi` _(optional, boolean)_ - defaults to `false`, when `true` all the closest matches are returned as an array

Where params is an object supporting the following fields:

+ `isrc` _(optional, string)_ - when specified, performs an ISRC search with Spotify
+ `artist` _(optional, string)_ - when specified (instead of `isrc`) performs an artist and title search with Spotify
+ `title` _(optional, string)_ - when specified (instead of `isrc`) performs an artist and title search with Spotify
+ `market` _(optional, string)_ - when specified, performs a search with with the specified market

```javascript
var
  client = (require('spotifier')()),
  options = {
    multi : false
  },
  params = {
    artist : 'foo fighters',
    title : 'breakout'
  };

client.findBestMatch(options, params, function (err, result) {
  if (err) {
    console.error(err);
  }

  console.log(result);
});
```

Which returns the following response:

```javascript
{ album:
   { album_type: 'album',
     available_markets:
      [ 'AD',
        'AR',
        'AT',
        'AU',
        'BE',
        'BG',
        'BO',
        'BR',
        'CH',
        'CL',
        'CO',
        'CR',
        'CY',
        'CZ',
        'DE',
        'DK',
        'DO',
        'EC',
        'EE',
        'ES',
        'FI',
        'FR',
        'GB',
        'GR',
        'GT',
        'HK',
        'HN',
        'HU',
        'IE',
        'IS',
        'IT',
        'LI',
        'LT',
        'LU',
        'LV',
        'MC',
        'MY',
        'NI',
        'NL',
        'NO',
        'NZ',
        'PA',
        'PE',
        'PH',
        'PL',
        'PT',
        'PY',
        'RO',
        'SE',
        'SG',
        'SI',
        'SK',
        'SV',
        'TR',
        'TW',
        'UY' ],
     external_urls: { spotify: 'https://open.spotify.com/album/7MKi8PuCX5QJtaG9wLbOI2' },
     href: 'https://api.spotify.com/v1/albums/7MKi8PuCX5QJtaG9wLbOI2',
     id: '7MKi8PuCX5QJtaG9wLbOI2',
     images: [ [Object], [Object], [Object] ],
     name: 'Mellow Gold',
     type: 'album',
     uri: 'spotify:album:7MKi8PuCX5QJtaG9wLbOI2' },
  artists:
   [ { external_urls: [Object],
       href: 'https://api.spotify.com/v1/artists/3vbKDsSS70ZX9D2OcvbZmS',
       id: '3vbKDsSS70ZX9D2OcvbZmS',
       name: 'Beck',
       type: 'artist',
       uri: 'spotify:artist:3vbKDsSS70ZX9D2OcvbZmS' } ],
  available_markets:
   [ 'AD',
     'AR',
     'AT',
     'AU',
     'BE',
     'BG',
     'BO',
     'BR',
     'CH',
     'CL',
     'CO',
     'CR',
     'CY',
     'CZ',
     'DE',
     'DK',
     'DO',
     'EC',
     'EE',
     'ES',
     'FI',
     'FR',
     'GB',
     'GR',
     'GT',
     'HK',
     'HN',
     'HU',
     'IE',
     'IS',
     'IT',
     'LI',
     'LT',
     'LU',
     'LV',
     'MC',
     'MY',
     'NI',
     'NL',
     'NO',
     'NZ',
     'PA',
     'PE',
     'PH',
     'PL',
     'PT',
     'PY',
     'RO',
     'SE',
     'SG',
     'SI',
     'SK',
     'SV',
     'TR',
     'TW',
     'UY' ],
  disc_number: 1,
  duration_ms: 234960,
  explicit: false,
  external_ids: { isrc: 'USGF19463401' },
  external_urls: { spotify: 'https://open.spotify.com/track/4b8GTae6rqb9oPiRzVa3Gy' },
  href: 'https://api.spotify.com/v1/tracks/4b8GTae6rqb9oPiRzVa3Gy',
  id: '4b8GTae6rqb9oPiRzVa3Gy',
  name: 'Loser',
  popularity: 67,
  preview_url: 'https://p.scdn.co/mp3-preview/5efa81cf9d4d2bc26407e928a0a150a7bc4ecc66',
  track_number: 1,
  type: 'track',
  uri: 'spotify:track:4b8GTae6rqb9oPiRzVa3Gy' }
```

### Search

Find all matches for a search:

`client.search(options, params, callback)`

_Please note, the `options` parameter is optional and can be omitted_

```javascript
var
  client = (require('spotifier')()),
  options = {
    limit : 2,
    start : 0
  },
  params = {
    artist : 'beck',
    title : 'loser'
  };

client.search(options, params, function (err, result) {
  if (err) {
    console.error(err);
  }

  console.log(result);
});
```

Which returns the following response:

```javascript
{
  "href": "https://api.spotify.com/v1/search?query=artist%3Abeck+track%3Aloser&offset=0&limit=2&type=track",
  "items": [
    {
      "album": {
        "album_type": "album",
        "available_markets": [
          "AD",
          "AR",
          "AT",
          "AU",
          "BE",
          "BG",
          "BO",
          "BR",
          "CH",
          "CL",
          "CO",
          "CR",
          "CY",
          "CZ",
          "DE",
          "DK",
          "DO",
          "EC",
          "EE",
          "ES",
          "FI",
          "FR",
          "GB",
          "GR",
          "GT",
          "HK",
          "HN",
          "HU",
          "IE",
          "IS",
          "IT",
          "LI",
          "LT",
          "LU",
          "LV",
          "MC",
          "MY",
          "NI",
          "NL",
          "NO",
          "NZ",
          "PA",
          "PE",
          "PH",
          "PL",
          "PT",
          "PY",
          "RO",
          "SE",
          "SG",
          "SI",
          "SK",
          "SV",
          "TR",
          "TW",
          "UY"
        ],
        "external_urls": {
          "spotify": "https://open.spotify.com/album/7MKi8PuCX5QJtaG9wLbOI2"
        },
        "href": "https://api.spotify.com/v1/albums/7MKi8PuCX5QJtaG9wLbOI2",
        "id": "7MKi8PuCX5QJtaG9wLbOI2",
        "images": [
          {
            "height": 638,
            "url": "https://i.scdn.co/image/2f4e58958061664dbe1666936dab319c70398d8b",
            "width": 640
          },
          {
            "height": 299,
            "url": "https://i.scdn.co/image/0f057142f11c251f81a22ca639b7261530b280b2",
            "width": 300
          },
          {
            "height": 64,
            "url": "https://i.scdn.co/image/03e3cfd4c4de65a906dfa50a7e11203994935639",
            "width": 64
          }
        ],
        "name": "Mellow Gold",
        "type": "album",
        "uri": "spotify:album:7MKi8PuCX5QJtaG9wLbOI2"
      },
      "artists": [
        {
          "external_urls": {
            "spotify": "https://open.spotify.com/artist/3vbKDsSS70ZX9D2OcvbZmS"
          },
          "href": "https://api.spotify.com/v1/artists/3vbKDsSS70ZX9D2OcvbZmS",
          "id": "3vbKDsSS70ZX9D2OcvbZmS",
          "name": "Beck",
          "type": "artist",
          "uri": "spotify:artist:3vbKDsSS70ZX9D2OcvbZmS"
        }
      ],
      "available_markets": [
        "AD",
        "AR",
        "AT",
        "AU",
        "BE",
        "BG",
        "BO",
        "BR",
        "CH",
        "CL",
        "CO",
        "CR",
        "CY",
        "CZ",
        "DE",
        "DK",
        "DO",
        "EC",
        "EE",
        "ES",
        "FI",
        "FR",
        "GB",
        "GR",
        "GT",
        "HK",
        "HN",
        "HU",
        "IE",
        "IS",
        "IT",
        "LI",
        "LT",
        "LU",
        "LV",
        "MC",
        "MY",
        "NI",
        "NL",
        "NO",
        "NZ",
        "PA",
        "PE",
        "PH",
        "PL",
        "PT",
        "PY",
        "RO",
        "SE",
        "SG",
        "SI",
        "SK",
        "SV",
        "TR",
        "TW",
        "UY"
      ],
      "disc_number": 1,
      "duration_ms": 234960,
      "explicit": false,
      "external_ids": {
        "isrc": "USGF19463401"
      },
      "external_urls": {
        "spotify": "https://open.spotify.com/track/4b8GTae6rqb9oPiRzVa3Gy"
      },
      "href": "https://api.spotify.com/v1/tracks/4b8GTae6rqb9oPiRzVa3Gy",
      "id": "4b8GTae6rqb9oPiRzVa3Gy",
      "name": "Loser",
      "popularity": 67,
      "preview_url": "https://p.scdn.co/mp3-preview/5efa81cf9d4d2bc26407e928a0a150a7bc4ecc66",
      "track_number": 1,
      "type": "track",
      "uri": "spotify:track:4b8GTae6rqb9oPiRzVa3Gy"
    },
    {
      "album": {
        "album_type": "album",
        "available_markets": [
          "DE",
          "NO"
        ],
        "external_urls": {
          "spotify": "https://open.spotify.com/album/5fS7PzCkR0JLMKpNbvs1s9"
        },
        "href": "https://api.spotify.com/v1/albums/5fS7PzCkR0JLMKpNbvs1s9",
        "id": "5fS7PzCkR0JLMKpNbvs1s9",
        "images": [
          {
            "height": 640,
            "url": "https://i.scdn.co/image/b483c13fc566fff9f3ce6b195899c55f25277e9f",
            "width": 640
          },
          {
            "height": 300,
            "url": "https://i.scdn.co/image/2f919a375df9494d3071a3fb504ff805815cf3e9",
            "width": 300
          },
          {
            "height": 64,
            "url": "https://i.scdn.co/image/a459491722d38f8c75f0390eb5d03ff85b8f6f73",
            "width": 64
          }
        ],
        "name": "Rock",
        "type": "album",
        "uri": "spotify:album:5fS7PzCkR0JLMKpNbvs1s9"
      },
      "artists": [
        {
          "external_urls": {
            "spotify": "https://open.spotify.com/artist/3vbKDsSS70ZX9D2OcvbZmS"
          },
          "href": "https://api.spotify.com/v1/artists/3vbKDsSS70ZX9D2OcvbZmS",
          "id": "3vbKDsSS70ZX9D2OcvbZmS",
          "name": "Beck",
          "type": "artist",
          "uri": "spotify:artist:3vbKDsSS70ZX9D2OcvbZmS"
        }
      ],
      "available_markets": [
        "DE",
        "NO"
      ],
      "disc_number": 1,
      "duration_ms": 235706,
      "explicit": false,
      "external_ids": {
        "isrc": "USGF19463401"
      },
      "external_urls": {
        "spotify": "https://open.spotify.com/track/2m9cDUawCW5SfnpwHWtJJi"
      },
      "href": "https://api.spotify.com/v1/tracks/2m9cDUawCW5SfnpwHWtJJi",
      "id": "2m9cDUawCW5SfnpwHWtJJi",
      "name": "Loser",
      "popularity": 18,
      "preview_url": "https://p.scdn.co/mp3-preview/7ce39a2bd416792154386a9850ee813b25f21898",
      "track_number": 4,
      "type": "track",
      "uri": "spotify:track:2m9cDUawCW5SfnpwHWtJJi"
    }
  ],
  "limit": 2,
  "next": "https://api.spotify.com/v1/search?query=artist%3Abeck+track%3Aloser&offset=2&limit=2&type=track",
  "offset": 0,
  "previous": null,
  "total": 9
}
```

### Lookup Album

Retrieve a specific album from Spotify based on ID:

`client.lookupAlbum(options, albumId, callback)`

_Please note, the `options` parameter is optional and can be omitted_

```javascript
var client = (require('spotifier')());

client.search(options, '0lw68yx3MhKflWFqCsGkIs', function (err, result) {
  if (err) {
    console.error(err);
  }

  console.log(result);
});
```

Which returns the following response:

```javascript
{
  "album_type" : "album",
  "artists" : [ {
    "external_urls" : {
      "spotify" : "https://open.spotify.com/artist/12Chz98pHFMPJEknJQMWvI"
    },
    "href" : "https://api.spotify.com/v1/artists/12Chz98pHFMPJEknJQMWvI",
    "id" : "12Chz98pHFMPJEknJQMWvI",
    "name" : "Muse",
    "type" : "artist",
    "uri" : "spotify:artist:12Chz98pHFMPJEknJQMWvI"
  } ],
  "available_markets" : [ "AD", "AR", "AT", "AU", "BE", "BG", "BO", "BR", "CA", "CH", "CL", "CO", "CR", "CY", "CZ", "DE", "DK", "DO", "EC", "EE", "ES", "FI", "FR", "GB", "GR", "GT", "HK", "HN", "HU", "ID", "IE", "IS", "IT", "JP", "LI", "LT", "LU", "LV", "MC", "MT", "MX", "MY", "NI", "NL", "NO", "NZ", "PA", "PE", "PH", "PL", "PT", "PY", "SE", "SG", "SK", "SV", "TH", "TR", "TW", "US", "UY", "VN" ],
  "copyrights" : [ {
    "text" : "2006 A&E Records Limited",
    "type" : "C"
  }, {
    "text" : "2006 A&E Records Limited",
    "type" : "P"
  } ],
  "external_ids" : {
    "upc" : "825646911486"
  },
  "external_urls" : {
    "spotify" : "https://open.spotify.com/album/0lw68yx3MhKflWFqCsGkIs"
  },
  "genres" : [ ],
  "href" : "https://api.spotify.com/v1/albums/0lw68yx3MhKflWFqCsGkIs",
  "id" : "0lw68yx3MhKflWFqCsGkIs",
  "images" : [ {
    "height" : 640,
    "url" : "https://i.scdn.co/image/9e5288926fadb82f873ccf2b45300c3a6f65fa14",
    "width" : 640
  }, {
    "height" : 300,
    "url" : "https://i.scdn.co/image/f1cad0d6974d6236abd07a59106e8450d85cae24",
    "width" : 300
  }, {
    "height" : 64,
    "url" : "https://i.scdn.co/image/81a3f82578dc938c53efdcb405f6a3d3ebbf009f",
    "width" : 64
  } ],
  "label" : "Warner Bros.",
  "name" : "Black Holes And Revelations (Updated 09 version)",
  "popularity" : 75,
  "release_date" : "2006-06-19",
  "release_date_precision" : "day",
  "tracks" : {
    "href" : "https://api.spotify.com/v1/albums/0lw68yx3MhKflWFqCsGkIs/tracks?offset=0&limit=50",
    "items" : [ {
      "artists" : [ {
        "external_urls" : {
          "spotify" : "https://open.spotify.com/artist/12Chz98pHFMPJEknJQMWvI"
        },
        "href" : "https://api.spotify.com/v1/artists/12Chz98pHFMPJEknJQMWvI",
        "id" : "12Chz98pHFMPJEknJQMWvI",
        "name" : "Muse",
        "type" : "artist",
        "uri" : "spotify:artist:12Chz98pHFMPJEknJQMWvI"
      } ],
      "available_markets" : [ "AD", "AR", "AT", "AU", "BE", "BG", "BO", "BR", "CA", "CH", "CL", "CO", "CR", "CY", "CZ", "DE", "DK", "DO", "EC", "EE", "ES", "FI", "FR", "GB", "GR", "GT", "HK", "HN", "HU", "ID", "IE", "IS", "IT", "JP", "LI", "LT", "LU", "LV", "MC", "MT", "MX", "MY", "NI", "NL", "NO", "NZ", "PA", "PE", "PH", "PL", "PT", "PY", "SE", "SG", "SK", "SV", "TH", "TR", "TW", "US", "UY", "VN" ],
      "disc_number" : 1,
      "duration_ms" : 275493,
      "explicit" : false,
      "external_urls" : {
        "spotify" : "https://open.spotify.com/track/4jrCMOG9OPe6iF4vWFxatb"
      },
      "href" : "https://api.spotify.com/v1/tracks/4jrCMOG9OPe6iF4vWFxatb",
      "id" : "4jrCMOG9OPe6iF4vWFxatb",
      "name" : "Take a Bow",
      "preview_url" : "https://p.scdn.co/mp3-preview/4bf1c1a08cbf12759a37ba2b1f664b4b2cca9a31?cid=8897482848704f2a8f8d7c79726a70d4",
      "track_number" : 1,
      "type" : "track",
      "uri" : "spotify:track:4jrCMOG9OPe6iF4vWFxatb"
    }, {
      "artists" : [ {
        "external_urls" : {
          "spotify" : "https://open.spotify.com/artist/12Chz98pHFMPJEknJQMWvI"
        },
        "href" : "https://api.spotify.com/v1/artists/12Chz98pHFMPJEknJQMWvI",
        "id" : "12Chz98pHFMPJEknJQMWvI",
        "name" : "Muse",
        "type" : "artist",
        "uri" : "spotify:artist:12Chz98pHFMPJEknJQMWvI"
      } ],
      "available_markets" : [ "AD", "AR", "AT", "AU", "BE", "BG", "BO", "BR", "CA", "CH", "CL", "CO", "CR", "CY", "CZ", "DE", "DK", "DO", "EC", "EE", "ES", "FI", "FR", "GB", "GR", "GT", "HK", "HN", "HU", "ID", "IE", "IS", "IT", "JP", "LI", "LT", "LU", "LV", "MC", "MT", "MX", "MY", "NI", "NL", "NO", "NZ", "PA", "PE", "PH", "PL", "PT", "PY", "SE", "SG", "SK", "SV", "TH", "TR", "TW", "US", "UY", "VN" ],
      "disc_number" : 1,
      "duration_ms" : 240213,
      "explicit" : false,
      "external_urls" : {
        "spotify" : "https://open.spotify.com/track/3skn2lauGk7Dx6bVIt5DVj"
      },
      "href" : "https://api.spotify.com/v1/tracks/3skn2lauGk7Dx6bVIt5DVj",
      "id" : "3skn2lauGk7Dx6bVIt5DVj",
      "name" : "Starlight",
      "preview_url" : "https://p.scdn.co/mp3-preview/f7a1b8a270f310e43ced2720c9af5f29f6476b79?cid=8897482848704f2a8f8d7c79726a70d4",
      "track_number" : 2,
      "type" : "track",
      "uri" : "spotify:track:3skn2lauGk7Dx6bVIt5DVj"
    }, {
      "artists" : [ {
        "external_urls" : {
          "spotify" : "https://open.spotify.com/artist/12Chz98pHFMPJEknJQMWvI"
        },
        "href" : "https://api.spotify.com/v1/artists/12Chz98pHFMPJEknJQMWvI",
        "id" : "12Chz98pHFMPJEknJQMWvI",
        "name" : "Muse",
        "type" : "artist",
        "uri" : "spotify:artist:12Chz98pHFMPJEknJQMWvI"
      } ],
      "available_markets" : [ "AD", "AR", "AT", "AU", "BE", "BG", "BO", "BR", "CA", "CH", "CL", "CO", "CR", "CY", "CZ", "DE", "DK", "DO", "EC", "EE", "ES", "FI", "FR", "GB", "GR", "GT", "HK", "HN", "HU", "ID", "IE", "IS", "IT", "JP", "LI", "LT", "LU", "LV", "MC", "MT", "MX", "MY", "NI", "NL", "NO", "NZ", "PA", "PE", "PH", "PL", "PT", "PY", "SE", "SG", "SK", "SV", "TH", "TR", "TW", "US", "UY", "VN" ],
      "disc_number" : 1,
      "duration_ms" : 212439,
      "explicit" : false,
      "external_urls" : {
        "spotify" : "https://open.spotify.com/track/3lPr8ghNDBLc2uZovNyLs9"
      },
      "href" : "https://api.spotify.com/v1/tracks/3lPr8ghNDBLc2uZovNyLs9",
      "id" : "3lPr8ghNDBLc2uZovNyLs9",
      "name" : "Supermassive Black Hole",
      "preview_url" : "https://p.scdn.co/mp3-preview/7ab3e38ce1671da3a185d8685981983a6f39b7bd?cid=8897482848704f2a8f8d7c79726a70d4",
      "track_number" : 3,
      "type" : "track",
      "uri" : "spotify:track:3lPr8ghNDBLc2uZovNyLs9"
    }, {
      "artists" : [ {
        "external_urls" : {
          "spotify" : "https://open.spotify.com/artist/12Chz98pHFMPJEknJQMWvI"
        },
        "href" : "https://api.spotify.com/v1/artists/12Chz98pHFMPJEknJQMWvI",
        "id" : "12Chz98pHFMPJEknJQMWvI",
        "name" : "Muse",
        "type" : "artist",
        "uri" : "spotify:artist:12Chz98pHFMPJEknJQMWvI"
      } ],
      "available_markets" : [ "AD", "AR", "AT", "AU", "BE", "BG", "BO", "BR", "CA", "CH", "CL", "CO", "CR", "CY", "CZ", "DE", "DK", "DO", "EC", "EE", "ES", "FI", "FR", "GB", "GR", "GT", "HK", "HN", "HU", "ID", "IE", "IS", "IT", "JP", "LI", "LT", "LU", "LV", "MC", "MT", "MX", "MY", "NI", "NL", "NO", "NZ", "PA", "PE", "PH", "PL", "PT", "PY", "SE", "SG", "SK", "SV", "TH", "TR", "TW", "US", "UY", "VN" ],
      "disc_number" : 1,
      "duration_ms" : 258066,
      "explicit" : false,
      "external_urls" : {
        "spotify" : "https://open.spotify.com/track/5YXr4AGfUQpLSxtFSsKUh6"
      },
      "href" : "https://api.spotify.com/v1/tracks/5YXr4AGfUQpLSxtFSsKUh6",
      "id" : "5YXr4AGfUQpLSxtFSsKUh6",
      "name" : "Map Of The Problematique",
      "preview_url" : "https://p.scdn.co/mp3-preview/acb5b1b0522237f021af432207d61ca0fca28d48?cid=8897482848704f2a8f8d7c79726a70d4",
      "track_number" : 4,
      "type" : "track",
      "uri" : "spotify:track:5YXr4AGfUQpLSxtFSsKUh6"
    }, {
      "artists" : [ {
        "external_urls" : {
          "spotify" : "https://open.spotify.com/artist/12Chz98pHFMPJEknJQMWvI"
        },
        "href" : "https://api.spotify.com/v1/artists/12Chz98pHFMPJEknJQMWvI",
        "id" : "12Chz98pHFMPJEknJQMWvI",
        "name" : "Muse",
        "type" : "artist",
        "uri" : "spotify:artist:12Chz98pHFMPJEknJQMWvI"
      } ],
      "available_markets" : [ "AD", "AR", "AT", "AU", "BE", "BG", "BO", "BR", "CA", "CH", "CL", "CO", "CR", "CY", "CZ", "DE", "DK", "DO", "EC", "EE", "ES", "FI", "FR", "GB", "GR", "GT", "HK", "HN", "HU", "ID", "IE", "IS", "IT", "JP", "LI", "LT", "LU", "LV", "MC", "MT", "MX", "MY", "NI", "NL", "NO", "NZ", "PA", "PE", "PH", "PL", "PT", "PY", "SE", "SG", "SK", "SV", "TH", "TR", "TW", "US", "UY", "VN" ],
      "disc_number" : 1,
      "duration_ms" : 124706,
      "explicit" : false,
      "external_urls" : {
        "spotify" : "https://open.spotify.com/track/6jH5aCuXgtygWpx7BF54at"
      },
      "href" : "https://api.spotify.com/v1/tracks/6jH5aCuXgtygWpx7BF54at",
      "id" : "6jH5aCuXgtygWpx7BF54at",
      "name" : "Soldier's Poem",
      "preview_url" : "https://p.scdn.co/mp3-preview/2193b335877279db108c41d6a1f86e3694754fb7?cid=8897482848704f2a8f8d7c79726a70d4",
      "track_number" : 5,
      "type" : "track",
      "uri" : "spotify:track:6jH5aCuXgtygWpx7BF54at"
    }, {
      "artists" : [ {
        "external_urls" : {
          "spotify" : "https://open.spotify.com/artist/12Chz98pHFMPJEknJQMWvI"
        },
        "href" : "https://api.spotify.com/v1/artists/12Chz98pHFMPJEknJQMWvI",
        "id" : "12Chz98pHFMPJEknJQMWvI",
        "name" : "Muse",
        "type" : "artist",
        "uri" : "spotify:artist:12Chz98pHFMPJEknJQMWvI"
      } ],
      "available_markets" : [ "AD", "AR", "AT", "AU", "BE", "BG", "BO", "BR", "CA", "CH", "CL", "CO", "CR", "CY", "CZ", "DE", "DK", "DO", "EC", "EE", "ES", "FI", "FR", "GB", "GR", "GT", "HK", "HN", "HU", "ID", "IE", "IS", "IT", "JP", "LI", "LT", "LU", "LV", "MC", "MT", "MX", "MY", "NI", "NL", "NO", "NZ", "PA", "PE", "PH", "PL", "PT", "PY", "SE", "SG", "SK", "SV", "TH", "TR", "TW", "US", "UY", "VN" ],
      "disc_number" : 1,
      "duration_ms" : 301386,
      "explicit" : false,
      "external_urls" : {
        "spotify" : "https://open.spotify.com/track/2zmR3FG7iOGDAdwrVPzdg9"
      },
      "href" : "https://api.spotify.com/v1/tracks/2zmR3FG7iOGDAdwrVPzdg9",
      "id" : "2zmR3FG7iOGDAdwrVPzdg9",
      "name" : "Invincible",
      "preview_url" : "https://p.scdn.co/mp3-preview/f93f4379b18411389994e4b4eb35d23ab2d3f268?cid=8897482848704f2a8f8d7c79726a70d4",
      "track_number" : 6,
      "type" : "track",
      "uri" : "spotify:track:2zmR3FG7iOGDAdwrVPzdg9"
    }, {
      "artists" : [ {
        "external_urls" : {
          "spotify" : "https://open.spotify.com/artist/12Chz98pHFMPJEknJQMWvI"
        },
        "href" : "https://api.spotify.com/v1/artists/12Chz98pHFMPJEknJQMWvI",
        "id" : "12Chz98pHFMPJEknJQMWvI",
        "name" : "Muse",
        "type" : "artist",
        "uri" : "spotify:artist:12Chz98pHFMPJEknJQMWvI"
      } ],
      "available_markets" : [ "AD", "AR", "AT", "AU", "BE", "BG", "BO", "BR", "CA", "CH", "CL", "CO", "CR", "CY", "CZ", "DE", "DK", "DO", "EC", "EE", "ES", "FI", "FR", "GB", "GR", "GT", "HK", "HN", "HU", "ID", "IE", "IS", "IT", "JP", "LI", "LT", "LU", "LV", "MC", "MT", "MX", "MY", "NI", "NL", "NO", "NZ", "PA", "PE", "PH", "PL", "PT", "PY", "SE", "SG", "SK", "SV", "TH", "TR", "TW", "US", "UY", "VN" ],
      "disc_number" : 1,
      "duration_ms" : 211133,
      "explicit" : false,
      "external_urls" : {
        "spotify" : "https://open.spotify.com/track/6JnFVmPyJvjnfBag0hhIFa"
      },
      "href" : "https://api.spotify.com/v1/tracks/6JnFVmPyJvjnfBag0hhIFa",
      "id" : "6JnFVmPyJvjnfBag0hhIFa",
      "name" : "Assassin",
      "preview_url" : "https://p.scdn.co/mp3-preview/9f96a064e83af3eaea21198c853b430923b3a0ce?cid=8897482848704f2a8f8d7c79726a70d4",
      "track_number" : 7,
      "type" : "track",
      "uri" : "spotify:track:6JnFVmPyJvjnfBag0hhIFa"
    }, {
      "artists" : [ {
        "external_urls" : {
          "spotify" : "https://open.spotify.com/artist/12Chz98pHFMPJEknJQMWvI"
        },
        "href" : "https://api.spotify.com/v1/artists/12Chz98pHFMPJEknJQMWvI",
        "id" : "12Chz98pHFMPJEknJQMWvI",
        "name" : "Muse",
        "type" : "artist",
        "uri" : "spotify:artist:12Chz98pHFMPJEknJQMWvI"
      } ],
      "available_markets" : [ "AD", "AR", "AT", "AU", "BE", "BG", "BO", "BR", "CA", "CH", "CL", "CO", "CR", "CY", "CZ", "DE", "DK", "DO", "EC", "EE", "ES", "FI", "FR", "GB", "GR", "GT", "HK", "HN", "HU", "ID", "IE", "IS", "IT", "JP", "LI", "LT", "LU", "LV", "MC", "MT", "MX", "MY", "NI", "NL", "NO", "NZ", "PA", "PE", "PH", "PL", "PT", "PY", "SE", "SG", "SK", "SV", "TH", "TR", "TW", "US", "UY", "VN" ],
      "disc_number" : 1,
      "duration_ms" : 233266,
      "explicit" : false,
      "external_urls" : {
        "spotify" : "https://open.spotify.com/track/20vZII9Yu52czI9Fk4p39r"
      },
      "href" : "https://api.spotify.com/v1/tracks/20vZII9Yu52czI9Fk4p39r",
      "id" : "20vZII9Yu52czI9Fk4p39r",
      "name" : "Exo-Politics",
      "preview_url" : "https://p.scdn.co/mp3-preview/14b997110734881fbd26774630b392f100455180?cid=8897482848704f2a8f8d7c79726a70d4",
      "track_number" : 8,
      "type" : "track",
      "uri" : "spotify:track:20vZII9Yu52czI9Fk4p39r"
    }, {
      "artists" : [ {
        "external_urls" : {
          "spotify" : "https://open.spotify.com/artist/12Chz98pHFMPJEknJQMWvI"
        },
        "href" : "https://api.spotify.com/v1/artists/12Chz98pHFMPJEknJQMWvI",
        "id" : "12Chz98pHFMPJEknJQMWvI",
        "name" : "Muse",
        "type" : "artist",
        "uri" : "spotify:artist:12Chz98pHFMPJEknJQMWvI"
      } ],
      "available_markets" : [ "AD", "AR", "AT", "AU", "BE", "BG", "BO", "BR", "CA", "CH", "CL", "CO", "CR", "CY", "CZ", "DE", "DK", "DO", "EC", "EE", "ES", "FI", "FR", "GB", "GR", "GT", "HK", "HN", "HU", "ID", "IE", "IS", "IT", "JP", "LI", "LT", "LU", "LV", "MC", "MT", "MX", "MY", "NI", "NL", "NO", "NZ", "PA", "PE", "PH", "PL", "PT", "PY", "SE", "SG", "SK", "SV", "TH", "TR", "TW", "US", "UY", "VN" ],
      "disc_number" : 1,
      "duration_ms" : 288266,
      "explicit" : false,
      "external_urls" : {
        "spotify" : "https://open.spotify.com/track/3Sno9FE8r2uz8QP0MtnTPL"
      },
      "href" : "https://api.spotify.com/v1/tracks/3Sno9FE8r2uz8QP0MtnTPL",
      "id" : "3Sno9FE8r2uz8QP0MtnTPL",
      "name" : "City Of Delusion",
      "preview_url" : "https://p.scdn.co/mp3-preview/0a0f1335837b7dfdc739897065661af2a66b8bb4?cid=8897482848704f2a8f8d7c79726a70d4",
      "track_number" : 9,
      "type" : "track",
      "uri" : "spotify:track:3Sno9FE8r2uz8QP0MtnTPL"
    }, {
      "artists" : [ {
        "external_urls" : {
          "spotify" : "https://open.spotify.com/artist/12Chz98pHFMPJEknJQMWvI"
        },
        "href" : "https://api.spotify.com/v1/artists/12Chz98pHFMPJEknJQMWvI",
        "id" : "12Chz98pHFMPJEknJQMWvI",
        "name" : "Muse",
        "type" : "artist",
        "uri" : "spotify:artist:12Chz98pHFMPJEknJQMWvI"
      } ],
      "available_markets" : [ "AD", "AR", "AT", "AU", "BE", "BG", "BO", "BR", "CA", "CH", "CL", "CO", "CR", "CY", "CZ", "DE", "DK", "DO", "EC", "EE", "ES", "FI", "FR", "GB", "GR", "GT", "HK", "HN", "HU", "ID", "IE", "IS", "IT", "JP", "LI", "LT", "LU", "LV", "MC", "MT", "MX", "MY", "NI", "NL", "NO", "NZ", "PA", "PE", "PH", "PL", "PT", "PY", "SE", "SG", "SK", "SV", "TH", "TR", "TW", "US", "UY", "VN" ],
      "disc_number" : 1,
      "duration_ms" : 223426,
      "explicit" : false,
      "external_urls" : {
        "spotify" : "https://open.spotify.com/track/0EkE0ripJ9OFNzvZANzo5C"
      },
      "href" : "https://api.spotify.com/v1/tracks/0EkE0ripJ9OFNzvZANzo5C",
      "id" : "0EkE0ripJ9OFNzvZANzo5C",
      "name" : "Hoodoo",
      "preview_url" : "https://p.scdn.co/mp3-preview/0ed8f40196e4a483582c3c5be476cbe427c9faf8?cid=8897482848704f2a8f8d7c79726a70d4",
      "track_number" : 10,
      "type" : "track",
      "uri" : "spotify:track:0EkE0ripJ9OFNzvZANzo5C"
    }, {
      "artists" : [ {
        "external_urls" : {
          "spotify" : "https://open.spotify.com/artist/12Chz98pHFMPJEknJQMWvI"
        },
        "href" : "https://api.spotify.com/v1/artists/12Chz98pHFMPJEknJQMWvI",
        "id" : "12Chz98pHFMPJEknJQMWvI",
        "name" : "Muse",
        "type" : "artist",
        "uri" : "spotify:artist:12Chz98pHFMPJEknJQMWvI"
      } ],
      "available_markets" : [ "AD", "AR", "AT", "AU", "BE", "BG", "BO", "BR", "CA", "CH", "CL", "CO", "CR", "CY", "CZ", "DE", "DK", "DO", "EC", "EE", "ES", "FI", "FR", "GB", "GR", "GT", "HK", "HN", "HU", "ID", "IE", "IS", "IT", "JP", "LI", "LT", "LU", "LV", "MC", "MT", "MX", "MY", "NI", "NL", "NO", "NZ", "PA", "PE", "PH", "PL", "PT", "PY", "SE", "SG", "SK", "SV", "TH", "TR", "TW", "US", "UY", "VN" ],
      "disc_number" : 1,
      "duration_ms" : 366213,
      "explicit" : false,
      "external_urls" : {
        "spotify" : "https://open.spotify.com/track/7ouMYWpwJ422jRcDASZB7P"
      },
      "href" : "https://api.spotify.com/v1/tracks/7ouMYWpwJ422jRcDASZB7P",
      "id" : "7ouMYWpwJ422jRcDASZB7P",
      "name" : "Knights Of Cydonia",
      "preview_url" : "https://p.scdn.co/mp3-preview/d7624ec5f93b6d92c1836a95c40ecce463584f6e?cid=8897482848704f2a8f8d7c79726a70d4",
      "track_number" : 11,
      "type" : "track",
      "uri" : "spotify:track:7ouMYWpwJ422jRcDASZB7P"
    }, {
      "artists" : [ {
        "external_urls" : {
          "spotify" : "https://open.spotify.com/artist/12Chz98pHFMPJEknJQMWvI"
        },
        "href" : "https://api.spotify.com/v1/artists/12Chz98pHFMPJEknJQMWvI",
        "id" : "12Chz98pHFMPJEknJQMWvI",
        "name" : "Muse",
        "type" : "artist",
        "uri" : "spotify:artist:12Chz98pHFMPJEknJQMWvI"
      } ],
      "available_markets" : [ "AD", "AR", "AT", "AU", "BE", "BG", "BO", "BR", "CA", "CH", "CL", "CO", "CR", "CY", "CZ", "DE", "DK", "DO", "EC", "EE", "ES", "FI", "FR", "GB", "GR", "GT", "HK", "HN", "HU", "ID", "IE", "IS", "IT", "JP", "LI", "LT", "LU", "LV", "MC", "MT", "MX", "MY", "NI", "NL", "NO", "NZ", "PA", "PE", "PH", "PL", "PT", "PY", "SE", "SG", "SK", "SV", "TH", "TR", "TW", "US", "UY", "VN" ],
      "disc_number" : 1,
      "duration_ms" : 281026,
      "explicit" : false,
      "external_urls" : {
        "spotify" : "https://open.spotify.com/track/6IfitwQQ1Gu9g9QnLWDHRY"
      },
      "href" : "https://api.spotify.com/v1/tracks/6IfitwQQ1Gu9g9QnLWDHRY",
      "id" : "6IfitwQQ1Gu9g9QnLWDHRY",
      "name" : "Glorious",
      "preview_url" : "https://p.scdn.co/mp3-preview/b90e4acfaabe6aa18a932a5b95402fc16a4c3eff?cid=8897482848704f2a8f8d7c79726a70d4",
      "track_number" : 12,
      "type" : "track",
      "uri" : "spotify:track:6IfitwQQ1Gu9g9QnLWDHRY"
    } ],
    "limit" : 50,
    "next" : null,
    "offset" : 0,
    "previous" : null,
    "total" : 12
  },
  "type" : "album",
  "uri" : "spotify:album:0lw68yx3MhKflWFqCsGkIs"
}
```