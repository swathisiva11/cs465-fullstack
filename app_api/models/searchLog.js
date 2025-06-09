//Import mongoose library to define MongoDB schema and model
const mongoose = require('mongoose');

// Define schema for logging user search terms
// Fields:
// - term: The actual keyword searched by the user
// - searchedAt: Timestamp when the search occurred; defaults to current date/time
const searchLogSchema = new mongoose.Schema({
  term: { type: String, required: true },
  searchedAt: { type: Date, default: Date.now }
});

// Interact with the 'searchlogs' collection in MongoDB
const SearchLog = mongoose.model('SearchLog', searchLogSchema);

// Export the model 
module.exports = SearchLog;
