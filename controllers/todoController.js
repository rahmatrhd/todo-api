const mongoose = require('mongoose')
const Todo = require('../models/Todo')
const jwt = require('jsonwebtoken')

//helpers
const tagsToArray = require('../helpers/tagsToArray')

const verify = token => jwt.verify(token, process.env.APP_SECRET_KEY)

module.exports = {
  getAll: (req, res) => {
    let user = verify(req.headers.accesstoken)
    // console.log(user);
    Todo.find({userId: user._id})
    .then(result => res.send(result))
    .catch(err => res.send(err))
  },

  add: (req, res) => {
    let user = verify(req.headers.accesstoken)
    Todo.create({
      body: req.body.body,
      check: false,
      tags: tagsToArray(req.body.tags),
      userId: user._id
    })
    .then(result => res.send(result))
    .catch(err => res.send(err))
  },

  check: (req, res) => {
    Todo.update({_id: req.params.id}, {
      check: req.body.check
    })
    .then(result => res.send(result))
    .catch(err => res.send(err))
  },

  update: (req, res) => {
    Todo.update({_id: req.params.id}, {
      body: req.body.body,
      tags: tagsToArray(req.body.tags)
    })
    .then(result => res.send(result))
    .catch(err => res.send(err))
  },

  delete: (req, res) => {
    Todo.delete({_id: req.params.id})
    .then(result => res.send(result))
    .catch(err => res.send(err))
  }
}
