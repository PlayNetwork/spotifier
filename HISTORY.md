# v0.3.6 - 2016.10.12

* Added support for `market` when searching

# v0.3.5 - 2016.05.12

* Removed extraneous diagnostic code

# v0.3.4 - 2016.05.12

* Relaxed sanitization routined used to clean up search terms prior to sending to the Spotify API (no longer filtering out `(` and `)` characters)

# v0.3.3 - 2015.01.14

* Relaxed sanitization routine used to clean up search terms prior to sending to the Spotify API (no longer filtering out `*` characters)

# v0.3.2 - 2015.12.11

* Added support for returning multiple closest matches for when multiple Spotify tracks match the same ISRC or the same artist and title

# v0.3.1 - 2015.11.04

* Reworked how errors are returned when captured from Spotify API

# v0.3.0 - 2015.11.04

* Breaking interface change - search and findBestMatch accept `params` object now
* Added support for lookup based on ISRC code
* Added support for [Spotify Web API Client Credentials ](https://developer.spotify.com/web-api/authorization-guide/#client_credentials_flow)

# v0.2.1 - 2014.12.03

* Updating sanitize internal function to filter less - fixes defect where occaisionally title and artist was blank

# v0.2.0 - 2014.10.22

* Simplify response from search
* Added support for search result limit
* Added support for start index (rather than page) on search
* Changed query interface to support artist and title explicitly
* Updated to use newer version of Spotify search API

# v0.1.1 - 2014.10.22

* Renamed internal constructor to reflect module name
* Updated dependencies
* Add repository for package.json file

# v0.1.0 - 2014.05.22

* Initial release
