const jwtSecret = 'your_jwt_secret' // same as used in JWTStrategy

// import jwt and passport
const jwt = require('jsonwebtoken')
const passport = require('passport')

require('./passport') // local passport file

// function to generate the JWT Token
let generateJWTToken = (user) => {
  return jwt.sign(user, jwtSecret, {
    subject: user.Username, // username to be encoded in JWT
    expiresIn: '7d', // specifies that token will expire in 7 days
    algorithm: 'HS256' // algorithm used to sign or encode values of JWT
  })
}

