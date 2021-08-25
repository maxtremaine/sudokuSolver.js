const { emptyGrid, groups, fileToStringConversionIndexes } = require('./puzzleData').puzzleData

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

module.exports = { sudokuFileToString, sudokuStringToFile }