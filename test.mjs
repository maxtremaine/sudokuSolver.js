const assert = ({ fn, params, expected }) => fn(params) === expected;

const runTest = ({ fn, params, expected }) => (
	assert({ fn, params, expected }) ? '' : fn(params)
);

const cases = [
	{
		fn: x => x + 1,
		params: 0,
		expected: 1,
		message: 'whoops'
	}
];

const outputs = cases.map(cs => {
	const message = runTest(cs);
	if(message) {
		console.error(`expected ${cs.expected}, received ${message}`);
		return message;
	}
})

const errors = outputs.filter(output => output !== undefined);

console.log(`Ran ${cases.length} cases and experienced ${errors.length} errors.`);
console.log(errors);
