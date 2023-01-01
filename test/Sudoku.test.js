const { deepStrictEqual, throws } = require('assert')
const Sudoku = require('../src/Sudoku')

describe('Sudoku', () => {
	const validFile = [
            "  abc def ghi",
            "1 7__|_4_|__1",
            "2 __1|___|2__",
            "3 _6_|2_9|_8_",
            "  -----------",
            "4 __3|5_4|9__",
            "5 1__|___|__4",
            "6 __2|1_8|5__",
            "  -----------",
            "7 _1_|9_6|_7_",
            "8 __8|___|4__",
            "9 6__|_2_|__8"
        ].join('\n')
	const sudokuValues = [ 7, 0, 0, 0, 4, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 2, 0, 0, 0, 6, 0, 2, 0,
        9, 0, 8, 0, 0, 0, 3, 5, 0, 4, 9, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 2, 1, 0, 8,
        5, 0, 0, 0, 1, 0, 9, 0, 6, 0, 7, 0, 0, 0, 8, 0, 0, 0, 4, 0, 0, 6, 0, 0, 0, 2, 0, 0,
        0, 8 ]

	describe('fromArray', () => {
		it('Should throw a TypeError if a value that is not a number is used', () => {
			const valuesWithString = [ '7', 0, 0, 0, 4, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 2, 0, 0, 0, 6,
				0, 2, 0, 9, 0, 8, 0, 0, 0, 3, 5, 0, 4, 9, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0,
				2, 1, 0, 8, 5, 0, 0, 0, 1, 0, 9, 0, 6, 0, 7, 0, 0, 0, 8, 0, 0, 0, 4, 0, 0, 6, 0,
				0, 0, 2, 0, 0, 0, 8 ]

			throws(() => Sudoku.fromArray(valuesWithString), TypeError('Values must be numbers.'))
		})
		it('Should throw a RangeError if 81 values are not provided.', () => {
			throws(() => Sudoku.fromArray([ 1, 2 ]), RangeError('The \'values\' property must have a length of 81.'))
		})
		it('Should throw a RangeError if a value is below 0 or above 9.', () => {
			const valuesWithTen = [ 10, 0, 0, 0, 4, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 2, 0, 0, 0, 6,
				0, 2, 0, 9, 0, 8, 0, 0, 0, 3, 5, 0, 4, 9, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0,
				2, 1, 0, 8, 5, 0, 0, 0, 1, 0, 9, 0, 6, 0, 7, 0, 0, 0, 8, 0, 0, 0, 4, 0, 0, 6, 0,
				0, 0, 2, 0, 0, 0, 8 ]
			
			throws(() => Sudoku.fromArray(valuesWithTen), RangeError('Values must be between 0 and 9, inclusive.'))
		})
	})

	describe('fromSudokuFile', () => {
		it('Should create a Sudoku object from a .sudoku file string', () => {
			deepStrictEqual(Sudoku.fromSudokuFile(validFile).values, sudokuValues)
		})
		it('Should throw a TypeError if a string is not used', () => {
			throws(() => Sudoku.fromSudokuFile(5), TypeError('The \'sudokuFile\' parameter must be a string.'))
		})
		it('Should throw a RangeError if the sudokuString parameter is not 167 characters.', () => {
			throws(() => Sudoku.fromSudokuFile('hello'),
				RangeError('The \'sudokuFile\' parameter must have a length of 167.'))
		})
		it('Should identify illegal characters in a RangeError', () => {
			const illegalCharacter = [
	            "w abc def ghi",
	            "1 7__|_4_|__1",
	            "2 __1|___|2__",
	            "3 _6_|2_9|_8_",
	            "  -----------",
	            "4 __3|5_4|9__",
	            "5 1__|___|__4",
	            "6 __2|1_8|5__",
	            "  -----------",
	            "7 _1_|9_6|_7_",
	            "8 __8|___|4__",
	            "9 6__|_2_|__8"
	        ].join('\n')

			throws(() => Sudoku.fromSudokuFile(illegalCharacter), RangeError('You cannot use \'w\' in the \'sudokuFile\' parameter.'))
		})
	})
})