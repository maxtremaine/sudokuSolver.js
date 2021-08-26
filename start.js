const { readFileSync, writeFileSync } = require('fs')
const { isSudokuFile, isSudokuString } = require('./src/assertions')
const { sudokuFileToString, isValidPuzzle, getPossibleValues, sudokuStringToFile } = require('./src/puzzleActions')
const { replaceSubstring } = require('./src/pureFunctions')

// Timekeeping

const t0 = Date.now()

const startPuzzle = readFileSync('./io/start.sudoku', 'utf-8')

if(!isSudokuFile(startPuzzle)) throw 'The input file is not formatted correctly.'

const sudokuString = sudokuFileToString(startPuzzle)

if(!isSudokuString(sudokuString)) throw 'The input does not generate a valid sudoku string.'

if(!isValidPuzzle(sudokuString)) throw 'The input puzzle is not valid.'

// State Variables

let solved = false
let runCount = 1
let branches = [ sudokuString ]

// Solution Tree

while(!solved) {
    const newBranches = []

    for(const branch of branches) {
        const blankCells = Array.from(branch)
            .map((value, index) => ({
                    index,
                    value,
                    possibleValues: getPossibleValues(index)(branch)
                }))
            .filter(cell => cell.value === '_')

        if(blankCells.length === 0) {
            solved = true
            newBranches.push(branch)
            break
        }

        blankCells.sort((a, b) => a.possibleValues.length - b.possibleValues.length)

        blankCells[0].possibleValues.forEach(value => {
            const newBranch = replaceSubstring({ index: blankCells[0].index, substring: value})(branch)
            newBranches.push(newBranch)
        })
    }

    if(!solved) console.log(`- ${newBranches.length} branches on run ${runCount++}`)
    branches = newBranches
}

console.log(`\nWOO, we did it:\n${sudokuStringToFile(branches[0])}\n`)

// Output

writeFileSync('./io/finish.sudoku', sudokuStringToFile(branches[0]))

console.log(`Ran successfully in ${(Date.now() - t0) / 1000} seconds.`)