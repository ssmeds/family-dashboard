const mongoose = require('mongoose')

const rememberSchema = new mongoose.Schema({
  task: String,
  date: Date,
  familyMember: String,
  color: String,
  owner: {}
})

const Remember = mongoose.model('Remember', rememberSchema)

const remember = new Remember({
  task: 'Gympa på fredagar',
  date: '2022-04-01',
  familyMember: 'Samuel',
  color: '#F9D570'
});
// remember.save().then(() => { console.log('One entry added'); })
module.exports = mongoose.model('Remembers', rememberSchema)
