// configure passport strategies
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const Models = require('./models.js')
const passportJWT = require('passport-jwt')

let Users = Models.User
let JWTStrategy = passportJWT.Strategy
let ExtractJWT = passportJWT.ExtractJwt

// define local strategy for basic HTTP authentication for login requests
  // takes username and password from request body and uses mongoose to check db for user with that username
  // if it matches, callback executes --> login endpoint
  // if it fails, error message passed to callback

passport.use(new LocalStrategy({
  usernameField: 'Username',
  passwordField: 'Password'
}, (username, password, callback) => {
  console.log(username + ' ' + password)
  Users.findOne({ Username: username }, (error, user) => {
    if (error) {
      console.log(error)
      return callback(error)
    }

    if (!user) {
      console.log('incorrect username')
      return callback(null, false, {message: 'Incorrect username or password'})
    }

    console.log('finished')
    return callback(null, user)
  })
}))

// JWT authentication
  // authenticate users based on JWT submitted alongside request
  // JWT extracted from HTTP req header --> BEARER TOKEN
  // needs secret key to verify signature of JWT
passport.use(new JWTStrategy({
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'your_jwt_secret'
}, (jwtPayload, callback) => {
  return Users.findById(jwtPayload._id)
    .then((user) => {
      return callback(null, user)
    })
    .catch((error) => {
      return callback(error)
    })
}))