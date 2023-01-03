const create = ({ index, possibleValues }) => {
	if(typeof index !== 'number') throw TypeError('\'index\' has to be a number.')
	if(!(possibleValues instanceof Array)) throw TypeError('\'possibleValues\' has to be an Array.')

	if(possibleValues.length !== 0) {
		for(const value in possibleValues) {
			if(typeof value !== 'number') throw TypeError('Values must be numbers.')
		}
	}
	
	return { index, possibleValues }
}

module.exports = { create }