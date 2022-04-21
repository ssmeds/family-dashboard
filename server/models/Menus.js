const mongoose = require('mongoose')

const weeklyMenuSchema = new mongoose.Schema({
  weekNr: Number,
  weekMenu: [],
  owner: {}
})

// Did not use recipe but could implement it in the future
const recipeSchema = new mongoose.Schema({
  dish: String
})

const WeeklyMenu = mongoose.model('weeklyMenu', weeklyMenuSchema)
const Recipe = mongoose.model('recipe', recipeSchema)

// weeklyMenu.save().then(() => { console.log('One weeks menu added'); })

module.exports = { WeeklyMenu, Recipe }
