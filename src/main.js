const { readFileSync, writeFileSync } = require('fs')
require('./Uint8Array')

const t0 = performance.now()

const sudokuFile = readFileSync('./io/start.sudoku', 'utf-8')

const startPuzzle = Uint8Array.fromSudokuFile(sudokuFile)

if(err = startPuzzle.validateSudokuPuzzle()) throw err

let workingBranches = [ startPuzzle ]

for(let i = 1; i <= startPuzzle.filter(x => x === 0).length; i++) {
    const newWorkingBranches = []

    for(const oldBranch of workingBranches) {
        const blankCell = oldBranch.getBlankCells()[0]

        for(const possibleValue of oldBranch.getRelatedCells(blankCell.index).getMissingDigits()) {
            newWorkingBranches.push(oldBranch.replace(blankCell.index, possibleValue))
        }
    }

    workingBranches = newWorkingBranches

    console.log(`Completed run ${i} with ${workingBranches.length} branches.`)
}

writeFileSync('./io/finish.sudoku', workingBranches[0].toSudokuFile())

console.log(`Ran successfully in ${(performance.now() - t0) / 1000} seconds.`)