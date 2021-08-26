# sudokuSolver.js
Solves Sudoku puzzles so I don't have to.

## Reason and Philosophy
I haven't been able to keep up with coding as much as I would have, but I do spend an unnecessary amount of time doing sudoku puzzles, so I thought, "Hey, I should combine the two." I have tried to make the program easy to interact with, and be highly efficient without becoming bloated with different systems/tactics for solving puzzles. I hope that at least the .sudoku file type and interpreter functions are useful to other people who want to play with sudoku as a platform; you can find those functions in _src/puzzleActions.js_.

## File and String Types

### .sudoku File

```
  abc def ghi
1 41_|___|___
2 __3|___|_29
3 ___|__4|_6_
  -----------
4 ___|7__|_9_
5 __7|4__|__2
6 ___|__8|__5
  -----------
7 67_|__1|___
8 __9|_2_|__3
9 _3_|__9|_5_
```

I have designed this file type to be very readable and intuitive, for getting puzzles in and out of the program.

### Sudoku String

```
41_________3____29_____4_6____7___9___74____2_____8__567___1_____9_2___3_3___9_5_
```

Same puzzle as above, just flattened row by row. I have designed this type to be very ordered, so that you can create groups by index (see "groups" in _src/puzzle_data.json_), and try swapping blanks for integers (see "replace_character" in _src/pureFunctions.js_). This is a lightweight way to store a puzzle in working memory.

See "fileToStringConversionIndexes" in _src/puzzle_data.json_ for an easy way to switch between types.

## Scripts

### Type Check and Test

```sh
mocha
```

### Run

```sh
node start.js
```

### Using NPM

```sh
npm init
npm test
npm start
```