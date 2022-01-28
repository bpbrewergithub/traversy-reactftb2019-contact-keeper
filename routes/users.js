// Require Express
const express = require('express');
// Store the express.Router module as a variable
const router = express.Router();

// @route            POST api/users
// @description      Register a user
// @access           Public

router.post('/', (req, res) => {
  res.send('Register a user');
})

module.exports = router;