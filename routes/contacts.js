// Require Express
const express = require('express');
// Store the express.Router module as a variable
const router = express.Router();

// @route            GET api/contacts
// @description      Get all user contacts
// @access           Private

router.get('/', (req, res) => {
  res.send('Get all user contacts');
});

// @route            POST api/contacts
// @description      Add new user contact
// @access           Private

router.post('/', (req, res) => {
  res.send('Add new user contact');
});

// @route            PUT api/contacts/:id
// @description      Update user contact
// @access           Private

router.put('/:id', (req, res) => {
  res.send('Update user contact');
});

// @route            DELETE api/contacts/:id
// @description      Update user contact
// @access           Private

router.delete('/:id', (req, res) => {
  res.send('Delete user contact');
});

module.exports = router;