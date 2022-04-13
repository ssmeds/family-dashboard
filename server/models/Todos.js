const mongoose = require('mongoose')

const todoSchema = new mongoose.Schema({
  task: String,
  date: Date,
  complete: Boolean,
  owner: Object
})

const Todo = mongoose.model('Todo', todoSchema)

const todo = new Todo({
  task: 'Gå ut med soporna',
  date: '2022-03-20',
  complete: false
});
// todo.save().then(() => { console.log('One entry added'); })
module.exports = mongoose.model('Todos', todoSchema)
