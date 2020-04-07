const express = require('express');
const Project = require('../data/helpers/projectModel.js');
const Action = require('../data/helpers/actionModel.js');

const router = express.Router();

router.get('/', (req, res) => {
  // do your magic!
  console.log(req.params)

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
  console.log('project', req.body)
  
  Project.insert(req.body)
  .then(proj => {
  	res.status(200).json(proj);
  })
  .catch(err => {
  	res.status(500).json({ error: "The server doesn't like what your doing!" })
  })
});

router.post('/:id/action', (req, res) => {
	console.log('action insertion:', req.params);
	
	Action.insert( { project_id: req.params.id, description: req.body.description, notes: req.body.notes } )
	.then(action => {
		res.status(200).json(action);
	})
	.catch(err => {
		res.status(500).json({ error: "Your doing it wrong ya bozo!" })
	})
});

router.get('/:id/action', validateId, (req, res) => {
	// console.log(req.params)

	Project.getProjectActions(req.params.id)
	.then(action => {
		// console.log(action)
		res.status(200).json(action);
	})
	.catch(err => {
		res.status(500).json({ error: "The server doesn't like what your doing!" })
	})
})

router.post('/', (req, res) => {
	console.log()

	Project.insert({ project_id: id, description: req.body.description, notes: req.body.notes })
	.then(action => {
		res.status(200).json(action);
	})
	.catch(err => {
		res.status(501).json({ error: "Something isn't right here!" })
	})
})

router.delete('/:id/action', validateId, (req, res) => {
	console.log(req.params.id)

	Project.remove(req.params.id)
	.then(action => {
		res.status(200).json(action);
	})
	.catch(error => {
		res.status(500).json({ error: "The server is getting down!" })
	})
})

function validateId(req, res, next) {
	console.log(req.params.id);

	Project.getProjectActions(req.params.id)
		.then(proj => {
			console.log(proj)
		if(proj.length > 0) {
			console.log('shikes')
			next();
		} else {
			res.status(400).json({ error: 'Error, error, error Will Robinson!' })
		}
	})
	.catch(err => {
		next();
	})
	
}

module.exports = router;