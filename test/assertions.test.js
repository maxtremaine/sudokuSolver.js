const { isSudokuFile } = require('../src/assertions')
const { ok } = require('assert')

describe('assertions', () => {
    it('Should check that a string is a .sudoku file.', () => {
        const validFile = [
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
        const invalidFile = [
            '  wbc def ghi',
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
            '9 6__|_2_|__8 '].join('\n')
        ok(isSudokuFile(validFile))
        ok(!isSudokuFile(invalidFile))
    })
})