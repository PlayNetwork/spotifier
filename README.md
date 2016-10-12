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
