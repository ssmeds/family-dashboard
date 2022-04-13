const express = require('express');
const Todo = require('../models/Todos');
const router = express.Router()
const cors = require('cors')

router.use(cors());

//Get all Todos
router.get('/todos', async (req, res) => {
  const todo = await Todo.find()
  res.send(todo)
})

//Post a new todo
router.post('/todos', async (req, res) => {
  console.log('req.body.date', req.body.date);
  console.log('req.body.date', req.body.task);
  const todo = new Todo({
    task: req.body.task,
    date: req.body.date,
    complete: req.body.complete,
    owner: req.body.owner
  })
  await todo.save()
  res.send(todo)
})

//Get individual todo
router.get('/todos/:id', async (req, res) => {
  try {
    const todo = await Todo.findOne({ _id: req.params.id })
    res.send(todo)
  } catch {
    res.status(404)
    res.send({ error: 'Todo does not exist' })
  }

})

//Update todo
router.patch('/todos/:id', async (req, res) => {
  try {
    const todo = await Todo.findOne({ _id: req.params.id })
    if (req.body.task) {
      todo.task = req.body.task
    }
    if (req.body.date) {
      todo.date = req.body.date
    }
    if (req.body.complete) {
      todo.complete = req.body.complete
    }

    await todo.save()
    res.send(todo)
  } catch {
    res.status(404)
    res.send({ error: 'Todo does not exist!' })
  }
})

// Update todos completed
router.put('/todos/:id', async (req, res) => {
  console.log('req.params.id', req.params.id);
  let todo
  try {
    todo = await Todo.findById(req.params.id)
    todo.complete = !todo.complete
    await todo.save()
    res.send(todo)
  }
  catch {
    if (todo == null) {
      console.log('todo is null');
    } else {
      res.send({ msg: 'Error updating complete' })
    }
  }

})

//Delete todo
router.delete('/todos/:id', async (req, res) => {
  try {
    await Todo.deleteOne({ _id: req.params.id })
    res.status(204).send()
  } catch {
    res.status(404)
    res.send({ error: "Todo doesn't exist!" })
  }
})


module.exports = router
