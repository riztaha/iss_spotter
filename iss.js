/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */

const url = "https://api.ipify.org?format=json";
const request = require("request");

const fetchMyIP = function(callback) {
  // use request to fetch IP address from JSON API
  request(url, (error, response, body) => {
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

// const fetchCoordsByIP = function(_ip, _callback) {
//     request(url, (error, response, body) =>{
//         if (error) {
//             console.log(error//,null);
//             return
//         }
//         if (response.statusCode !== 200) {
//             const msg = `Status Code ${response.statusCode} when fetching GEOLOCATION. Response: ${body}`;
//         }
//         else {
//             const data = JSON.parse(body)
//             console.log(data.)
//         }
//     })

// }

// fetchMyIP();

module.exports = { fetchMyIP, fetchCoordsByIP };
