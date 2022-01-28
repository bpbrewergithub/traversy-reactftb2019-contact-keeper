// Import/require express module
const express = require('express');

// Import/require the database connection config file
const connectDB = require('./config/db');

// Instantiate an express app
const app = express();

// Connect the database
connectDB();

// Initialise middleware

app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.json({ msg: 'Welcome to the Contact Keeper API'}));

// Define Routes

app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/contacts', require('./routes/contacts'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));