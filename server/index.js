const express = require('express')
require('dotenv').config({ path: 'server/.env' });
const cors = require('cors')
const port = process.env.PORT || 8080;
const mongoose = require('mongoose');
const userRouter = require('./Routes/userRouter')
const homeworkRouter = require('./Routes/homeworkRouter')
const rememberRouter = require('./Routes/rememberRouter')
const todoRouter = require('./Routes/todoRouter')
const invitationRouter = require('./Routes/invitationRouter')
const menuRouter = require('./Routes/menuRouter')
const calendarNotesRouter = require('./Routes/calendarNotesRouter')
const groceryListRouter = require('./Routes/groceryListRouter')

// mongodb + srv://stina:stina@cluster0.uuyr3.mongodb.net/myFirstDatabase?retryWrites=true&w=majority

mongoose
  .connect(
    process.env.MONGODB_URI || 'mongodb+srv://stina:stina@cluster0.uuyr3.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  )
  .then(() => {
    const app = express()
    // app.use(cors())
    app.use(cors({
      origin: "*",
      methods: ['POST', 'PUT', 'DELETE', 'GET', 'PATCH'],
      credentials: true
    }))
    const path = require('path')
    app.use(express.json())
    app.use('/api', userRouter)
    app.use('/api', homeworkRouter)
    app.use('/api', rememberRouter)
    app.use('/api', todoRouter)
    app.use('/api', menuRouter)
    app.use('/api', calendarNotesRouter)
    app.use('/api', groceryListRouter)
    app.use('/invitation', invitationRouter)

    app.use(express.urlencoded({ extended: false }));

    if (process.env.NODE_ENV === 'production') {
      app.use(express.static('client/build'));
    }

    app.listen(port, () => {
      console.log('server has started!');
    })

  })
