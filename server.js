// creating own web server

// req http 
const http = require('http')
// req fs module
const fs = require('fs')
// req url module
const url = require('url')


// server creation
http.createServer((request, response) => {
  // declare variables
    // get URL from request
    // results from request set to q
  let addr = request.url
  let q = url.parse(addr, true)

  // declare file path; __dirname is module-specific variable providing path to current directory 
  if (q.pathname.includes('documentation')) {
    filePath = (__dirname + '/documentation.html')
  } else {
    // if url doesnt exist, user gets redirected to main page
    filePath = 'index.html'
  }

  // file system reads file and is able to throw errors or show response
  fs.readFile(filePath, (err, data) => {
    if (err) {
      throw err
    }

    response.writeHead(200, { 'Content-Type': 'text/html' })
    response.write(data)
    response.end()
  
  })
}).listen(8080);

console.log('This is a node test server running on Port 8080.');

