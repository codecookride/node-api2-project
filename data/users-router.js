const express = require('express');
const shortid = require('shortid')
const router = express.Router(); 

const db= require('./db');

router.get('/', (req, res) => {
    db.find(req.query)
    .then(d => {
      res.status(200).json(d);
    })
    .catch(error => {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: 'Error retrieving the db',
      });
    });
  });
  
  router.get('/:id', (req, res) => {
    db.findById(req.params.id)
    .then(post => {
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({ message: 'post not found' });
      }
    })
    .catch(error => {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: 'Error retrieving the post',
      });
    });
  });
  
  router.get('/:id/comments', (req, res) => {
    db.findCommentById(req.params.id)
    .then(comment => {
      if (comment) {
        res.status(200).json(comment);
      } else {
        res.status(404).json({ message: 'message not found' });
      }
    })
    .catch(error => {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: 'Error retrieving the message',
      });
    });
  });

  router.post('/', (req, res) => {
    db.insert(req.body)
    .then(post => {
      res.status(201).json(post);
    })
    .catch(error => {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: 'Error adding the post',
      });
    });
  });

  router.post('/:id/comments', (req, res) => {
    db.insertComment(req.body)
    .then(post => {
      res.status(201).json(post);
    })
    .catch(error => {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: 'Error adding the comment',
      });
    });
  });
  
  router.delete('/:id', (req, res) => {
    db.remove(req.params.id)
    .then(count => {
      if (count > 0) {
        res.status(200).json({ message: 'The post has been removed' });
      } else {
        res.status(404).json({ message: 'The post could not be found' });
      }
    })
    .catch(error => {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: 'Error removing the post',
      });
    });
  });
  
  router.put('/:id', (req, res) => {
    const changes = req.body;
    db.update(req.params.id, changes)
    .then(post => {
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({ message: 'The post could not be found' });
      }
    })
    .catch(error => {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: 'Error updating the post',
      });
    });
  });

module.exports = router;