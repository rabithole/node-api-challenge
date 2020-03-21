const express = require('express');

const projectsRouter = require('./projects/projectsRouter.js');
// const actionRouter = require('./projects/projectsRouter.js');

const server = express();

server.use(express.json());

server.use('/api/projects', projectsRouter);
// server.use('/api/action', actionRouter);

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware with a virus!</h2>`);
});

module.exports = server;