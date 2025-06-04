const mongoose = require('mongoose');

const searchLogSchema = new mongoose.Schema({
  term: { type: String, required: true },
  searchedAt: { type: Date, default: Date.now }
});

const SearchLog = mongoose.model('SearchLog', searchLogSchema);
module.exports = SearchLog;
