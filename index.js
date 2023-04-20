// import express
const express = require('express')
// import middleware Morgan to log info for requests
const morgan = require('morgan')
// import node modules fs and path
const fs = require('fs')
  path = require('path')

// set express to variable app
const app = express()
// create write stream (in append mode)
// 'log.txt' is created in root directory
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'log.txt'), {flags: 'a'})

// designating that morgan should be called with every req
  // no need for console.logging in each request
app.use(morgan('combined', {stream: accessLogStream}))

// GET requests
  // app.METHOD(PATH, HANDLER)
  // app as instance of express()
  // express constructs header with misc info
app.get('/', (req, res) => {
  res.send('Welcome to this project.')
})

// __dirname as module-specific variable providing path to current directory
app.get('/documentation', (req, res) => {
  res.sendFile('public/documentation.html', {root: __dirname})
})


// listen for requests
app.listen(8080, () => {
  console.log('App is listening on port 8080.')
})