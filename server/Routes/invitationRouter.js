const express = require('express');
// const userSchema = require('../models/Users');
// const User = require('../models/Users');
const router = express.Router()
const cors = require('cors')

// router.use(cors());
router.use(cors({
  origin: "*",
  methods: ['POST', 'PUT', 'DELETE', 'GET', 'PATCH'],
  credentials: true
}));

//GET invitation
router.get('/:email', async (req, res) => {
  console.log('redirect to homepage for login req res', req, res);
  res.redirect('https://familydashboard.herokuapp.com/')
})

module.exports = router
