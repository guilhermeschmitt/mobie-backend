require('../config/env')

const { exec } = require('child_process')
const ls = exec("nodemon ./src/index.js --exec \"babel-node\" ")

// TODO: improve. It's not really good
ls.stdout.on('data', (data) => console.log(data))
ls.stderr.on('data', (data) => console.log(data))
ls.on('close', (code) => console.log(`child process exited with code ${code}`))

