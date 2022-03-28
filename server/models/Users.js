const mongoose = require('mongoose')
// const { v4: uuidv4 } = require('uuid');

const userSchema = new mongoose.Schema({
  // userId: String,
  firstName: String,
  lastName: String,
  role: String,
  email: String,
  password: String
})

const User = mongoose.model('User', userSchema)

const user = new User({
  // userId: uuidv4(),
  firstName: 'Stintan',
  lastName: 'Smedsan',
  role: 'Parent',
  email: 'stina@stina.se',
  password: '123'
});
// user.save().then(() => { console.log('One user added'); })
module.exports = mongoose.model('Users', userSchema)
