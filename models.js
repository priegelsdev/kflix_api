// models.js to keep models modularized 

// import mongoose 
  // model as a class that constructs documents according to specified schema
  // model specifies what data to store and how to store it --> BUSINESS LOGIC
const mongoose = require('mongoose')

// define movieSchema
let movieSchema = mongoose.Schema({
  Title: {type: String, required: true},
  Description: {type: String, required: true},
  Genre: {
    Name: String,
    Description: String
  },
  Director: { type:mongoose.Schema.Types.ObjectId, ref: 'Director'},
  ImagePath: String,
  Featured: Boolean
})

// define userSchema
let userSchema = mongoose.Schema({
  Username: {type: String, required: true},
  Password: {type: String, required: true},
  Email: {type: String, required: true},
  Birthday: Date,
  FavoriteMovies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie'}]
})

// define directorSchema
let directorSchema = mongoose.Schema({
  Name: {type: String, required: true},
  Bio: {type: String, required: true}
})

// define genreSchema
let genreSchema = mongoose.Schema({
  Name: {type: String, required: true},
  Description: {type: String, required: true}
})

