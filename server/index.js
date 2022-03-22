require('dotenv').config();
const express = require('express')
const cors = require('cors')
const port = process.env.PORT || 8080;
const mongoose = require('mongoose');
const userRouter = require('./Routes/userRouter')
const homeworkRouter = require('./Routes/homeworkRouter')
const rememberRouter = require('./Routes/rememberRouter')
const todoRouter = require('./Routes/todoRouter')

mongoose
  .connect(
    process.env.MONGODB_URI,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  )
  .then(() => {
    const app = express()
    const path = require('path')
    app.use(express.json())
    app.use('/api', userRouter)
    app.use('/api', homeworkRouter)
    app.use('/api', rememberRouter)
    app.use('/api', todoRouter)
    app.use(cors())

    const publicPath = path.join(__dirname, '..', 'public')
    app.use(express.static(publicPath))
    app.listen(port, () => {
      console.log('server has started!');
    })

  })




