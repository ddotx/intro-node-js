const fs = require('fs')

const file = fs.readFileSync('./lib.js',{encoding: 'utf-8'}).toString()

const fileNoString = fs.readFileSync('./lib.js',{encoding: 'utf-8'})

// fs.writeFileSync('./lib.js','var me = "me"')

console.log(file)
console.log(fileNoString)