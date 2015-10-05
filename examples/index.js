'use strict';

var express = require( 'express' ),
	request = require( 'request' ),
	locals = require( './../lib' );

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
