const express = require('express');
const GroceryListItem = require('../models/GroceryList');
const router = express.Router()
const cors = require('cors')

router.use(cors());

//Get all GroceryListItems
router.get('/groceryListItems', async (req, res) => {
  const groceryListItem = await GroceryListItem.find()
  res.send(groceryListItem)
})

//Post a new groceryListItem
router.post('/groceryListItems', async (req, res) => {
  console.log('req.body.item', req.body.item);
  const groceryListItem = new GroceryListItem({
    item: req.body.item,
    quantity: req.body.quantity,
    complete: req.body.complete,
    owner: req.body.owner
  })
  await groceryListItem.save()
  res.send(groceryListItem)
})

//Get individual groceryListItem
router.get('/groceryListItems/:id', async (req, res) => {
  try {
    const groceryListItem = await GroceryListItem.findOne({ _id: req.params.id })
    res.send(groceryListItem)
  } catch {
    res.status(404)
    res.send({ error: 'GroceryListItem does not exist' })
  }

})

//Update groceryListItem
router.patch('/groceryListItems/:id', async (req, res) => {
  console.log('patching quantity', req.body);
  try {
    const groceryListItem = await GroceryListItem.findOne({ _id: req.params.id })
    if (req.body.item) {
      groceryListItem.item = req.body.item
    }
    if (req.body.quantity) {
      groceryListItem.quantity = req.body.quantity
    }
    if (req.body.complete) {
      groceryListItem.complete = req.body.complete
    }

    await groceryListItem.save()
    res.send(groceryListItem)
  } catch {
    res.status(404)
    res.send({ error: 'GroceryListItem does not exist!' })
  }
})

// Update groceryListItem completed
router.put('/groceryListItems/:id', async (req, res) => {
  console.log('req.params.id', req.params.id);
  let groceryListItem
  try {
    groceryListItem = await GroceryListItem.findById(req.params.id)
    groceryListItem.complete = !groceryListItem.complete
    await groceryListItem.save()
    res.send(groceryListItem)
  }
  catch {
    if (groceryListItem == null) {
      console.log('groceryListItem is null');
    } else {
      res.send({ msg: 'Error updating complete' })
    }
  }

})

//Delete groceryListItem
router.delete('/groceryListItems/:id', async (req, res) => {
  try {
    await GroceryListItem.deleteOne({ _id: req.params.id })
    res.status(204).send()
  } catch {
    res.status(404)
    res.send({ error: "GroceryListItem doesn't exist!" })
  }
})


module.exports = router
