import { readFile } from 'fs/promises';

const {
	emptyGrid,
	groups,
	fileToStringConversionIndexes
} = JSON.parse(await readFile('./src/puzzleRules.json'));

// Validation

const validateSudokuFile = sudokuFile => {
	const pattern = /^(\s|\n|\||_|-|[1-9]|[a-i]){167}$/
	return sudokuFile.match(pattern) === sudokuFile
}

const validateSudokuString = sudokuString => {
	const pattern = /^(_|[1-9]){81}$/
	return sudokuString.match(pattern) === sudokuString;
}

export { validateSudokuFile, validateSudokuString };
