const { readFileSync, writeFileSync } = require('fs')

const t0 = Date.now()

console.log(`Ran successfully in ${(Date.now() - t0) / 1000} seconds.`)