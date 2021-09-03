const { emptyGrid, groups, fileToStringConversionIndexes } = require('./puzzleData').puzzleData
const { pipe, getMissingDigits, replaceSubstring } = require('./pureFunctions')

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
    const indexSet = groups.reduce((workingIndexes, group) => {
        if(group.includes(index)) group.forEach(member => workingIndexes.add(member))
        return workingIndexes
    }, new Set())

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

const filterNewBranches = parentBranch => {
    const blankCells = Array
        .from(parentBranch, (value, index) => ({
            index,
            value,
            possibleValues: getPossibleValues(index)(parentBranch)
        }))
        .filter(cell => cell.value === '_')

    blankCells.sort((a, b) => a.possibleValues.length - b.possibleValues.length)

    const newBranches = blankCells[0].possibleValues.map(value => (
        replaceSubstring({ index: blankCells[0].index, substring: value})(parentBranch)
    ))

    return new Set(newBranches)
}

module.exports = { sudokuFileToString, sudokuStringToFile, isValidPuzzle, getRelatedCellIndexes, getCellValues, getPossibleValues, filterNewBranches }