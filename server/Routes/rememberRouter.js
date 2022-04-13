const express = require('express');
const Remember = require('../models/Remembers');
const router = express.Router()
const cors = require('cors')

router.use(cors());

//Get all Remembers
router.get('/remembers', async (req, res) => {
  const remember = await Remember.find()
  res.send(remember)
})

//Post a new remember
router.post('/remembers', async (req, res) => {
  const remember = new Remember({
    task: req.body.task,
    date: req.body.date,
    familyMember: req.body.familyMember,
    color: req.body.color,
    owner: req.body.owner

  })
  await remember.save()
  res.send(remember)
})

//Get individual remember
router.get('/remembers/:id', async (req, res) => {
  try {
    const remember = await Remember.findOne({ _id: req.params.id })
    res.send(remember)
  } catch {
    res.status(404)
    res.send({ error: 'Remember does not exist' })
  }

})

//Update remember
router.patch('/remembers/:id', async (req, res) => {
  try {
    const remember = await Remember.findOne({ _id: req.params.id })
    if (req.body.subject) {
      remember.subject = req.body.subject
    }
    if (req.body.assignment) {
      remember.assignment = req.body.assignment
    }
    if (req.body.complete) {
      remember.complete = req.body.complete
    }

    await remember.save()
    res.send(remember)
  } catch {
    res.status(404)
    res.send({ error: 'Remember does not exist!' })
  }
})

// Update remembers completed
router.put('/remembers/:id', async (req, res) => {
  console.log('req.params.id', req.params.id);
  let remember
  try {
    remember = await Remember.findById(req.params.id)
    remember.complete = !remember.complete
    await remember.save()
    res.send(remember)
  }
  catch {
    if (remember == null) {
      console.log('remember is null');
    } else {
      res.send({ msg: 'Error updating complete' })
    }
  }

})

//Delete remember
router.delete('/remembers/:id', async (req, res) => {
  try {
    await Remember.deleteOne({ _id: req.params.id })
    res.status(204).send()
  } catch {
    res.status(404)
    res.send({ error: "Remember doesn't exist!" })
  }
})


module.exports = router
