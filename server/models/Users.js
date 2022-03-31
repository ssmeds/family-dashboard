const mongoose = require('mongoose')
// const { v4: uuidv4 } = require('uuid');

const { Schema } = mongoose;

const familyMembersSchema = new Schema(
  {
    childFirstName: String,
    personalNumber: Number,
    color: String
  }
)

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  color: String,
  familyMembers: [familyMembersSchema],
});

// const User = mongoose.model('User', userSchema)

// const user = new User({
//   // userId: uuidv4(),
//   firstName: 'Stintan',
//   lastName: 'Smedsan',
//   role: 'Parent',
//   email: 'stina@stina.se',
//   password: '123'
// });
// user.save().then(() => { console.log('One user added'); })
module.exports = mongoose.model('users', userSchema);
