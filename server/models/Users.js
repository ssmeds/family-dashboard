const mongoose = require('mongoose')

const { Schema } = mongoose;

const familyMembersSchema = new Schema(
  {
    childFirstName: String,
    childColor: String
  }
)

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  color: String,
  isLoggedIn: Boolean,
  familyMembers: [familyMembersSchema],
  spouseFirstName: String,
  spouseLastName: String,
  spouseEmail: String,
  spousePassword: String,
  spouseColor: String,
  spouseIsLoggedIn: Boolean,
});

const User = mongoose.model('User', userSchema)

//Sample user to save to database

// const user = new User({
//   firstName: 'Stintan',
//   lastName: 'Smedsan',
//   role: 'Parent',
//   email: 'stina@stina.se',
//   password: '123'
// });
// user.save().then(() => { console.log('One user added'); })

module.exports = User
