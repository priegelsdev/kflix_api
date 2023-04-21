// import express
const express = require('express')
// import middleware Morgan to log info for requests
const morgan = require('morgan')
// import middleware bodyparser to extract body portion of incoming request stream so it's easier to interface with
const bodyParser = require('body-parser')
// import uuid 
const uuid = require('uuid')
// import node modules fs and path
const fs = require('fs')
  path = require('path')

// set express to variable app
const app = express()
// create write stream (in append mode)
// 'log.txt' is created in root directory
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'log.txt'), {flags: 'a'})

// server documentation.html from public folder
app.use(express.static('public'))
// designating that morgan should be called with every req
  // no need for console.logging in each request
app.use(morgan('combined', {stream: accessLogStream}))
app.use(bodyParser.json())

// TODO: DATA HERE

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


// error handling 
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('something broke!')
})


// listen for requests
app.listen(8080, () => {
  console.log('App is listening on port 8080.')
})