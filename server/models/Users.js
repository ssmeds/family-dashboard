const mongoose = require('mongoose')
// const { v4: uuidv4 } = require('uuid');

const { Schema } = mongoose;

const familyMembersSchema = new Schema(
  {
    childFirstName: String,
    personalNumber: Number,
    childColor: String
  }
)

const spouceSchema = new Schema(
  {
    spouceFirstName: String,
    spouceLastName: String,
    spouceEmail: String,
    spoucePassword: String,
    spouceColor: String,
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
  spouce: [spouceSchema]
});

const User = mongoose.model('User', userSchema)

// const user = new User({
//   // userId: uuidv4(),
//   firstName: 'Stintan',
//   lastName: 'Smedsan',
//   role: 'Parent',
//   email: 'stina@stina.se',
//   password: '123'
// });
// user.save().then(() => { console.log('One user added'); })
// module.exports = mongoose.model('User', userSchema);
module.exports = User
