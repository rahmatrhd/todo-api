const mongoose = require('mongoose')
const Todo = require('../models/Todo')
const jwt = require('jsonwebtoken')
const cron = require('node-cron')

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
      due: req.body.due,
      tags: tagsToArray(req.body.tags),
      userId: user._id
    })
    .then(result => {
      if (result.due != null) {
        let due = new Date(result.due)
        console.log(new Date(), due)
        cron.schedule(`${due.getSeconds()} ${due.getMinutes()} ${due.getHours()} ${due.getDate()} ${due.getMonth() + 1} *`, function(){
          console.log('checked')
          Todo.update({
            _id: result._id
          }, {
            check: true
          })
          .then(() => {
            global.io.emit('checked', result._id)
          })
          .catch(err => res.send(err))
        })
      }

      res.send(result)
    })
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
    Todo.deleteOne({_id: req.params.id})
    .then(result => res.send(result))
    .catch(err => res.send(err))
  }
}
