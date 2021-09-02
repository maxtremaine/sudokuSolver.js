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

// Solution Tree

const winningBranches = [ ...Array.from(sudokuString).filter(c => c === '_').keys() ]
    .reduce((workingBranches, runCount) => {
        const newBranches = new Set()

        Array.from(workingBranches).forEach(branch => {
            const blankCells = Array.from(branch)
                .map((value, index) => ({
                    index,
                    value,
                    possibleValues: getPossibleValues(index)(branch)
                }))
                .filter(cell => cell.value === '_')

            blankCells.sort((a, b) => a.possibleValues.length - b.possibleValues.length)

            blankCells[0].possibleValues.forEach(value => {
                const newBranch = replaceSubstring({ index: blankCells[0].index, substring: value})(branch)
                newBranches.add(newBranch)
            })
        })

        console.log(`- ${newBranches.size} branches on run ${runCount + 1}.`)
        return newBranches
    }, new Set([ sudokuString ]))

const winningBranch = Array.from(winningBranches)[0]

console.log(`\nWOO, we did it:\n${sudokuStringToFile(winningBranch)}\n`)

// Output

writeFileSync('./io/finish.sudoku', sudokuStringToFile(winningBranch))

console.log(`Ran successfully in ${(Date.now() - t0) / 1000} seconds.`)