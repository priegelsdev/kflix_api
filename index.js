// import express
const express = require('express')
// import middleware Morgan to log info for requests
const morgan = require('morgan')
// import middleware bodyparser to extract body portion of incoming request stream so it's easier to interface with
const bodyParser = require('body-parser')
// import dotenv
const dotenv = require('dotenv')
// import uuid 
const uuid = require('uuid')
// import node modules fs and path
const fs = require('fs')
  path = require('path')

dotenv.config()

// import mongoose and models from models.js
const mongoose = require('mongoose')
const Models = require('./models.js')

const Movies = Models.Movie
const Users = Models.User
const Directors = Models.Director
const Genres = Models.Genre

// PROCESS ENV to hide credentials
/* mongoose.connect('mongodb://localhost:27017/K-Flix', { useNewUrlParser: true, useUnifiedTopology: true}) */

mongoose.connect( process.env.CONNECTION_URI, { useNewUrlParser: true, useUnifiedTopology: true})

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

// including CORS right before auth
const cors = require('cors')
app.use(cors())

// calling passport and authorization
let auth = require('./auth')(app) // app argument so express is available in auth file as well
const passport = require('passport')
require('./passport')

// DATA
let users = [
  {
    id: '1',
    name: 'user1',
    username: 'user1',
    password: 'password',
    email: "user1@gmail.com"
  }
]

/* 
  GET requests 
*/
  // app.METHOD(PATH, HANDLER)
  // app as instance of express()
  // express constructs header with misc info
app.get('/', (req, res) => {
  let responseText = "Welcome to the KFlix API."
  responseText += '<small>Requested at: ' + req.requestTime + '</small>'
  res.send('Welcome to the KFlix API.')
})

// __dirname as module-specific variable providing path to current directory
/* app.get('/documentation', (req, res) => {
  res.sendFile('public/documentation.html', {root: __dirname})
}) */

// gets list of data about ALL users
app.get('/users', (req, res) => {
  Users.find()
    .then((users) => {
      res.status(200).json(users)
    })
    .catch((err) => {
      console.error(err)
      res.status(500).send('Error: ' + err)
    })
})

// gets info about specific user
app.get('/users/:Username', (req, res) => {
  Users.findOne({ Username: req.params.Username })
    .then((user) => {
      res.json(user)
    })
    .catch((err) => {
      console.error(err)
      res.status(500).send('Error: ' + err)
    })
})

// gets list of data about ALL movies
app.get('/movies', (req, res) => {
  Movies.find()
    .populate('Director')
    .populate('Genre')
    .then((movies) => {
      res.status(200).json(movies)
    })
    .catch((err) => {
      console.error(err)
      res.status(500).send('Error: ' + err)
    })
})

// gets data about a single movie, by title
app.get('/movies/:Title', (req, res) => {
  Movies.findOne({ Title: req.params.Title })
    .populate('Director')
    .populate('Genre')
    .then((movie) => {
      res.json(movie)
    })
    .catch((err) => {
      console.error(err)
      res.status(500).send('Error: ' + err)
    })
})

// gets data about all genres
app.get('/genres', (req, res) => {
  Genres.find()
  .then((genres) => {
    res.status(200).json(genres)
  })
  .catch((err) => {
    console.error(err)
    res.status(500).send('Error: ' + err)
  })
})

// gets data about a single genre by name
app.get('/genres/:Name', (req, res) => {
  Genres.findOne({ Name: req.params.Name })
    .then((genre) => {
      res.json(genre)
    })
    .catch((err) => {
      console.error(err)
      res.status(500).send('Error: ' + err)
    })
})

// gets data about a director
app.get('/directors', (req, res) => {
  Directors.find()
    .then((directors) => {
      res.status(200).json(directors)
    })
    .catch((err) => {
      console.error(err)
      res.status(500).send('Error: ' + err)
    })
})

// gets data about a single director by name
app.get('/directors/:Name', (req, res) => {
  Directors.findOne({ Name: req.params.Name })
    .then((director) => {
      res.json(director)
    })
    .catch((err) => {
      console.error(err)
      res.status(500).send('Error: ' + err)
    })
})

/* 
  POST requests 
*/

// adds data for a new user
app.post('/users', (req, res) => {
  let newUser = req.body

  if (!newUser.name) {
    const message = "Missing name in request body"
    res.status(400).send(message)
  } else {
    // add randomly generated id to user
    newUser.id = uuid.v4()
    // push the new user to the users array
    users.push(newUser)
    res.status(201).send(newUser)
  }
})

// adds favorite movie of user
app.post('/users/:Username/movies/:title', (req, res) => {
  let favMovie = req.body

  if (!favMovie.title) {
    const message = "Missing title in request body"
    res.status(400).send(message)
  } else {
    favMovie.id = uuid.v4() 
    // TODO: create favorite movie array
    favMovies.push(favMovie)
    res.status(201).send(favMovie)
  }
})

/* 
  DELETE requests 
*/

// delete a user from our list by ID; deregister
app.delete('/users/:id', (req, res) => {
  // does the user exist? true or false
  let user = users.find((user) => {
    return user.id === req.params.id
  })

  if (user) {
    users = users.filter((obj) => {
      return obj.id !== req.params.id
    })
    res.status(201).send('User ' + req.params.id + ' has successfully deregistered.')
  }
})

/* 
  PUT requests 
*/

// update user information
app.put('/users/:id', (req, res) => {
  let user = users.find((user) => {
    return user.name === req.params.id
  })

  // TODO: Code to execute on information change
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