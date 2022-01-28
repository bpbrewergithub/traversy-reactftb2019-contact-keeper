// Require Express
const express = require('express');
// Store the express.Router module as a variable
const router = express.Router();

// @route            GET api/auth
// @description      Get logged in user
// @access           Private

router.get('/', (req, res) => {
  res.send('Get logged in user');
});

// @route            POST api/auth
// @description      Auth user and get token
// @access           Public

router.post('/', (req, res) => {
  res.send('Auth user and get token');
});



module.exports = router;