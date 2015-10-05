/* global require, describe, it */
'use strict';

// MODULES //

var chai = require( 'chai' ),
	locals = require( './../lib' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'connect-locals', function tests() {

	it( 'should export a function', function test() {
		expect( locals ).to.be.a( 'function' );
	});

	it( 'should have an arity of 3', function test() {
		assert.strictEqual( locals.length, 3 );
	});

	it( 'should append a `locals` object to a request object', function test( done ) {
		var req = {},
			res = {};

		locals( req, res, next );

		function next() {
			assert.property( req, 'locals' );
			assert.isObject( req.locals );
			done();
		}
	});

	it( 'should not overwrite an existing `locals` object', function test( done ) {
		var loc = {},
			req = {},
			res = {};

		req.locals = loc;

		locals( req, res, next );

		function next() {
			assert.strictEqual( req.locals, loc );
			done();
		}
	});

});
