const mongoose = require('mongoose')

const notesSchema = new mongoose.Schema({
  task: String,
  date: Date,
  owner: {}
})

const Note = mongoose.model('Note', notesSchema)

//Sample note to save to database

// const note = new Note({
//   task: 'Gå ut med soporna',
//   date: '2022-03-20',
// });
// note.save().then(() => { console.log('One calendar note added'); })

module.exports = mongoose.model('Notes', notesSchema)
