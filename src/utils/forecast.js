const request = require("request");

/* From weatherstack - 1st URL */
const forecast = (latitude, longitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=205eeeed39f15a16fa0c1846ab946a9e&query=" +
    latitude +
    "," +
    longitude +
    "&units=m";

  //automatically set to json as default
  // request({ url: url, json: true }, (error, response) => {
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather service", undefined);
    } else if (body.error) {
      callback("Unable to find location", undefined);
    } else {
      callback(
        undefined,
        `It is currently ${body.current.temperature} degrees out. It fees like ${body.current.feelslike} degrees out with weather description: ${body.current.weather_descriptions[0]}`
      );
    }
  });
};

module.exports = forecast;

// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)
