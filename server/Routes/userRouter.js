const express = require('express');
const Users = require('../models/Users');
const router = express.Router()
const cors = require('cors')

router.use(cors());

//Get all Users
router.get('/users', async (req, res) => {
  const users = await Users.find()
  res.send(users)
})

//Post a new user
router.post('/users', async (req, res) => {
  const user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    role: req.body.role,
    familyMembers: req.body.familyMembers
  })
  await user.save()
  res.send(user)
})

//Get individual user
router.get('/users/:id', async (req, res) => {
  try {
    const user = await Users.findOne({ _id: req.params.id })
    res.send(user)
  } catch {
    res.status(404)
    res.send({ error: 'User does not exist' })
  }

})

//Update user
router.patch('/users/:id', async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id })
    if (req.body.firstName) {
      user.firstName = req.body.firstName
    }
    if (req.body.lastName) {
      user.lastName = req.body.lastName
    }
    if (req.body.role) {
      user.role = req.body.role
    }
    if (req.body.familyMembers) {
      user.familyMembers = req.body.familyMembers
    }
    await user.save()
    res.send(user)
  } catch {
    res.status(404)
    res.send({ error: 'User does not exist!' })
  }
})

//Delete user
router.delete('/users/:id', async (req, res) => {
  try {
    await User.deleteOne({ _id: req.params.id })
    res.status(204).send()
  } catch {
    res.status(404)
    res.send({ error: "Post doesn't exist!" })
  }
})


module.exports = router
