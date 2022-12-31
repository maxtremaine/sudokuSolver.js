const assert = require('assert').deepStrictEqual
require('../src/Array')

describe('Added Array Methods', () => {
	it('Should return missing digits from an array', () => {
		assert([ 1, 2, 3 ].getMissingDigits(), [ 4, 5, 6, 7, 8, 9 ])
		assert([ 10, 5, 'hi', false ].getMissingDigits(), [ 1, 2, 3, 4, 6, 7, 8, 9 ])
	})
})