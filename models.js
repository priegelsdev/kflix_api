// models.js to keep models modularized 

// import mongoose 
  // model as a class that constructs documents according to specified schema
  // model specifies what data to store and how to store it --> BUSINESS LOGIC
const mongoose = require('mongoose')

// SCHEMA DOC
  /*
    Keys correspond to fields
    Values correspond to data types
  
    let <collectionSchema> = mongoose.<Schema>({
      Key: {Value},
      Key: {Value},
      Key: {
        Key: {Value},
        Key: {Value},
      }
    })
  */

// define movieSchema
let movieSchema = mongoose.Schema({
  Title: {type: String, required: true},
  Description: {type: String, required: true},
  Genre: {
    Name: String,
    Description: String
  },
  // director key refers to document in collection
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

// create models that use defined schemas
// creates collections with names in lowercase and pluralized (Movie => db.movies)
let Movie = mongoose.model('Movie', movieSchema)
let User = mongoose.model('User', userSchema)
let Director = mongoose.model('Director', directorSchema)
let Genre = mongoose.model('Genre', genreSchema)

// exporting models, so API endpoints can query MongoDB
module.exports.Movie = Movie
module.exports.User = User
module.exports.Director = Director
module.exports.Genre = Genre
