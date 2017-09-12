require('dotenv').config()
const FB = require('fb')
const jwt = require('jsonwebtoken')
const User = require('../models/User')

module.exports = {
  setFBAccessToken: (req, res, next) => {
    FB.setAccessToken(req.headers.fbaccesstoken);
    next()
  },

  getUser: (req, res) => {
    FB.api('/me', response => {
      console.log(response)
    })
  },

  login: (req, res) => {
    User.findOne({facebookId: req.headers.fbid})
    .then(user => {
      if (user == false)
        FB.api('/me', response => {
          User.create({
            facebookId: response.id,
            name: response.name
          })
          .then(createdUser => {
            // console.log(createdUser);
            res.send(jwt.sign({
              _id: createdUser._id,
              name: createdUser.name
            }, process.env.APP_SECRET_KEY))
          })
          .catch(err => res.send(err))
        })
      else {
        // console.log(user);
        res.send(jwt.sign({
          _id: user._id,
          name: user.name
        }, process.env.APP_SECRET_KEY))
      }
    })
    .catch(err => res.send(err))
  }
}
