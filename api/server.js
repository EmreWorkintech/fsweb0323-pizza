//1. import
const express = require('express');
const server = express();
const usersRouter = require('./Users/users-router');

//2. middleware

//3. router
server.get('/', (req,res)=>{
    res.json({message: "Server up and running..."})
})
server.use('/api/users', usersRouter)
//4. error middleware

//export
module.exports = server;