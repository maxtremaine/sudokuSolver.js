import { readFile } from 'fs/promises';

const {
	emptyGrid,
	groups,
	fileToStringConversionIndexes
} = JSON.parse(await readFile('./src/puzzleRules.json'));

// Validation

const validateSudokuFile = sudokuString => {
	const pattern = /^(\s|\n|\||_|-|[1-9]|[a-i]){167}$/
	return sudokuString.match(pattern) === sudokuString
}

console.log(emptyGrid);
