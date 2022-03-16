require('dotenv').config();
const express = require('express')
const app = express()
const port = 5000
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
// uuidv4();

mongoose.connect(
  process.env.MONGODB_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

const userSchema = new mongoose.Schema({
  userId: String,
  firstName: String,
  lastName: String,
  roll: String,
  familyMembers: [String]
})

const User = mongoose.model('User', userSchema)

const user = new User({
  userId: uuidv4(),
  firstName: 'Stintan',
  lastName: 'Smedsan',
  roll: 'Parent',
  familyMembers: ['Fredrik', 'Johannes']
});
// user.save().then(() => { console.log('One entry added'); })

app.get('/', (req, res) => {
  User.find({}, (found, err) => {
    if (!err) {
      res.send(found);
    }
    console.log('this is the err', err);
    res.send("Some error occured! Is this something new?")
  })
});

// app.get('/', (req, res) => {
//   res.send('Hello World! This is your backend!')
// })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
