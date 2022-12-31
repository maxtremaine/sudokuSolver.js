Array.prototype.getMissingDigits = function() {
	return [...Array(10).keys()].slice(1) // Range from 1 to 9, inclusive.
		.filter(x => !this.includes(x))
}

Array.prototype.hasDuplicates = function() {
	return !this.every((x, i, arr) => arr.lastIndexOf(x) === i) // Not all unique.
}