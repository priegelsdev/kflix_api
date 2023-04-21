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
let users = [
  {
    id: '1',
    name: 'user1',
    username: 'user1',
    password: 'password',
    email: "user1@gmail.com"
  }
]

let movies = [
  {
    'id': '1',
    'title': 'Oldboy',
    'director': 'Park Chan-Wook',
    'genre': [
      'Thriller',
      'Drama'
    ],
    'release_date': '2003'
  },
  {
    'id': '2',
    'title': 'Parasite',
    'director': 'Bong Joon-ho',
    'genre': [
      'Drama',
      'Comedy',
      'Thriller'
    ],
    'release_date': '2019'
  },
  {
    'id': '3',
    'title': 'The Handmaiden',
    'director': 'Park Chan-Wook',
    'genre': [
      'Romance',
      'Drama'
    ],
    'release_date': '2016'
  },
  {
    'id': '4',
    'title': 'I Saw the Devil',
    'director': 'Kim Jee-woon',
    'genre': [
      'Thriller',
      'Action'
    ],
    'release_date': '2010'
  },
  {
    'id': '5',
    'title': 'Mother',
    'director': 'Bong Joon-ho',
    'genre': 'Mystery',
    'release_date': '2009'
  },
  {
    'id': '6',
    'title': 'Joint Security Area',
    'director': 'Park Chan-Wook',
    'genre': [
      'Mystery',
      'Drama'
    ],
    'release_date': '2010'
  },
  {
    'id': '7',
    'title': 'A Bittersweet Life',
    'director': 'Kim Jee-woon',
    'genre': [
      'Action',
      'Drama'
    ],
    'release_date': '2005'
  },
  {
    'id': '8',
    'title': 'Memories of Murder',
    'director': 'Bong Joon-ho',
    'genre': [
      'Crime',
      'Thriller'
    ],
    'release_date': '2003'
  },
  {
   'id': '9',
   'title': 'The Chaser',
   'director': 'Na Hong-jin',
   'genre': [
     'Thriller',
     'Action'
   ],
   'release_date': '2008'
  },
  {
    'id': '10',
    'title': 'A Tale of Two Sisters',
    'director': 'Kim Jee-woon',
    'genre': [
      'Horror',
      'Thriller'
    ],
    'release_date': '2003'
  }
];


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