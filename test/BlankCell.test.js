const { deepStrictEqual } = require('assert')
const BlankCell = require('../src/BlankCell')

describe('BlankCell', () => {
	describe('create', () => {
		it('Should limit index to numbers', () => {
			deepStrictEqual(BlankCell.create({index: 'i', possibleValues:[ 1 ]})[0],
				'\'index\' has to be a number.')
		})
		it('Should limit possibleValues to Arrays', () => {
			deepStrictEqual(BlankCell.create({index: 1, possibleValues:'hi'})[0],
				'\'possibleValues\' has to be an Array.')
		})
		it('Should allow empty possibleValues', () => {
			deepStrictEqual(BlankCell.create({index: 1, possibleValues: []})[1].possibleValues,
				[])
		})
		it('Should limit possibleValues composites to numbers.', () => {
			deepStrictEqual(BlankCell.create({index: 1, possibleValues: [ 'hi' ]})[0],
				'Expected value to be number, got: hi')
		})
	})
})