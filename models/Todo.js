const mongoose = require('mongoose')
const Schema = mongoose.Schema

const todoSchema = new Schema({
  body: String,
  check: Boolean,
  tags: [String],
  userId: Schema.Types.ObjectId
})

const Todo = mongoose.model('Todo', todoSchema)

module.exports = Todo
