const { deepStrictEqual } = require('assert')
require('../src/Uint8Array')

describe('Array', () => {
	describe('getMissingDigits', () => {
		it('Should return missing digits from an array', () => {
			deepStrictEqual(Uint8Array.from([ 1, 2, 3 ]).getMissingDigits(), Uint8Array.from([ 4, 5, 6, 7, 8, 9 ]))
		})
	})
	describe('hasDuplicates', () => {
		it('Should return true if an array has duplicates', () => {
			deepStrictEqual(Uint8Array.from([ 1, 2, 2, 3 ]).hasDuplicates(), true)
		})
		it('Should return false if an array is all unique', () => {
			deepStrictEqual(Uint8Array.from([ 1, 2, 3 ]).hasDuplicates(), false)
		})
	})
	describe('replace', () => {
		const originalArray = Uint8Array.from([ 1, 2, 3, 4, 5 ])
		const newArray = originalArray.replace(1, 5)

		it('Should return a copy of an array with a value replaced', () => {
			deepStrictEqual(newArray, Uint8Array.from([ 1, 5, 3, 4, 5 ]))
			deepStrictEqual(originalArray.replace(0, 4), Uint8Array.from([ 4, 2, 3, 4, 5 ]))
			deepStrictEqual(originalArray.replace(4, 1), Uint8Array.from([ 1, 2, 3, 4, 1 ]))
		})
		it('Should not change the original array', () => {
			deepStrictEqual(originalArray, Uint8Array.from([ 1, 2, 3, 4, 5 ]))
		})
	})
	describe('unique', () => {
		it('Should return only the unique values from an Array', () => {
			deepStrictEqual(Uint8Array.from([ 1, 2, 2, 3 ]).unique(), Uint8Array.from([ 1, 2, 3]))
		})
	})
})