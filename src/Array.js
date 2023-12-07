Array.prototype.getMissingDigits = function() {
	return [...Array(10).keys()].slice(1) // Range from 1 to 9, inclusive.
		.filter(x => !this.includes(x))
}

Array.prototype.hasDuplicates = function() {
	for(let i = 0; i < this.length; i++) {
		if(this.lastIndexOf(this[i]) !== i) {
			return true
		}
	}
	return false
}

Array.prototype.replace = function(i, newValue) {
	return Array.from([ ...this.slice(0, i), newValue, ...this.slice(i + 1) ])
}

Array.prototype.unique = function() {
	return Array.from(this.reduce((acc, x) => {
		if(!acc.includes(x)) acc.push(x)

		return acc
	}, []))
}