const { deepStrictEqual } = require('assert')
require('../src/Array')

describe('Array', () => {
	describe('getMissingDigits', () => {
		it('Should return missing digits from an array', () => {
			deepStrictEqual([ 1, 2, 3 ].getMissingDigits(), [ 4, 5, 6, 7, 8, 9 ])
		})
		it('Should work with different types in the array', () => {
			deepStrictEqual([ 10, 5, 'hi', false ].getMissingDigits(), [ 1, 2, 3, 4, 6, 7, 8, 9 ])
		})
	})
	describe('hasDuplicates', () => {
		it('Should return true if an array has duplicates', () => {
			deepStrictEqual([ 1, 2, 2, 3 ].hasDuplicates(), true)
		})
		it('Should return false if an array is all unique', () => {
			deepStrictEqual([ 1, 2, 3 ].hasDuplicates(), false)
		})
	})
	describe('replace', () => {
		const originalArray = [ 1, 2, 3, 4, 5 ]
		const newArray = originalArray.replace(1, 5)

		it('Should return a copy of an array with a value replaced', () => {
			deepStrictEqual(newArray, [ 1, 5, 3, 4, 5 ])
			deepStrictEqual(originalArray.replace(0, 4), [ 4, 2, 3, 4, 5 ])
			deepStrictEqual(originalArray.replace(4, 1), [ 1, 2, 3, 4, 1 ])
		})
		it('Should not change the original array', () => {
			deepStrictEqual(originalArray, [ 1, 2, 3, 4, 5 ])
		})
	})
})