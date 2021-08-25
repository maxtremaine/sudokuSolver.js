const { emptyGrid, groups, fileToStringConversionIndexes } = require('./puzzleData').puzzleData

// I/O

const sudokuFileToString = sudokuFile => {
    return fileToStringConversionIndexes
        .map(index => sudokuFile[index])
        .join('')
}

const sudokuStringToFile = sudokuString =>  {
    const outputPuzzle = emptyGrid.slice()
    fileToStringConversionIndexes.forEach(( index, n ) => {
        outputPuzzle[index] = sudokuString[n]
    })
    return outputPuzzle.join('')
}

// Assertion

const isValidPuzzle = sudokuString => {
    for(const group of groups) {
        const values = group
            .map(index => sudokuString[index])
            .filter(value => value !== '_')
        if(values.length !== (new Set(values)).size) return false
    }
    return true
}

module.exports = { sudokuFileToString, sudokuStringToFile, isValidPuzzle }