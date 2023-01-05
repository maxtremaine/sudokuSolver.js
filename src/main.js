const { readFileSync, writeFileSync } = require('fs')
const Sudoku = require('./Sudoku')

const t0 = Date.now()

const startPuzzle = Sudoku.fromSudokuFile(readFileSync('./io/start.sudoku', 'utf-8'))

if(!startPuzzle.isValid()) throw 'This start puzzle is not valid.'

const winningBranches = [ ...startPuzzle.getBlankCells().keys() ].reduce((workingBranches, runNumber) => {
    console.log(`Completed run ${runNumber + 1} with ${workingBranches.length} branches.`)

    return workingBranches.reduce((newBranches, oldBranch) => {
        const blankCell = oldBranch.getBlankCells()[0]

        for(const possibleValue of blankCell.possibleValues) {
            newBranches.push(Sudoku.fromArray(oldBranch.cells.replace(blankCell.index, possibleValue)))
        }

        return newBranches
    }, [])
}, [ startPuzzle ])

writeFileSync('./io/finish.sudoku', winningBranches[0].toSudokuFile())

console.log(`Ran successfully in ${(Date.now() - t0) / 1000} seconds.`)