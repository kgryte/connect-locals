Locals
===
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status][codecov-image]][codecov-url] [![Dependencies][dependencies-image]][dependencies-url]

> [Connect](https://github.com/senchalabs/connect)/[Express](http://expressjs.com/) middleware which appends a locals object for scoped request variables.


## Installation

``` bash
$ npm install connect-locals
```


## Usage

``` javascript
var locals = require( 'connect-locals' );
```

#### locals( request, response, next )

[Connect](https://github.com/senchalabs/connect)/[Express](http://expressjs.com/) middleware which appends a locals `object` for scoped request variables.

``` javascript
var app = require( 'express' )();

app.use( locals );
```

## Notes

*	If a `request` object already has a __defined__ `locals` property, the middleware does __not__ overwrite the existing value.
*	The intent of the `locals` object is similar to Express' [res.locals](http://expressjs.com/api.html#res.locals), except the latter is primarily for populating view templates. This module helps avoid possible collisions and separate concerns.
*	To ensure that the `locals` object is available to all subsequent middleware, mount the middleware at the top of the middleware stack.

	``` javascript
	var app = require( 'express' )();

	app.use( locals );
	app.use( logger );
	app.get( '/', main );
	app.get( '/foo', foo );
	app.get( '/bar', bar );
	```


## Examples

``` javascript
var express = require( 'express' ),
	request = require( 'request' ),
	locals = require( 'connect-locals' );

function db( req, res, next ) {
	process.nextTick( onTick );
	function onTick() {
		req.locals.data = 'beep';
		next();
	}
}

function transform( req, res, next ) {
	req.locals.data = req.locals.data.replace( /ee/, 'oo' );
	next();
}

function send( req, res, next ) {
	res.send( req.locals.data );
	next();
}

function onListen() {
	request({
		'method': 'GET',
		'uri': 'http://127.0.0.1:7331'
	}, onResponse );
}

function onResponse( err, res, body ) {
	if ( err ) {
		throw err;
	}
	console.log( 'Response status: %s.', res.statusCode );
	console.log( 'Response body: %s.', body );
	process.exit( 0 );
}

var app = express();
app.use( locals );
app.get( '/', db, transform, send );
app.listen( 7331, onListen );
```

To run the example code from the top-level application directory,

``` bash
$ node ./examples/index.js
```


## Tests

### Unit

Unit tests use the [Mocha](http://mochajs.org/) test framework with [Chai](http://chaijs.com) assertions. To run the tests, execute the following command in the top-level application directory:

``` bash
$ make test
```

All new feature development should have corresponding unit tests to validate correct functionality.


### Test Coverage

This repository uses [Istanbul](https://github.com/gotwarlost/istanbul) as its code coverage tool. To generate a test coverage report, execute the following command in the top-level application directory:

``` bash
$ make test-cov
```

Istanbul creates a `./reports/coverage` directory. To access an HTML version of the report,

``` bash
$ make view-cov
```


---
## License

[MIT license](http://opensource.org/licenses/MIT).


## Copyright

Copyright &copy; 2015. Athan Reines.


[npm-image]: http://img.shields.io/npm/v/connect-locals.svg
[npm-url]: https://npmjs.org/package/connect-locals

[travis-image]: http://img.shields.io/travis/kgryte/connect-locals/master.svg
[travis-url]: https://travis-ci.org/kgryte/connect-locals

[codecov-image]: https://img.shields.io/codecov/c/github/kgryte/connect-locals/master.svg
[codecov-url]: https://codecov.io/github/kgryte/connect-locals?branch=master

[dependencies-image]: http://img.shields.io/david/kgryte/connect-locals.svg
[dependencies-url]: https://david-dm.org/kgryte/connect-locals

[dev-dependencies-image]: http://img.shields.io/david/dev/kgryte/connect-locals.svg
[dev-dependencies-url]: https://david-dm.org/dev/kgryte/connect-locals

[github-issues-image]: http://img.shields.io/github/issues/kgryte/connect-locals.svg
[github-issues-url]: https://github.com/kgryte/connect-locals/issues
