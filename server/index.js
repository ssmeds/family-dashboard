
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


// mongodb + srv://stina:stina@cluster0.uuyr3.mongodb.net/myFirstDatabase?retryWrites=true&w=majority


// const corsOptions = {
//   origin: 'https://familydashboard.herokuapp.com/',
//   credentials: true,            //access-control-allow-credentials:true
//   optionSuccessStatus: 200,
// }

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
    app.use('/invitation', invitationRouter)



    // const publicPath = path.join(__dirname, '..', '/build')
    // app.use(express.static(publicPath))

    // app.get('*', (req, res) => {
    //   res.sendFile(path.join(publicPath, 'index.html'));
    // });
    // app.use(express.static(path.join(__dirname, '..', '/public'), {
    //   index: false
    // }));
    // app.use(express.static(path.join(__dirname, '../client/build')));

    // Data parsing
    // app.use(express.json());
    app.use(express.urlencoded({ extended: false }));

    // Step 3

    if (process.env.NODE_ENV === 'production') {
      app.use(express.static('client/build'));
    }


    app.listen(port, () => {
      console.log('server has started!');
    })

  })




