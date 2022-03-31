const express = require('express');
const userSchema = require('../models/Users');
const router = express.Router()
const cors = require('cors')

router.use(cors());
// router.use(cors({
//   origin: "*",
//   methods: ['POST', 'PUT', 'DELETE', 'GET'],
//   credentials: true
// }));

//Get all Users
router.get('/users', async (req, res) => {
  const users = await User.find()
  res.send(users)
})

//Post a new user
router.post('/users', async (req, res) => {
  console.log('req.body.familyMembers:', req.body.familyMembers);
  try {
    console.log('connected to mongodb');

    await new userSchema({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
      familyMembers: 
        req.body.familyMembers
      ,
    }).save()
  } catch (err) {
    console.log(err)
  }
//   const user = new User({
//     firstName: req.body.firstName,
//     lastName: req.body.lastName,
//     role: req.body.role,
//     email: req.body.email,
//     password: req.body.password
//   })
//   await user.save()
//   res.send(user)
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
    if (req.body.email) {
      user.email = req.body.email
    }
    if (req.body.password) {
      user.password = req.body.password
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
