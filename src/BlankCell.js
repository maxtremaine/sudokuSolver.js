function BlankCell(index, possibleValues) {
	if(!new.target) { // Guard for missing 'new'
		return new BlankCell(index, possibleValues)
	}

	// Guard for types
	if(typeof index !== 'number') throw TypeError('Expected \'index\' to be a number, got: ' + typeof index)
	if(!(possibleValues instanceof Uint8Array)) {
		throw TypeError('Expected \'possibleValues\' to be a Uint8Array, got: ' + typeof possibleValues)
	}
	if(possibleValues.length !== 0) {
		for(const value of possibleValues) {
			if(typeof value !== 'number') throw TypeError('Expected value to be number, got: ' + value)
		}
	}

	this.index = index
	this.possibleValues = possibleValues
}

BlankCell.from = ({ index, possibleValues }) => {
	return BlankCell(index, possibleValues)
}

module.exports = BlankCell