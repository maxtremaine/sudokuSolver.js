import { readFile } from 'fs/promises';

// Load Rules

const {
	emptyGrid,
	groups,
	fileToStringConversionIndexes
} = JSON.parse(await readFile('./src/puzzleRules.json'));

// Factories

const Cell = ({index, value, sudokuString}) => {
	const relatedValues = getRelatedNumbers(sudokuString)(index);
	return {
		index,
		value,
		relatedCells: getRelatedCells(index),
		relatedValues,
		possibleValues: missingDigits(relatedValues)
	};
};


// Validation

const validateSudokuFile = sudokuFile => {
	const pattern = /^(\s|\n|\||_|-|[1-9]|[a-i]){167}$/
	return sudokuFile.match(pattern)[0] === sudokuFile
}

const validateSudokuString = sudokuString => {
	const pattern = /^(_|[1-9]){81}$/
	return sudokuString.match(pattern)[0] === sudokuString;
}

// Puzzle Actions

const sudokuFileToString = sudokuFile => {
	const characterList = fileToStringConversionIndexes.map(index => sudokuFile[index]);
	return characterList.join('');
}

const getIndexedValues = sudokuString => indexes => (
	indexes.map(index => sudokuString[index])
);

const missingDigits = values => {
	const digits = [...Array(10).keys()].slice(1);
	return digits.filter(digit => !values.includes(digit));
};

const validateGroup = groupString => {
	if(groupString.length !== 9) return false;
	const numbers = Array.from(groupString).filter(number => number !== '_');
	const numberSet = new Set(numbers);
	return numbers.length === numberSet.size;
};

const getRelatedCells = cellIndex => {
	const relatedGroups = groups.filter(group => group.includes(cellIndex));
	return relatedGroups.flat();
};

const getRelatedNumbers = sudokuString => cellIndex => {
	const cellIndexes = getRelatedCells(cellIndex);
	const cellValues = cellIndexes.map(i => parseInt(sudokuString[i]))
	const uniqueValues = new Set(cellValues);
	uniqueValues.delete(NaN);
	return Array.from(uniqueValues);
};

// Composites

const validatePuzzle = sudokuString => {
	const groupValues = groups.map(group => getIndexedValues(sudokuString)(group));
	const groupStrings = groupValues.map(values => values.join(''));
	const groupValidities = groupStrings.map(groupString => validateGroup(groupString));
	const invalidResults = groupValidities.filter(validity => validity === false);
	return invalidResults.length === 0
}

const cellDegreesOfFreedom = index => sudokuString => {
	const relatedCells = getRelatedCells(index);
	const relatedValues = getIndexedValues(sudokuString)(relatedCells);
	const underscores = relatedValues.filter(values => values === '_');
	return underscores.length;
}

export { Cell, sudokuFileToString, validateSudokuFile, validateSudokuString, validatePuzzle };
