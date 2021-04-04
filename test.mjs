import { countCharacterInString } from './src/components.mjs';

const assert = ({ fn, params, expected }) => fn(params) === expected;

const runTest = ({ fn, params, expected }) => (
	assert({ fn, params, expected }) ? '' : fn(params)
);

const cases = [
	{
		name: 'countCharacterInString',
		fn: countCharacterInString('a'),
		params: 'waaw',
		expected: 3
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
