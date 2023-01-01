const fromArray = values => {
	if(values.length !== 81) throw RangeError('The \'values\' property must have a length of 81.')

	for(const value of values) {
		if(typeof value !== 'number') throw TypeError('Values must be numbers.')
		if(value < 0 || value > 9) throw RangeError('Values must be between 0 and 9, inclusive.')
	}

	return { values }
}

const fromSudokuFile = sudokuFile => {
	if(typeof sudokuFile !== 'string') throw TypeError('The \'sudokuFile\' parameter must be a string.')
	if(sudokuFile.length !== 167) throw RangeError('The \'sudokuFile\' parameter must have a length of 167.')

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

const fileToStringConversionIndexes = [ 16, 17, 18, 20, 21, 22, 24, 25, 26, 30, 31, 32, 34,
    35, 36, 38, 39, 40, 44, 45, 46, 48, 49, 50, 52, 53, 54, 72, 73, 74, 76, 77, 78, 80, 81, 82,
    86, 87, 88, 90, 91, 92, 94, 95, 96, 100, 101, 102, 104, 105, 106, 108, 109, 110, 128, 129,
    130, 132, 133, 134, 136, 137, 138, 142, 143, 144, 146, 147, 148, 150, 151, 152, 156, 157,
    158, 160, 161, 162, 164, 165, 166 ]

const sudokuFileValues = [ "_", "1", "2", "3", "4", "5", "6", "7", "8", "9", " ", "\n", "|", "_",
		"-", "a", "b", "c", "d", "e", "f", "g", "h", "i" ]