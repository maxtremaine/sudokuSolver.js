const { deepStrictEqual } = require('assert')
const BlankCell = require('../src/BlankCell')

describe('BlankCell', () => {
	describe('create', () => {
		it('Should limit index to numbers', () => {
			try {
				BlankCell.from({index: 'i', possibleValues: Uint8Array.from([ 1 ])})
			} catch(error) {
				deepStrictEqual(error.name, 'TypeError')
				deepStrictEqual(error.message, 'Expected \'index\' to be a number, got: string')
			}
		})
		it('Should limit possibleValues to Uint8Arrays', () => {
			try {
				BlankCell.from({index: 1, possibleValues:'hi'})
			} catch(error) {
				deepStrictEqual(error.name, 'TypeError')
				deepStrictEqual(error.message, 'Expected \'possibleValues\' to be a Uint8Array, got: string')
			}
		})
		it('Should allow empty possibleValues', () => {
			deepStrictEqual(BlankCell.from({index: 1, possibleValues: Uint8Array.from([])}).possibleValues,
				Uint8Array.of())
		})
	})
})