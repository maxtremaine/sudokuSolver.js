const { emptyGrid, groups, fileToStringConversionIndexes } = require('./puzzleData').puzzleData
const { pipe, getMissingDigits } = require('./pureFunctions')

// I/O

const sudokuFileToString = sudokuFile => {
    return fileToStringConversionIndexes
        .map(index => sudokuFile[index])
        .join('')
}

const sudokuStringToFile = sudokuString =>  {
    return fileToStringConversionIndexes.reduce((workingGrid, index, n) => {
        workingGrid[index] = sudokuString[n]
        return workingGrid
    }, emptyGrid).join('')
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

// Navigating Puzzles

const getRelatedCellIndexes = index => {
    const indexSet = new Set()
    for(const group of groups) {
        if(group.includes(index)) {
            for(const member of group) {
                if(!indexSet.has(member)) indexSet.add(member)
            }
        }
    }
    const indexArray = Array.from(indexSet)
    indexArray.sort((a, b) => a - b)
    return indexArray
}

const getCellValues = indexes => sudokuString => {
    const numbers = indexes
        .map(index => sudokuString[index])
        .filter(value => value !== '_')
    const outputArray = Array.from(new Set(numbers))
    outputArray.sort()
    return outputArray
}

// Compound Functions

const getRelatedCellValues = pipe(
    getRelatedCellIndexes,
    getCellValues
)

const getPossibleValues = index => pipe(
    getRelatedCellValues(index),
    getMissingDigits
)

module.exports = { sudokuFileToString, sudokuStringToFile, isValidPuzzle, getRelatedCellIndexes, getCellValues, getPossibleValues }