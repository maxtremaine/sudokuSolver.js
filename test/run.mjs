import { readFile } from 'fs/promises';
import { countCharacterInString, changeCharacter } from './src/components.mjs';
import { validateSudokuString, validateSudokuFile } from './src/puzzle.mjs';

const { emptyGrid } = JSON.parse(await readFile('./src/puzzleRules.json'));

const assert = ({ fn, params, expected }) => fn(params) === expected;

const runTest = ({ fn, params, expected }) => (
	assert({ fn, params, expected }) ? '' : fn(params)
);

const cases = [
	{
		name: 'countCharacterInString',
		fn: countCharacterInString('a'),
		params: 'waaw',
		expected: 2
	},
	{
		name: 'changeCharacter',
		fn: changeCharacter({
			index: 4,
			value: 'a'
		}),
		params: 'something',
		expected: 'someahing'
	}
];

const outputs = cases.map(cs => {
	const message = runTest(cs);
	if(message) {
		console.error(`Running ${cs.name}, expected ${cs.expected}, received ${message}`);
		return message;
	}
})

const errors = outputs.filter(output => output !== undefined);

console.log(`Ran ${cases.length} cases and experienced ${errors.length} errors.`);
