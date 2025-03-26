const axios = require('axios');

const responseType = "json" // or xml
const BASE_URL = `https://maps.googleapis.com/maps/api/distancematrix/${responseType}`;
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

async function calDistance(req,res){
    // console.log(req.query);

    const {origin, destination, transit_mode} = req.query; //deconstruct req.query to obtain origin and destination coords given by user
    //todo get transit type from user, so that fucntion can be used for both bus and rail(metro)
    try{
        const response = await axios.get(BASE_URL,{
            params : {
                origins : origin,
                destinations : destination,
                mode : "transit",//we wont be using any other mode of transport 
                transit_mode : transit_mode,//rail for metro and ig bus for bus not sure
                key : GOOGLE_API_KEY
            }
        })
        const data = response.data;
        // console.log("data", data);
        if(data.status === "OK"){
            const distance = data.rows[0].elements[0].distance.value //in meters
            const duration = data.rows[0].elements[0].duration.value //in seconds
            console.log(distance, " ", duration);
            res.status(200).json({distance : distance, duration : duration, message : "yay"});
            //TODO-proper responses and better error handling
            //----------------------------------
            //   I AM HUNGRY BYE
            //----------------------------------
        }
    }
    catch(err){
        console.err("error while calculating distance\n", err);
        res.status(500).json({error : "Internal server error", details : err.message});
    }
}

module.exports = {calDistance};