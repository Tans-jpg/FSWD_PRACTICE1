const mongoose = require('mongoose');

// Define the schema for a shop
const shopSchema = new mongoose.Schema({
  name: {
    type: String, // Correct type
    required: true
  },
  city: {
    type: String, // Correct type
    required: true
  }
});

// Create a model from the schema
const shopModel = mongoose.model('Shop', shopSchema);

module.exports = shopModel;
