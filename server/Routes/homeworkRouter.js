const express = require('express');
const Homework = require('../models/Homeworks');
const router = express.Router()
const cors = require('cors')

router.use(cors());

//Get all Homeworks
router.get('/homeworks', async (req, res) => {
  const homework = await Homework.find()
  res.send(homework)
})

//Post a new homework
router.post('/homeworks', async (req, res) => {
  const homework = new Homework({
    subject: req.body.subject,
    assignment: req.body.assignment,
    complete: req.body.complete,
    color: req.body.color,
    owner: req.body.owner
  })
  await homework.save()
  res.send(homework)
})

//Get individual homework
router.get('/homeworks/:id', async (req, res) => {
  try {
    const homework = await Homework.findOne({ _id: req.params.id })
    res.send(homework)
  } catch {
    res.status(404)
    res.send({ error: 'Homework does not exist' })
  }

})

//Update homework
router.patch('/homeworks/:id', async (req, res) => {
  try {
    const homework = await Homework.findOne({ _id: req.params.id })
    if (req.body.subject) {
      homework.subject = req.body.subject
    }
    if (req.body.assignment) {
      homework.assignment = req.body.assignment
    }
    if (req.body.complete) {
      homework.complete = req.body.complete
    }

    await homework.save()
    res.send(homework)
  } catch {
    res.status(404)
    res.send({ error: 'Homework does not exist!' })
  }
})

// Update homeworks completed
router.put('/homeworks/:id', async (req, res) => {
  console.log('req.params.id', req.params.id);
  let homework
  try {
    homework = await Homework.findById(req.params.id)
    homework.complete = !homework.complete
    await homework.save()
    res.send(homework)
  }
  catch {
    if (homework == null) {
      console.log('homework is null');
    } else {
      res.send({ msg: 'Error updating complete' })
    }
  }

})

//Delete homework
router.delete('/homeworks/:id', async (req, res) => {
  try {
    await Homework.deleteOne({ _id: req.params.id })
    res.status(204).send()
  } catch {
    res.status(404)
    res.send({ error: "Homework doesn't exist!" })
  }
})


module.exports = router
