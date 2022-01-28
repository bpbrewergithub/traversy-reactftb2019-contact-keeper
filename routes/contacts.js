// Require Express
const express = require('express');
// Store the express.Router module as a variable
const router = express.Router();

// Import require the 'auth' middleware
const auth = require('../middleware/auth');

// Import/require validator modules
const { check, validationResult } = require('express-validator');

// Import/require the User model
const User = require('../models/User');
// Import/require the Contact model
const Contact = require('../models/Contact');

// @route            GET api/contacts
// @description      Get all user contacts
// @access           Private

router.get('/', auth, async (req, res) => {
  try {
    const contacts = await Contact.find({ user: req.user.id }).sort({ date: -1 });
    res.json(contacts);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// @route            POST api/contacts
// @description      Add new user contact
// @access           Private

router.post('/',
  [ auth,
    [
      check('name', 'Name is required').not().isEmpty()
    ] 
  ],
  async (req, res) => {
    // Check for errors and return an array of the errors if there are any
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Destructure from the request object
    const { name, email, phone, type } = req.body;

    try {
      const newContact = new Contact({ name, email, phone, type, user: req.user.id });

      const contact = await newContact.save();

      res.json(contact);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server error');
    }
  }
);

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