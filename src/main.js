const { readFileSync, writeFileSync } = require('fs')
require('./Uint8Array')

const t0 = performance.now()

const sudokuFile = readFileSync('./io/start.sudoku', 'utf-8')

const startPuzzle = Uint8Array.fromSudokuFile(sudokuFile)

if(err = startPuzzle.validateSudokuPuzzle()) throw err

const winningBranches = [ ...startPuzzle.getBlankCells().keys() ].reduce((workingBranches, runNumber) => {
    const newWorkingBranches = workingBranches.reduce((newBranches, oldBranch) => {
        const blankCell = oldBranch.getBlankCells()[0]

        for(const possibleValue of blankCell.possibleValues) {
            newBranches.push(oldBranch.replace(blankCell.index, possibleValue))
        }

        return newBranches
    }, [])

    console.log(`Completed run ${runNumber + 1} with ${workingBranches.length} branches.`)

    return newWorkingBranches
}, [ startPuzzle ])

writeFileSync('./io/finish.sudoku', winningBranches[0].toSudokuFile())

console.log(`Ran successfully in ${(performance.now() - t0) / 1000} seconds.`)