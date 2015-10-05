'use strict';

/**
* FUNCTION: locals( request, response, next )
*	Appends a `locals` object for storing local request variables shared among middleware.
*
* @param {Object} request - HTTP request object
* @param {Object} response - HTTP response object
* @param {Function} next - callback to invoke once finished
* @returns {Void}
*/
function locals( request, response, next ) {
	if ( request.locals === void 0 ) {
		request.locals = {};
	}
	next();
} // end FUNCTION locals()


// EXPORTS //

module.exports = locals;
