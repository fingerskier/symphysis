const express = require('express')
const app = express()
const http = require('http').createServer(app)
const io = require('socket.io')(http)
const url = require('url')

const PORT = process.env.PORT || 3000


// Middleware to track basic-auth credentials provided in the URL
app.use((req, res, next) => {
  // For URLs like http://user:pass@domain.com, browsers will include an Authorization header
  const auth = req.headers.authorization
  if (auth) {
    console.log('Tracking credentials:', auth)
    // You could add further tracking logic here
  } else {
    console.log('No basic-auth credentials provided.')
  }
  next()
})

// Serve static files from the "public" directory
app.use(express.static('public'))

// Shared state object that will be updated and broadcast to clients
let sharedState = {}

// WebSocket connection handling for two-way data-binding and multi-window support
io.on('connection', (socket) => {
  console.log('A client connected')

  // Send the current state to the newly connected client
  socket.emit('stateUpdate', sharedState)

  // When a client sends a state update, merge it into the shared state and broadcast
  socket.on('updateState', (newState) => {
    sharedState = { ...sharedState, ...newState }
    io.emit('stateUpdate', sharedState)
  })

  socket.on('disconnect', () => {
    console.log('A client disconnected')
  })
})

http.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})