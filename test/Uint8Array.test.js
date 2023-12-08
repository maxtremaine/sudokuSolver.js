const { deepStrictEqual } = require('assert')
require('../src/Uint8Array')

describe('Array', () => {
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
	const sudokuValues = Uint8Array.from([ 7, 0, 0, 0, 4, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 2, 0, 0, 0, 6, 0, 2, 0,
		9, 0, 8, 0, 0, 0, 3, 5, 0, 4, 9, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 2, 1, 0, 8,
		5, 0, 0, 0, 1, 0, 9, 0, 6, 0, 7, 0, 0, 0, 8, 0, 0, 0, 4, 0, 0, 6, 0, 0, 0, 2, 0, 0,
		0, 8 ])
		
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

	describe('fromSudokuFile', () => {
		it('Should create a Uint8Array object from a .sudoku file string', () => {
			deepStrictEqual(Uint8Array.fromSudokuFile(validFile)[1], sudokuValues)
		})
		it('Should provide an error if a string is not used', () => {
			deepStrictEqual(Uint8Array.fromSudokuFile(5)[0], 'The \'sudokuFile\' parameter must be a string.')
		})
		it('Should provide an error if the sudokuString parameter is not 167 characters.', () => {
			deepStrictEqual(Uint8Array.fromSudokuFile('hello')[0],
				'The \'sudokuFile\' parameter must have a length of 167.')
		})
		it('Should identify illegal characters in an error.', () => {
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

			deepStrictEqual(Uint8Array.fromSudokuFile(illegalCharacter)[0], 'You cannot use \'w\' in the \'sudokuFile\' parameter.')
		})
	})

	describe('validateSudokuPuzzle', () => {
		it('Should provide an error if 81 values are not provided.', () => {
			deepStrictEqual(Uint8Array.from([ 1, 2 ]).validateSudokuPuzzle(), 'Sudoku puzzles must have a length of 81.')
		})
		it('Should provide an error if a value is below 0 or above 9.', () => {
			const valuesWithTen = Uint8Array.from([ 10, 0, 0, 0, 4, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 2, 0, 0, 0, 6,
				0, 2, 0, 9, 0, 8, 0, 0, 0, 3, 5, 0, 4, 9, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0,
				2, 1, 0, 8, 5, 0, 0, 0, 1, 0, 9, 0, 6, 0, 7, 0, 0, 0, 8, 0, 0, 0, 4, 0, 0, 6, 0,
				0, 0, 2, 0, 0, 0, 8 ])
			
			deepStrictEqual(Uint8Array.from(valuesWithTen).validateSudokuPuzzle(), 'Cells must be between 0 and 9, inclusive.')
		})
		it('Should identify an invalid puzzle', () => {
			const invalidPuzzle = Uint8Array.from([ 7, 7, 0, 0, 4, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 2, 0, 0, 0, 6, 0,
				2, 0, 9, 0, 8, 0, 0, 0, 3, 5, 0, 4, 9, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 2,
				1, 0, 8, 5, 0, 0, 0, 1, 0, 9, 0, 6, 0, 7, 0, 0, 0, 8, 0, 0, 0, 4, 0, 0, 6, 0, 0,
				0, 2, 0, 0, 0, 8 ])

			deepStrictEqual(Uint8Array.from(invalidPuzzle).validateSudokuPuzzle(), 'The sudoku file is not valid because a group has two of the same value.')
		})
		it('Should provide an empty string if the puzzle is valid', () => {
			deepStrictEqual(Uint8Array.from(sudokuValues).validateSudokuPuzzle(), '')
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
	        const relatedToOne = Uint8Array.from([ 1, 4, 6, 7 ])

	        deepStrictEqual(Uint8Array.fromSudokuFile(sudokuFile)[1].getRelatedCells(1), relatedToOne)
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

			deepStrictEqual(Uint8Array.fromSudokuFile(missingOne)[1].getBlankCells(),
				[ { index: 1, possibleValues: Uint8Array.from([ 1 ])} ])
		})
	})

	describe('toSudokuFile', () => {
		it('Should spit out a .sudoku file', () => {
			deepStrictEqual(sudokuValues.toSudokuFile(), validFile)
		})
	})
})