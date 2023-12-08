const { readFileSync, writeFileSync } = require('fs')
require('./Uint8Array')

const t0 = performance.now()

let [ err, startPuzzle ] = Uint8Array.fromSudokuFile(readFileSync('./io/start.sudoku', 'utf-8'))

if(err) throw err

if(err = startPuzzle.validateSudokuPuzzle()) throw err

const winningBranches = [ ...startPuzzle.getBlankCells().keys() ].reduce((workingBranches, runNumber) => {
    console.log(`Completed run ${runNumber + 1} with ${workingBranches.length} branches.`)

    return workingBranches.reduce((newBranches, oldBranch) => {
        const blankCell = oldBranch.getBlankCells()[0]

        for(const possibleValue of blankCell.possibleValues) {
            newBranches.push(Uint8Array.from(oldBranch.replace(blankCell.index, possibleValue)))
        }

        return newBranches
    }, [])
}, [ startPuzzle ])

writeFileSync('./io/finish.sudoku', winningBranches[0].toSudokuFile())

console.log(`Ran successfully in ${(performance.now() - t0) / 1000} seconds.`)