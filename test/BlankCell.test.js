const { deepStrictEqual } = require('assert')
const BlankCell = require('../src/BlankCell')

describe('BlankCell', () => {
	describe('create', () => {
		it('Should limit index to numbers', () => {
			deepStrictEqual(BlankCell.create({index: 'i', possibleValues: Uint8Array.from([ 1 ])})[0],
				'\'index\' has to be a number.')
		})
		it('Should limit possibleValues to Uint8Arrays', () => {
			deepStrictEqual(BlankCell.create({index: 1, possibleValues:'hi'})[0],
				'\'possibleValues\' has to be a Uint8Array.')
		})
		it('Should allow empty possibleValues', () => {
			deepStrictEqual(BlankCell.create({index: 1, possibleValues: Uint8Array.from([])})[1].possibleValues,
				Uint8Array.from([]))
		})
	})
})