const { emptyGrid, groups, fileToStringConversionIndexes } = require('./puzzleData').puzzleData
const { replaceSubstring } = require('./pureFunctions')

const sudokuFileToString = sudokuFile => {
    return fileToStringConversionIndexes
        .map(index => sudokuFile[index])
        .join('')
}

const sudokuStringToFile = sudokuString =>  {
    let emptyPuzzle = emptyGrid.join('')
    fileToStringConversionIndexes.forEach(( index, n) => {
        emptyPuzzle = replaceSubstring({ index, substring: sudokuString[n]})(emptyPuzzle)
    })
    return emptyPuzzle
}

module.exports = { sudokuFileToString, sudokuStringToFile }