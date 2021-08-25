const { getMissingDigits, replaceSubstring } = require('../src/pureFunctions')
const { deepStrictEqual } = require('assert')

describe('pureFunctions', () => {
    it('Should return the missing digits given an array of digits as strings.', () => {
        deepStrictEqual(getMissingDigits(['1', '2', '3']), ['4', '5', '6', '7', '8', '9'])
        deepStrictEqual(getMissingDigits(['a', '5', '6', '3']), ['1', '2', '4', '7', '8', '9'])
    })

    it('Should replace a substring as a part of a string, at an index.', () => {
        const originalString = 'Oh hi there.'
        deepStrictEqual(replaceSubstring({ index: 4, substring: 'o'})(originalString), 'Oh ho there.')
        deepStrictEqual(replaceSubstring({ index: 0, substring: 'A'})(originalString), 'Ah hi there.')
        deepStrictEqual(originalString, 'Oh hi there.') // Check for shallow copy.
    })
})