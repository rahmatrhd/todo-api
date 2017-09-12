const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/todo')

const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)
global.io = io

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

//routing
const index = require('./routes/index')
const todo = require('./routes/todo')
const users = require('./routes/users')

app.use('/', index)
app.use('/todo', todo)
app.use('/users', users)

server.listen(3000, () => {
  console.log('listening...')
})
