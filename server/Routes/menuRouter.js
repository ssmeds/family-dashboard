const express = require('express');
const MenuItem = require('../models/Menus');
const router = express.Router()
const cors = require('cors')

router.use(cors());

//Get all MenuItems
router.get('/menuItems', async (req, res) => {
  const menuItem = await MenuItem.find()
  res.send(menuItem)
})

//Post a new menuItem
router.post('/menuItems', async (req, res) => {
  console.log('req.body.day', req.body.day);
  console.log('req.body.day', req.body.dish);
  const menuItem = new MenuItem({
    dish: req.body.dish,
    day: req.body.day
  })
  await menuItem.save()
  res.send(menuItem)
})

//Get individual menuItem
router.get('/menuItems/:id', async (req, res) => {
  try {
    const menuItem = await MenuItem.findOne({ _id: req.params.id })
    res.send(menuItem)
  } catch {
    res.status(404)
    res.send({ error: 'MenuItem does not exist' })
  }

})

//Update menuItem
router.patch('/menuItems/:id', async (req, res) => {
  try {
    const menuItem = await MenuItem.findOne({ _id: req.params.id })
    if (req.body.dish) {
      menuItem.dish = req.body.dish
    }
    if (req.body.day) {
      menuItem.day = req.body.day
    }

    await menuItem.save()
    res.send(menuItem)
  } catch {
    res.status(404)
    res.send({ error: 'MenuItem does not exist!' })
  }
})

//Delete menuItem
router.delete('/menuItems/:id', async (req, res) => {
  try {
    await MenuItem.deleteOne({ _id: req.params.id })
    res.status(204).send()
  } catch {
    res.status(404)
    res.send({ error: "MenuItem doesn't exist!" })
  }
})


module.exports = router
