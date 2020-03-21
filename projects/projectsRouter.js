const express = require('express');
const Project = require('../data/helpers/projectModel.js');
const Action = require('../data/helpers/actionModel.js');

const router = express.Router();

router.get('/', (req, res) => {
  // do your magic!
  Project.get()
  .then(proj => {
    res.status(200).json(proj);
  })
  .catch(error => {
    res.status(500).json({ error: '500, server error!' })
  })
});

router.post('/', (req, res) => {
  // do your magic!
  console.log('project' ,req.body)
  
  Project.insert(req.body)
  .then(proj => {
  	res.status(200).json(proj);
  })
  .catch(err => {
  	res.status(500).json({ error: "The server doesn't like what your doing!" })
  })
});

router.post('/:id/action', (req, res) => {
	console.log('action insertion:', req.body);
	
	Action.insert( { description: req.body.description, notes: req.body.notes } )
	.then(action => {
		res.status(200).json(action);
	})
	.catch(err => {
		res.status(500).json({ error: "The server doesn't like what your doing!" })
	})
});

router.get('/:id/action', (req, res) => {
	console.log(req.params)

	Project.getProjectActions(req.params.id)
	.then(action => {
		res.status(200).json(action);
	})
	.catch(err => {
		res.status(500).json({ error: "The server doesn't like what your doing!" })
	})
})

module.exports = router;