const express = require('express');
const Note = require('../models/CalendarNotes');
const router = express.Router()
const cors = require('cors')

router.use(cors());

//Get all Notes
router.get('/notes', async (req, res) => {
  const note = await Note.find()
  res.send(note)
})

//Post a new note
router.post('/notes', async (req, res) => {
  console.log('req.body.date', req.body.date);
  console.log('req.body.date', req.body.task);
  const note = new Note({
    task: req.body.task,
    date: req.body.date,
    owner: req.body.owner
  })
  await note.save()
  res.send(note)
})

//Get individual note
router.get('/notes/:id', async (req, res) => {
  try {
    const note = await Note.findOne({ _id: req.params.id })
    res.send(note)
  } catch {
    res.status(404)
    res.send({ error: 'Note does not exist' })
  }

})

//Update note
router.patch('/notes/:id', async (req, res) => {
  try {
    const note = await Note.findOne({ _id: req.params.id })
    if (req.body.task) {
      note.task = req.body.task
    }
    if (req.body.date) {
      note.date = req.body.date
    }

    await note.save()
    res.send(note)
  } catch {
    res.status(404)
    res.send({ error: 'Note does not exist!' })
  }
})

//Delete note
router.delete('/notes/:id', async (req, res) => {
  try {
    await Note.deleteOne({ _id: req.params.id })
    res.status(204).send()
  } catch {
    res.status(404)
    res.send({ error: "Note doesn't exist!" })
  }
})

module.exports = router
