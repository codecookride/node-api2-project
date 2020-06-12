const express = require('express');
const usersRouter = require('./data/users-router')

const server= express();

server.use(express.json())
server.use('/api/posts', usersRouter);


server.get('/', (req, res)=>{
    res.json({message:"hello"})
});


module.exports = server;