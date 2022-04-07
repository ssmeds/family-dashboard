const mongoose = require('mongoose')

const menuItemSchema = new mongoose.Schema({
  dish: String,
  day: String,
})

const MenuItem = mongoose.model('MenuItem', menuItemSchema)

const menuItem = new MenuItem({
  dish: 'Spenatsoppa',
  day: 'Måndag',
});
// menuItem.save().then(() => { console.log('One menuItem added'); })
module.exports = mongoose.model('MenuItems', menuItemSchema)
