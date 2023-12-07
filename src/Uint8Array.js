Uint8Array.prototype.getMissingDigits = function() {
	return Uint8Array.from([...Array(10).keys()].slice(1) // Range from 1 to 9, inclusive.
		.filter(x => !this.includes(x)))
}

Uint8Array.prototype.hasDuplicates = function() {
	for(let i = 0; i < this.length; i++) {
		if(this.lastIndexOf(this[i]) !== i) {
			return true
		}
	}
	return false
}

Uint8Array.prototype.replace = function(i, newValue) {
	return Uint8Array.from([ ...this.slice(0, i), newValue, ...this.slice(i + 1) ])
}

Uint8Array.prototype.unique = function() {
	return Uint8Array.from(this.reduce((acc, x) => {
		if(!acc.includes(x)) acc.push(x)

		return acc
	}, []))
}