const express = require("express"); // Express app
const router = express.Router();   // Router logic

//This is where we import controllers we will route
const tripsController = require("../controllers/trips");

//define route for our trips endpoint
router
    .route("/trips")
    .get(tripsController.tripsList)    // get method routes triplist
    .post(tripsController.tripsAddTrip);   //post method adds a trip

//GET method routes tripsfindbycode - requires parameter
router
    .route('/trips/:tripCode')
    .get(tripsController.tripsFindByCode)
    .put(tripsController.tripsUpdateTrip);

module.exports = router;