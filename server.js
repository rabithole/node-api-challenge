const express = require('express');

// const userRouter = require('./users/userRouter.js');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware with a virus!</h2>`);
});

module.exports = server;