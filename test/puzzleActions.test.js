const { deepStrictEqual, ok } = require('assert')
const { sudokuFileToString, sudokuStringToFile, isValidPuzzle } = require('../src/puzzleActions')

describe('Puzzle Actions', () => {
    const fileString = [
        '  abc def ghi',
        '1 7__|_4_|__1',
        '2 __1|___|2__',
        '3 _6_|2_9|_8_',
        '  -----------',
        '4 __3|5_4|9__',
        '5 1__|___|__4',
        '6 __2|1_8|5__',
        '  -----------',
        '7 _1_|9_6|_7_',
        '8 __8|___|4__',
        '9 6__|_2_|__8'].join('\n')
    const sudokuString = '7___4___1__1___2___6_2_9_8___35_49__1_______4__21_85___1_9_6_7___8___4__6___2___8'
    
    it('Should convert a .sudoku file to a sudoku string.', () => {
        deepStrictEqual(sudokuFileToString(fileString), sudokuString)
    })

    it('Should convert a sudoku string to a .sudoku file.', () => {
        deepStrictEqual(sudokuStringToFile(sudokuString), fileString)
    })

    it('Should check the validity of a sudoku puzzle.', () => {
        const validPuzzle = '7___4___1__1___2___6_2_9_8___35_49__1_______4__21_85___1_9_6_7___8___4__6___2___8'
        const invalidPuzzle = '77__4___1__1___2___6_2_9_8___35_49__1_______4__21_85___1_9_6_7___8___4__6___2___8'
        ok(isValidPuzzle(validPuzzle))
        ok(!isValidPuzzle(invalidPuzzle))
    })
})