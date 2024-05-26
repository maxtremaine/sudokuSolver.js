function BlankCell(index, possibleValueCount) {
	if(!new.target) { // Guard for missing 'new'
		return new BlankCell(index, possibleValueCount)
	}

	// Guard for types
	if(typeof index !== 'number') throw TypeError('Expected \'index\' to be a number, got: ' + typeof index)
	if(typeof possibleValueCount !== 'number') {
		throw TypeError('Expected \'possibleValueCount\' to be a number, got: ' + typeof possibleValueCount)
	}

	this.index = index
	this.possibleValues = possibleValueCount
}

BlankCell.from = ({ index, possibleValueCount }) => {
	return BlankCell(index, possibleValueCount)
}

if(module) {
	module.exports = BlankCell
}