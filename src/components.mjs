const pipe = (...fns) => x => fns.reduce((v, f) => f(v), x);

const countCharacterInString = c => str => {
	const characters = Array.from(str);
	const matches = characters.filter(char => char === c);
	return matches.length
}

export { pipe };
