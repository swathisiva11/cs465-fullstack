const mongoose = require('mongoose');
const Trip = require('../models/travlr'); //register model
const Model = mongoose.model('trips');
const SearchLog = require('../models/searchLog'); // New: import search log model


// Get: /trips - list all the trips
const tripsList = async(req, res) => {
    const q = await Model.find({}).exec();
    if (!q) {
        return res.status(404).json({ message: "No trips found" });
    } else {
        return res.status(200).json(q);
    }
};

// Get: /trips/:tripCode - lists a single trip
const tripsFindByCode = async(req, res) => {
    const q = await Model.find({ 'code': req.params.tripCode }).exec();
    if (!q) {
        return res.status(404).json({ message: "Trip not found" });
    } else {
        return res.status(200).json(q);
    }
};

// POST: /trips - Adds a new trip
const tripsAddTrip = async(req, res) => {
    const newTrip = new Trip({
        code: req.body.code,
        name: req.body.name,
        length: req.body.length,
        start: req.body.start,
        resort: req.body.resort,
        perPerson: req.body.perPerson,
        image: req.body.image,
        description: req.body.description
    });

    const q = await newTrip.save();
    if (!q) {
        return res.status(400).json({ message: "Trip not saved" });
    } else {
        console.log(q);
        return res.status(201).json(q);
    }
};

// PUT: /trips/:tripCode - Updates a Trip
const tripsUpdateTrip = async(req, res) => {
    console.log(req.params);
    console.log(req.body);

    const q = await Model.findOneAndUpdate(
        { 'code': req.params.tripCode },
        {
            code: req.body.code,
            name: req.body.name,
            length: req.body.length,
            start: req.body.start,
            resort: req.body.resort,
            perPerson: req.body.perPerson,
            image: req.body.image,
            description: req.body.description
        }
    ).exec();

    if (!q) {
        return res.status(400).json({ message: "Trip update failed" });
    } else {
        return res.status(201).json(q);
    }
};

// DELETE: /trips/:tripCode - Deletes a Trip
const tripsDeleteOne = async (req, res) => {
    try {
        const tripCode = req.params.tripCode;
        const deletedTrip = await Trip.findOneAndDelete({ code: tripCode });

        if (!deletedTrip) {
            return res.status(404).json({ message: "Trip not found" });
        }

        res.status(204).json(null); // 204 = No Content
    } catch (err) {
        res.status(500).json({ message: "Error deleting trip", error: err });
    }
};

// GET: /trips/search?q=beach - Search and rank trips
const searchAndRankTrips = async (req, res) => {
  const query = req.query.q?.toLowerCase();

  if (!query) {
    return res.status(400).json({ message: "Missing search query" });
  }

  try {
     // Log the search query
    await SearchLog.create({ term: query });
    const trips = await Model.find({}).exec();

    const scoredTrips = trips.map(trip => {
      let score = 0;

      const name = trip.name ? trip.name.toLowerCase() : '';
      const resort = trip.resort ? trip.resort.toLowerCase() : '';
      const description = trip.description ? trip.description.toLowerCase() : '';

      if (name.includes(query)) score += 2;
      if (resort.includes(query)) score += 1;
      if (description.includes(query)) score += 1;

      console.log('Trip: ${trip.name}, Score: ${score}');

      return { trip, score };
    });

    const filtered = scoredTrips
      .filter(entry => entry.score > 0)
      .sort((a, b) => b.score - a.score)
      .map(entry => entry.trip);

    return res.status(200).json(filtered);
  } catch (err) {
    console.error("Search error:", err);
    return res.status(500).json({ message: "Search failed", error: err.message });
  }
};


// GET: /trips/topsearches - Get top 5 most searched terms
const topSearches = async (req, res) => {
  try {
    const results = await SearchLog.aggregate([
      { $group: { _id: "$term", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 }
    ]);
    res.status(200).json(results);
  } catch (err) {
    console.error("Top searches error:", err);
    res.status(500).json({ message: "Failed to fetch top searches", error: err.message });
  }
};

module.exports = {
    tripsList,
    tripsFindByCode,
    tripsAddTrip,
    tripsUpdateTrip,
    tripsDeleteOne,
    searchAndRankTrips,
    topSearches // Exporting new function
};
