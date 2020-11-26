const request = require("request");

//Using Callback
/* From Map box - 2nd URL */
const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1Ijoid2lsc29mdDMwMDI1IiwiYSI6ImNrZThoN2cxMTFja3cycHJ6bDN6c20zajYifQ.8CVoe68F4YrVBMVVuw3c3w&limit=1`;

  // request({ url: url, json: true }, (error, response) => {
  request({ url, json: true }, (error, { body }) => {
    /* 
      const latitude = response.body.features[0].center[1];
      
      const latitude = body.features[0].center[1];
      const longitude = body.features[0].center[0];
      const location = body.features[0].place_name; 
    */

    //error handling
    if (error) {
      callback("Unable to connect to location service", undefined);
    } else if (body.features.length === 0) {
      callback("Unable to find location. Try another search");
    } else {
      callback(undefined, {
        /*
          latitude: latitude,
          
          latitude,
          longitude,
          location,
        */
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;
