// Did not use this router for this project but could possibly use it in the future

const express = require('express');
const router = express.Router()
const cors = require('cors')

router.use(cors({
  origin: "*",
  methods: ['POST', 'PUT', 'DELETE', 'GET', 'PATCH'],
  credentials: true
}));

//GET invitation
router.get('/', async (req, res) => {
  console.log('redirect to homepage for login req res', req, res);
  res.redirect('https://familydashboard.herokuapp.com/')
})

module.exports = router
