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
  // GroceryListItem.findByIdAndUpdate(req.params.id, { quantity: req.body }, { new: true }).then((item) => {
  //   if (!item) {
  //     return res.status(404).send();
  //   }
  //   res.send(item);
  // }).catch((error) => {
  //   res.status(500).send(error);
  // })
  // // try {
  // let id = req.params.id
  // let quantity = req.body.quantity
  // // let update = req.body
  // // const options = { new: true }
  // // console.log('updatedQuantity', updatedQuantity);
  // // let newQuantity = await GroceryListItem.findByIdAndUpdate(id, update, options)
  // GroceryListItem.findByIdAndUpdate(id, { $set: { quantity: quantity } }, { new: true }).then(updatedItem => {
  //   res.send('Item updated by id through PATCH', updatedItem);
  // });
  // // let item = await GroceryListItem.find((item => item._id === id), {
  // //   new: true
  // // })
  // // item.quantity = req.body.quantity
  // // console.log('new quantity', newQuantity);
  // // res.send(newQuantity)
  // // } catch {
  // //   res.status(404)
  // //   res.send({ error: 'GroceryListItem does not exist!' })
  // // }

  // try {
  //   const groceryListItem = await GroceryListItem.findOne({ _id: req.params.id }, { new: true })
  //   groceryListItem.quantity = req.body.quantity

  //   await groceryListItem.save()
  //   res.send(groceryListItem)
  // } catch {
  //   res.status(404)
  //   res.send({ error: 'GroceryListItem does not exist!' })
  // }
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

  // let groceryListItem
  // try {
  //   groceryListItem = await GroceryListItem.findById(req.params.id)
  //   groceryListItem.complete = !groceryListItem.complete
  //   await groceryListItem.save()
  //   res.send(groceryListItem)
  // }
  // catch {
  //   if (groceryListItem == null) {
  //     console.log('groceryListItem is null');
  //   } else {
  //     res.send({ msg: 'Error updating complete' })
  //   }
  // }

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
