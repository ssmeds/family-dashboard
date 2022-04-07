const mongoose = require('mongoose')

const weeklyMenuSchema = new mongoose.Schema({
  week: Number,
  foodOfTheDay: [{
    day: String,
    dish: String
  }]
})

const recipeSchema = new mongoose.Schema({
  dish: String
})

const WeeklyMenu = mongoose.model('weeklyMenu', weeklyMenuSchema)
const Recipe = mongoose.model('recipe', recipeSchema)

// const weeklyMenu = new WeeklyMenu({
//   week: 15,
//   foodOfTheDay: [{
//     day: 'Måndag',
//     dish: 'Spenatsoppa',
//   }, {
//     day: 'Tisdag',
//     dish: 'Spiksoppa',
//   }, {
//     day: 'Onsdag',
//     dish: 'Träsoppa',
//   }, {
//     day: 'Torsdag',
//     dish: 'Limsoppa',
//   }, {
//     day: 'Fredag',
//     dish: 'Kolsoppa',
//   }, {
//     day: 'Lördag',
//     dish: 'Papperssoppa',
//   }, {
//     day: 'Söndag',
//     dish: 'Stålsoppa',
//   }]
// });

const recipe = new Recipe({ dish: 'Spenatsoppa' })
// weeklyMenu.save().then(() => { console.log('One weeks menu added'); })
// recipe.save().then(() => { console.log('One recipe added'); })
// module.exports = mongoose.model('WeeklyMenu', weeklyMenuSchema)
module.exports = { WeeklyMenu, Recipe }
