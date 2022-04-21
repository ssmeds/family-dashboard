const mongoose = require('mongoose')

const groceryListSchema = new mongoose.Schema({
  item: String,
  quantity: Number,
  complete: Boolean,
  owner: Object
})

const GroceryListItem = mongoose.model('GroceryListItem', groceryListSchema)

//Sample Item to save to database

// const groceryListItem = new GroceryListItem({
//   item: 'Havremjölk',
//   quantity: 3,
//   complete: false
// });
// groceryListItem.save().then(() => { console.log('One item added'); })

module.exports = GroceryListItem
