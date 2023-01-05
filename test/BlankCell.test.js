const { throws } = require('assert')
const BlankCell = require('../src/BlankCell')

describe('BlankCell', () => {
	describe('create', () => {
		it('Should limit index to numbers', () => {
			throws(() => BlankCell.create({index: 'i', possibleValues:[ 1 ]}),
				TypeError('\'index\' has to be a number.'))
		})
		it('Should limit possibleValues to Arrays', () => {
			throws(() => BlankCell.create({index: 1, possibleValues:'hi'}),
				TypeError('\'possibleValues\' has to be an Array.'))
		})
		it('Should allow empty possibleValues', () => {
			BlankCell.create({index: 1, possibleValues: []})
		})
		it('Should limit possibleValues composites to numbers.', () => {
			throws(() => BlankCell.create({index: 1, possibleValues: [ 'hi' ]}),
				TypeError('Expected value to be number, got: hi'))
		})
	})
})