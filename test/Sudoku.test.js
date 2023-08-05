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
		it('Should throw a TypeError if an Array is not used', () => {
			deepStrictEqual(Sudoku.fromArray('valuesWithString')[0], 'Cells must be an Array.')
		})
		it('Should throw a TypeError if a value that is not a number is used', () => {
			const valuesWithString = [ '7', 0, 0, 0, 4, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 2, 0, 0, 0, 6,
				0, 2, 0, 9, 0, 8, 0, 0, 0, 3, 5, 0, 4, 9, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0,
				2, 1, 0, 8, 5, 0, 0, 0, 1, 0, 9, 0, 6, 0, 7, 0, 0, 0, 8, 0, 0, 0, 4, 0, 0, 6, 0,
				0, 0, 2, 0, 0, 0, 8 ]

			deepStrictEqual(Sudoku.fromArray(valuesWithString)[0], 'Cells must be numbers.')
		})
		it('Should throw a RangeError if 81 values are not provided.', () => {
			deepStrictEqual(Sudoku.fromArray([ 1, 2 ])[0], 'The \'cells\' property must have a length of 81.')
		})
		it('Should throw a RangeError if a value is below 0 or above 9.', () => {
			const valuesWithTen = [ 10, 0, 0, 0, 4, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 2, 0, 0, 0, 6,
				0, 2, 0, 9, 0, 8, 0, 0, 0, 3, 5, 0, 4, 9, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0,
				2, 1, 0, 8, 5, 0, 0, 0, 1, 0, 9, 0, 6, 0, 7, 0, 0, 0, 8, 0, 0, 0, 4, 0, 0, 6, 0,
				0, 0, 2, 0, 0, 0, 8 ]
			
			deepStrictEqual(Sudoku.fromArray(valuesWithTen)[0], 'Cells must be between 0 and 9, inclusive.')
		})
	})

	describe('fromSudokuFile', () => {
		it('Should create a Sudoku object from a .sudoku file string', () => {
			deepStrictEqual(Sudoku.fromSudokuFile(validFile)[1].cells, sudokuValues)
		})
		it('Should throw a TypeError if a string is not used', () => {
			deepStrictEqual(Sudoku.fromSudokuFile(5)[0], 'The \'sudokuFile\' parameter must be a string.')
		})
		it('Should throw a RangeError if the sudokuString parameter is not 167 characters.', () => {
			deepStrictEqual(Sudoku.fromSudokuFile('hello')[0],
				'The \'sudokuFile\' parameter must have a length of 167.')
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

			deepStrictEqual(Sudoku.fromSudokuFile(illegalCharacter)[0], 'You cannot use \'w\' in the \'sudokuFile\' parameter.')
		})
	})

	describe('isValid', () => {
		it('Should identify a valid puzzle', () => {
			deepStrictEqual(Sudoku.fromArray(sudokuValues)[1].isValid(), true)
		})
		it('Should identify an invalid puzzle', () => {
			const invalidPuzzle = [ 7, 7, 0, 0, 4, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 2, 0, 0, 0, 6, 0,
				2, 0, 9, 0, 8, 0, 0, 0, 3, 5, 0, 4, 9, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 2,
				1, 0, 8, 5, 0, 0, 0, 1, 0, 9, 0, 6, 0, 7, 0, 0, 0, 8, 0, 0, 0, 4, 0, 0, 6, 0, 0,
				0, 2, 0, 0, 0, 8 ]

			deepStrictEqual(Sudoku.fromArray(invalidPuzzle)[1].isValid(), false)
		})
	})

	describe('getRelatedCells', () => {
		it('Should return related cell values', () => {
			const sudokuFile = [
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
	        ].join("\n")
	        const relatedToOne = [ 1, 4, 6, 7 ]

	        deepStrictEqual(Sudoku.fromSudokuFile(sudokuFile)[1].getRelatedCells(1), relatedToOne)
		})
	})

	describe('getBlankCells', () => {
		it('Should find the blank cells in a puzzle', () => {
			const missingOne = [
				"  abc def ghi",
				"1 7_2|954|836",
				"2 539|186|247",
				"3 684|237|519",
				"  -----------",
				"4 325|479|681",
				"5 198|365|724",
				"6 476|821|953",
				"  -----------",
				"7 247|593|168",
				"8 861|742|395",
				"9 953|618|472"
			].join('\n')

			deepStrictEqual(Sudoku.fromSudokuFile(missingOne)[1].getBlankCells(),
				[ { index: 1, possibleValues: [ 1 ]} ])
		})
	})

	describe('toSudokuFile', () => {
		it('Should spit out a .sudoku file', () => {
			deepStrictEqual(Sudoku.fromArray(sudokuValues)[1].toSudokuFile(), validFile)
		})
	})
})