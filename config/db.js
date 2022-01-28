// Import/require mongoose module
const mongoose = require('mongoose');
// Import/require the config module
const config = require('config');

// Instantiate the database
const db = config.get('mongoURI');

// Connect to the database
const connectDB = async () => {
  try {
    await mongoose.connect(db);
    console.log('MongoDB Connected...')
  } catch(err) {
    console.error(err.message);
    process.exit(1);
  };
};

module.exports = connectDB;