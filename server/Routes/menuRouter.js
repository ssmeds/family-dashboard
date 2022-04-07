const express = require('express');
const { WeeklyMenu, Recipe } = require('../models/Menus');
const router = express.Router()
const cors = require('cors')

router.use(cors());

//Get all WeeklyMenus
router.get('/weeklyMenus', async (req, res) => {
  const weeklyMenu = await WeeklyMenu.find()
  console.log('weeklyMenu in router get', weeklyMenu);
  res.send(weeklyMenu)
})
//Get all Recipes
router.get('/recipes', async (req, res) => {
  const recipe = await Recipe.find()
  res.send(recipe)
})

//Post a new weeklyMenu
router.post('/weeklyMenus', async (req, res) => {
  console.log('req.body.day', req.body.day);
  console.log('req.body.dish', req.body.dish);
  const weeklyMenu = new WeeklyMenu({
    dish: req.body.dish,
    day: req.body.day
  })
  await weeklyMenu.save()
  res.send(weeklyMenu)
})

//Post a new recipe
router.post('/recipes', async (req, res) => {
  console.log('req.body.dish', req.body.dish);
  const recipe = new Recipe({
    dish: req.body.dish
  })
  await recipe.save()
  res.send(recipe)
})

//Get individual weeklyMenu
router.get('/weeklyMenus/:id', async (req, res) => {
  try {
    const weeklyMenu = await WeeklyMenu.findOne({ _id: req.params.id })
    res.send(weeklyMenu)
  } catch {
    res.status(404)
    res.send({ error: 'WeeklyMenu does not exist' })
  }

})

//Get individual recipe
router.get('/recipes/:id', async (req, res) => {
  try {
    const recipe = await Recipe.findOne({ _id: req.params.id })
    res.send(recipe)
  } catch {
    res.status(404)
    res.send({ error: 'Recipe does not exist' })
  }

})

//Update weeklyMenu
router.patch('/weeklyMenus/:id', async (req, res) => {
  try {
    const weeklyMenu = await WeeklyMenu.findOne({ _id: req.params.id })
    if (req.body.dish) {
      weeklyMenu.dish = req.body.dish
    }
    if (req.body.day) {
      weeklyMenu.day = req.body.day
    }

    await weeklyMenu.save()
    res.send(weeklyMenu)
  } catch {
    res.status(404)
    res.send({ error: 'WeeklyMenu does not exist!' })
  }
})

//Update recipe
router.patch('/recipes/:id', async (req, res) => {
  try {
    const recipe = await Recipe.findOne({ _id: req.params.id })
    if (req.body.dish) {
      weeklyMenu.dish = req.body.dish
    }

    await recipe.save()
    res.send(recipe)
  } catch {
    res.status(404)
    res.send({ error: 'Recipe does not exist!' })
  }
})

//Delete weeklyMenu
router.delete('/weeklyMenus/:id', async (req, res) => {
  try {
    await WeeklyMenu.deleteOne({ _id: req.params.id })
    res.status(204).send()
  } catch {
    res.status(404)
    res.send({ error: "WeeklyMenu doesn't exist!" })
  }
})

//Delete recipe
router.delete('/recipes/:id', async (req, res) => {
  try {
    await Recipe.deleteOne({ _id: req.params.id })
    res.status(204).send()
  } catch {
    res.status(404)
    res.send({ error: "Recipe doesn't exist!" })
  }
})

module.exports = router
