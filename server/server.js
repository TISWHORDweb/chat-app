const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose');
const socket = require('./socket');
require('dotenv').config()

//constant
const MONGODB_URI = process.env.MONGODB_URL

// routes 
const authRoutes = require('./routes/authRoutes')
const conversationRouter = require('./routes/conversationRoute');
const usersRouter = require('./routes/usersRouter');

// utils
const app = express();
const isAuth = require('./utils/isAuth');

app.use(express.json())
app.use(cors())

// isAuth
app.use('/auth', authRoutes)
app.use('/conversation', isAuth, conversationRouter)
app.use('/users', isAuth, usersRouter)

// mongoose.connect(MONGODB_URI, { useUnifiedTopology: true, useNewUrlParser: true }, (err) => {
//     if (err) console.log(err)
    
// })


mongoose.connect("mongodb://localhost/chat", {useNewUrlParser:true,useUnifiedTopology: true},
err=>{
    if(err)throw err 
    console.log("Database Connected");
    const server = app.listen(7000, () => console.log('http://locahost:7000'))
    socket.init(server)
});

mongoose.Promise=global.Promise



