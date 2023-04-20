// import express
const express = require('express')
// set express to variable app
const app = express()



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