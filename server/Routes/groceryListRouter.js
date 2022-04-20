const express = require('express');
const GroceryListItem = require('../models/GroceryList');
const router = express.Router()
const cors = require('cors')

// router.use(cors());
router.use(cors({
  origin: "*",
  methods: ['POST', 'PUT', 'DELETE', 'GET', 'PATCH'],
  credentials: true
}));
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
router.patch('/groceryListItems/:id', (req, res) => {
  console.log('patch req.body:', req.body);//3

  GroceryListItem.findByIdAndUpdate(req.params.id, req.body)
    .then(() => res.json('item updated'))
    .catch((err) => { res.status(422).send('item update failed') })
})

// Update groceryListItem completed
router.put('/groceryListItems/:id', async (req, res) => {
  console.log('req.body in put quantity', req.body);
  let id = req.params.id
  try {
    let newQuantity = await GroceryListItem.findByIdAndUpdate(id, req.body.quantity, { new: true })
    console.log('new quantity', newQuantity);
    res.send(newQuantity)
  } catch {
    res.status(404)
    res.send({ error: 'GroceryListItem does not exist!' })
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
