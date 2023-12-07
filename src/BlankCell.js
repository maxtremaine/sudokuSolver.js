const create = ({ index, possibleValues }) => {
	if(typeof index !== 'number') return [ '\'index\' has to be a number.', {} ]
	if(!(possibleValues instanceof Uint8Array)) return [ '\'possibleValues\' has to be a Uint8Array.', {} ]

	if(possibleValues.length !== 0) {
		for(const value of possibleValues) {
			if(typeof value !== 'number') return [ 'Expected value to be number, got: ' + value, {} ]
		}
	}

	return [ '', { index, possibleValues } ]
}

module.exports = { create }