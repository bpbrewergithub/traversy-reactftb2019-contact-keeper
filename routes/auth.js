// Import/require Express
const express = require('express');
// Import/require validator modules
const { check, validationResult } = require('express-validator');
// Import/require bcrypt
const bcrypt = require('bcryptjs');
// Import/require JWT
const jwt = require('jsonwebtoken');
// Import/require the config file
const config = require('config');
// Import/require the User model
const User = require('../models/User');

// Import/require created middleware
const auth = require('../middleware/auth');


// Store the express.Router module as a variable
const router = express.Router();

// @route            GET api/auth
// @description      Get logged in user
// @access           Private

router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// @route            POST api/auth
// @description      Auth user and get token
// @access           Public

router.post('/', 
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists()
  ],
  async (req, res) => {
    // Check for errors and return an array of the errors if there are any
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if(!user) {
        return res.status(400).json({ msg: 'Invalid credentials' });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if(!isMatch) {
        return res.status(400).json({ msg: 'Invalid credentials' });
      }

      // Create a JWT payload
      const payload = {
        user: {
          id: user.id
        }
      }
      // Sign and set an expiration for the jwt
      jwt.sign(payload, config.get('jwtSecret'), {
        expiresIn: 360000
      }, (err, token) => {
        if(err) throw err;
        res.json({ token });
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server error');
    }
});



module.exports = router;