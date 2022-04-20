const express = require('express');
const User = require('../models/Users');
const router = express.Router()
const cors = require('cors')

// router.use(cors());
router.use(cors({
  origin: "*",
  methods: ['POST', 'PUT', 'DELETE', 'GET', 'PATCH'],
  credentials: true
}));

//Get all Users
router.get('/users', async (req, res) => {
  const users = await User.find()
  console.log('users from get-fetch', users);
  res.send(users)
})

//Post a new user
router.post('/users', async (req, res) => {
  console.log('req.body:', req.body);
  try {
    console.log('connected to mongodb');

    await new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
      color: req.body.color,
      isLoggedIn: req.body.isLoggedIn,
      familyMembers: req.body.familyMembers,
      spouseFirstName: req.body.spouseFirstName,
      spouseLastName: req.body.spouseLastName,
      spouseEmail: req.body.spouseEmail,
      spousePassword: req.body.spousePassword,
      spouseColor: req.body.spouseColor,
      spouseIsLoggedIn: req.body.spouseIsLoggedIn,
    }).save()
  } catch (err) {
    console.log(err)
  }
})

//Get individual user
router.get('/users/:id', async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id })
    res.send(user)
  } catch {
    res.status(404)
    res.send({ error: 'User does not exist' })
  }

})

//Update user
router.patch('/users/:id', async (req, res) => {
  console.log('user to patch up', req.body);
  console.log('user to patch up params', req.params);
  try {
    const id = req.params.id
    const updates = req.body
    console.log('updates', updates);
    const options = {
      new: true
    }
    const result = await User.findByIdAndUpdate(id, updates, options)
    console.log('result', result);
    res.send(result)
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
