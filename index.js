// import express
const express = require('express')
// import middleware Morgan to log info for requests
const morgan = require('morgan')
// set express to variable app
const app = express()

// designating that morgan should be called with every req
  // no need for console.logging in each request
app.use(morgan('common'))

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