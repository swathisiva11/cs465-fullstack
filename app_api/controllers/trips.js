const mongoose = require('mongoose');
const Trip = require('../models/travlr'); //register model
const Model = mongoose.model('trips');

//Get: /trips - list all the trips
//Regardless of outcome, response must include HTML status code
//and JSON message to requesting client
const tripsList = async(req, res) => {
    const q = await Model
        .find({})   //No filter, return all records
        .exec();

        //console.log(q);

    if(!q)
    {   //Database returned no data
        return res 
                .status(404)
                .json(err)
    }else{ //return resulting trip list
        return res
                .status(200)
                .json(q);

    }

};


//Get: /trips/:tripCode - lists a single trip
//Regardless of outcome, response must include HTML status code
//and JSON message to requesting client
const tripsFindByCode = async(req, res) => {
    const q = await Model
        .find({'code' : req.params.tripCode})   //return single record
        .exec();

        //console.log(q);

    if(!q)
    {   //Database returned no data
        return res 
                .status(404)
                .json(err)
    }else{ //return resulting trip list
        return res
                .status(200)
                .json(q);

    }

};


//POST: /trips - Adds a new trip
//Regardless of outcome, response must include HTML status code
//and JSON message to the requesting client

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

        if(!q)
        {
            return res  
                .status(400)
                .json(err);
        } else {
            return res
                .status(201)
                .json(q);
        }

        //write to console

        console.log(q);

};

// PUT: /trips/:tripCode - Adds a new Trip 
// Regardless of outcome, response must include HTML status code
// and JSON message to the requesting client 
const tripsUpdateTrip = async(req, res) => { 
 
    // Uncomment for debugging 
    console.log(req.params); 
    console.log(req.body); 
 
    const q = await Model 
        .findOneAndUpdate( 
            { 'code' : req.params.tripCode }, 
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
        ) 
        .exec(); 
         
        if(!q) 
        { // Database returned no data 
            return res 
                .status(400) 
                .json(err); 
            } else { // Return resulting updated trip 
                return res 
                    .status(201) 
                    .json(q); 
            }     
                    
            // Uncomment the following line to show results of 
    operation 
            // on the console 
            // console.log(q); 
    };


    //4/19/2025 Add Delete
    const tripsDeleteOne = async (req, res) => {
        try {
          const tripCode = req.params.tripCode;
          const deletedTrip = await Trip.findOneAndDelete({ code: tripCode });
      
          if (!deletedTrip) {
            return res.status(404).json({ message: "Trip not found" });
          }
      
          res.status(204).json(null); // 204 means No Content
        } catch (err) {
          res.status(500).json({ message: "Error deleting trip", error: err });
        }
    };


module.exports = {
    tripsList,
    tripsFindByCode,
    tripsAddTrip,
    tripsUpdateTrip,
    tripsDeleteOne
};