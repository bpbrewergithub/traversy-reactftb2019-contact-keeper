// Import/require express
const express = require('express');
// Store the express.Router module as a variable
const router = express.Router();
// Import/require validator modules
const { check, validationResult } = require('express-validator');
// Import/require bcrypt
const bcrypt = require('bcryptjs');

const User = require('../models/User');

// @route            POST api/users
// @description      Register a user
// @access           Public

router.post('/',
  // Second parameter is an array of rules
  [
    check('name', 'Please include a name').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 })
  ],
  // Async req/res function including validationResult func
  async (req, res) => {
    // Check for errors and return an array of the errors if there are any
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Destructure the request body into the three required variables
    const { name, email, password } = req.body;

    try {
      // Validate whether the email exists and return a message if so
      let user = await User.findOne({ email });

      if(user) {
        return res.status(400).json({ msg: 'The user already exists' });
      }

      // Instantiate a new user using the User schema
      user = new User({
        name,
        email,
        password
      });

      // Generate a salt using bcrypt
      const salt = await bcrypt.genSalt(10);
      // Hash the password using bcrypt
      user.password = await bcrypt.hash(password, salt);
      // Save the user to the database
      await user.save();

      res.send('User saved');

    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error...');
    }
  }
);

module.exports = router;