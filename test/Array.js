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

	it('Should return a shallow copy of an array with a value replaced', () => {
		const originalArray = [ 1, 2, 3 ]
		const newArray = originalArray.replace(1, 5)

		deepStrictEqual(newArray, [ 1, 5, 3 ])
		deepStrictEqual(originalArray, [ 1, 2, 3 ]) // Copy was shallow
	})
})