/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */

const urlIP = "https://api.ipify.org?format=json";
const request = require("request");
const urlLoc = `https://ipvigilante.com/`;

// Function to get users IP address.
const fetchMyIP = function(callback) {
  request(urlIP, (error, response, body) => {
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
  request(urlLoc + ip, (error, response, body) => {
    if (error) {
      callback(error);
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching GEOLOCATION. Response: ${body}`;
    } else {
      const data = JSON.parse(body);
      let lat = data.data.latitude;
      let long = data.data.longitude;
      let loc = { latitude: lat, longitude: long };
      callback(null, loc);
      // callback(data)
    }
  });
};

module.exports = { fetchMyIP, fetchCoordsByIP };
