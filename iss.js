/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */

// const urlIP = "https://api.ipify.org?format=json";
const request = require("request");
// const urlLoc = `https://ipvigilante.com/`;
// let urlIss = "http://api.open-notify.org/iss-pass.json?";
// let lat = "";
// let long = "";

// Function to get users IP address.
const fetchMyIP = function(callback) {
  request(`https://api.ipify.org?format=json`, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    } else {
      const data = JSON.parse(body);
      callback(null, data.ip);
    }
  });
};

//Function to get users coordinates.
const fetchCoordsByIP = function(ip, callback) {
  request(`https://ipvigilante.com/${ip}`, (error, response, body) => {
    if (error) {
      callback(error, null);
      // console.log(error);
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching GEOLOCATION. Response: ${body}`;
      return;
    } else {
      const data = JSON.parse(body);
      // console.log(data.data);
      let lat = data.data.latitude;
      let long = data.data.longitude;
      let loc = { latitude: lat, longitude: long };
      callback(null, loc);
    }
  });
};
// fetchCoordsByIP(`66.207.199.230`, null);
/**
 * Makes a single API request to retrieve upcoming ISS fly over times the for the given lat/lng coordinates.
 * Input:
 *   - An object with keys `latitude` and `longitude`
 *   - A callback (to pass back an error or the array of resulting data)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly over times as an array of objects (null if error). Example:
 *     [ { risetime: 134564234, duration: 600 }, ... ]
 */

const fetchISSFlyOverTimes = function(coords, callback) {
  const url = `http://api.open-notify.org/iss-pass.json?lat=${coords.latitude}&lon=${coords.longitude}`;
  request(url, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching ISS Fly Over Times. Response: ${body}`;
      return;
    } else {
      const passes = JSON.parse(body);
      callback(null, passes.response);
    }
  });
};

/**
 * Orchestrates multiple API requests in order to determine the next 5 upcoming ISS fly overs for the user's current location.
 * Input:
 *   - A callback with an error or results.
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly-over times as an array (null if error):
 *     [ { risetime: <number>, duration: <number> }, ... ]
 */

const nextISSTimesForMyLocation = function(callback) {
  // empty for now
};

module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes };
