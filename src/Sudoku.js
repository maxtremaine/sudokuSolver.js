const BlankCell = require('./BlankCell')
require('./Array')

const fromArray = cells => {
	if(!(cells instanceof Array)) throw TypeError('Cells must be an Array.')
	if(cells.length !== 81) throw RangeError('The \'cells\' property must have a length of 81.')

	for(const cell of cells) {
		if(typeof cell !== 'number') throw TypeError('Cells must be numbers.')
		if(cell < 0 || cell > 9) throw RangeError('Cells must be between 0 and 9, inclusive.')
	}

	return {
		cells,
		isValid,
		getRelatedCells,
		getBlankCells,
		toSudokuFile
	}
}

const fromSudokuFile = sudokuFile => {
	if(typeof sudokuFile !== 'string') {
		throw TypeError('The \'sudokuFile\' parameter must be a string.')
	}
	if(sudokuFile.length !== 167) {
		throw RangeError('The \'sudokuFile\' parameter must have a length of 167.')
	}

	for(const character of sudokuFile) {
		if(!sudokuFileValues.includes(character)) {
			throw RangeError('You cannot use \'' + character + '\' in the \'sudokuFile\' parameter.')
		}
	}

	return fromArray(fileToStringConversionIndexes.map(x => sudokuFile[x])
		.map(x => {
			if (x === '_') {
				return 0
			} else {
				return Number(x)
			}
		}))
}

module.exports = { fromArray, fromSudokuFile }

function isValid() {
	for(const group of groups) {
		const groupCells = group.map(x => this.cells[x])
			.filter(x => x !== 0)

		if(groupCells.hasDuplicates()) {
			return false
		}
	}

	return true
}

function getRelatedCells(index) {
	return groups.filter(group => group.includes(index))
		.flat()
		.unique() // Remove repeating indexes.
		.map(i => this.cells[i])
		.filter(x => x !== 0)
		.unique() // Remove repeating values.
		.sort()
}

// Returns all of the blank cells in a puzzle as BlankCell objects.
function getBlankCells() {
	return this.cells
		.reduce((acc, cell, index) => {
			if(cell === 0) {
				acc.push(BlankCell.create({
					index,
					possibleValues: this.getRelatedCells(index)
						.getMissingDigits()
				}))
			}
			
			return acc
		}, [])
		.sort((x, y) => x.possibleValues.length - y.possibleValues.length)
}

function toSudokuFile() {
	return Array.from(blankSudokuFile)
		.map((x, i) => {
			if(fileToStringConversionIndexes.includes(i)) {
				return this.cells[fileToStringConversionIndexes.indexOf(i)]
			}
			return x
		})
		.map(x => {
			if(x === 0) return '_'
			return String(x)
		})
		.join('')
}

const fileToStringConversionIndexes = [ 16, 17, 18, 20, 21, 22, 24, 25, 26, 30, 31, 32, 34,
    35, 36, 38, 39, 40, 44, 45, 46, 48, 49, 50, 52, 53, 54, 72, 73, 74, 76, 77, 78, 80, 81, 82,
    86, 87, 88, 90, 91, 92, 94, 95, 96, 100, 101, 102, 104, 105, 106, 108, 109, 110, 128, 129,
    130, 132, 133, 134, 136, 137, 138, 142, 143, 144, 146, 147, 148, 150, 151, 152, 156, 157,
    158, 160, 161, 162, 164, 165, 166 ]

const sudokuFileValues = [ "_", "1", "2", "3", "4", "5", "6", "7", "8", "9", " ", "\n", "|", "_",
		"-", "a", "b", "c", "d", "e", "f", "g", "h", "i" ]

const groups = [
    // Rows
    [ 0, 1, 2, 3, 4, 5, 6, 7, 8 ],
    [ 9, 10, 11, 12, 13, 14, 15, 16, 17 ],
    [ 18, 19, 20, 21, 22, 23, 24, 25, 26 ],
    [ 27, 28, 29, 30, 31, 32, 33, 34, 35 ],
    [ 36, 37, 38, 39, 40, 41, 42, 43, 44 ],
    [ 45, 46, 47, 48, 49, 50, 51, 52, 53 ],
    [ 54, 55, 56, 57, 58, 59, 60, 61, 62 ],
    [ 63, 64, 65, 66, 67, 68, 69, 70, 71 ],
    [ 72, 73, 74, 75, 76, 77, 78, 79, 80 ],
    // Columns
    [ 0, 9, 18, 27, 36, 45, 54, 63, 72 ],
    [ 1, 10, 19, 28, 37, 46, 55, 64, 73 ],
    [ 2, 11, 20, 29, 38, 47, 56, 65, 74 ],
    [ 3, 12, 21, 30, 39, 48, 57, 66, 75 ],
    [ 4, 13, 22, 31, 40, 49, 58, 67, 76 ],
    [ 5, 14, 23, 32, 41, 50, 59, 68, 77 ],
    [ 6, 15, 24, 33, 42, 51, 60, 69, 78 ],
    [ 7, 16, 25, 34, 43, 52, 61, 70, 79 ],
    [ 8, 17, 26, 35, 44, 53, 62, 71, 80 ],
    // Boxes
    [ 0, 1, 2, 9, 10, 11, 18, 19, 20 ],
    [ 3, 4, 5, 12, 13, 14, 21, 22, 23 ],
    [ 6, 7, 8, 15, 16, 17, 24, 25, 26 ],
    [ 27, 28, 29, 36, 37, 38, 45, 46, 47 ],
    [ 30, 31, 32, 39, 40, 41, 48, 49, 50 ],
    [ 33, 34, 35, 42, 43, 44, 51, 52, 53 ],
    [ 54, 55, 56, 63, 64, 65, 72, 73, 74 ],
    [ 57, 58, 59, 66, 67, 68, 75, 76, 77 ],
    [ 60, 61, 62, 69, 70, 71, 78, 79, 80 ]
]

const blankSudokuFile = [ " ", " ", "a", "b", "c", " ", "d", "e", "f", " ", "g", "h", "i", "\n",
	"1", " ", "_", "_", "_", "|", "_", "_", "_", "|", "_", "_", "_", "\n", "2", " ", "_", "_",
	"_", "|", "_", "_", "_", "|", "_", "_", "_", "\n", "3", " ", "_", "_", "_", "|", "_", "_",
	"_", "|", "_", "_", "_", "\n", " ", " ", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-",
	"-", "\n", "4", " ", "_", "_", "_", "|", "_", "_", "_", "|", "_", "_", "_", "\n", "5", " ",
	"_", "_", "_", "|", "_", "_", "_", "|", "_", "_", "_", "\n", "6", " ", "_", "_", "_", "|",
	"_", "_", "_", "|", "_", "_", "_", "\n", " ", " ", "-", "-", "-", "-", "-", "-", "-", "-",
	"-", "-", "-", "\n", "7", " ", "_", "_", "_", "|", "_", "_", "_", "|", "_", "_", "_", "\n",
	"8", " ", "_", "_", "_", "|", "_", "_", "_", "|", "_", "_", "_", "\n", "9", " ", "_", "_",
	"_", "|", "_", "_", "_", "|", "_", "_", "_" ]