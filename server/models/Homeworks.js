const mongoose = require('mongoose')
// const { v4: uuidv4 } = require('uuid');

const homeworkSchema = new mongoose.Schema({
  // userId: String,
  subject: String,
  assignment: String,
  complete: Boolean,
  color: String,
  owner: {}
})

const Homework = mongoose.model('Homework', homeworkSchema)

const homework = new Homework({
  subject: 'Engelska',
  assignment: 'Lär dig de fyra väderstrecken',
  complete: false
});
// homework.save().then(() => { console.log('One entry added'); })
module.exports = mongoose.model('Homeworks', homeworkSchema)
