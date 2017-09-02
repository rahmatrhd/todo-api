const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const todoController = require('../controllers/todoController')

authorization = (req, res, next) => {
  jwt.verify(req.headers.accesstoken, process.env.APP_SECRET_KEY, (err, decoded) => {
    if (err) res.send(false)
    else next()
  })
}

router.get('/', authorization, todoController.getAll)
router.post('/', authorization, todoController.add)
router.put('/check/:id', authorization, todoController.check)
router.put('/edit/:id', authorization, todoController.update)
router.delete('/delete/:id', authorization, todoController.delete)

module.exports = router
