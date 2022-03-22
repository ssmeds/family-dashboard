const mongoose = require('mongoose')
// const { v4: uuidv4 } = require('uuid');

const userSchema = new mongoose.Schema({
  // userId: String,
  firstName: String,
  lastName: String,
  role: String,
  familyMembers: [String]
})

const User = mongoose.model('User', userSchema)

const user = new User({
  // userId: uuidv4(),
  firstName: 'Stintan',
  lastName: 'Smedsan',
  role: 'Parent',
  familyMembers: ['Fredrik', 'Johannes']
});
// user.save().then(() => { console.log('One entry added'); })
module.exports = mongoose.model('Users', userSchema)
