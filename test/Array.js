const { deepStrictEqual } = require('assert')
require('../src/Array')

describe('Added Array Methods', () => {
	it('Should return missing digits from an array', () => {
		deepStrictEqual([ 1, 2, 3 ].getMissingDigits(), [ 4, 5, 6, 7, 8, 9 ])
		deepStrictEqual([ 10, 5, 'hi', false ].getMissingDigits(), [ 1, 2, 3, 4, 6, 7, 8, 9 ])
	})

	it('Should return if an array contains duplicates', () => {
		deepStrictEqual([ 1, 2, 3 ].hasDuplicates(), false)
		deepStrictEqual([ 1, 2, 2, 3 ].hasDuplicates(), true)
	})
})