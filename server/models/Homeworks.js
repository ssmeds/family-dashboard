const mongoose = require('mongoose')

const homeworkSchema = new mongoose.Schema({
  subject: String,
  assignment: String,
  complete: Boolean,
  color: String,
  owner: {}
})

const Homework = mongoose.model('Homework', homeworkSchema)

//Sample homework to save to database

// const homework = new Homework({
//   subject: 'Engelska',
//   assignment: 'Lär dig de fyra väderstrecken',
//   complete: false
// });
// homework.save().then(() => { console.log('One entry added'); })

module.exports = mongoose.model('Homeworks', homeworkSchema)
