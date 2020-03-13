// index.js
const {
  fetchMyIP,
  fetchCoordsByIP,
  fetchISSFlyOverTimes,
  nextISSTimesForMyLocation
} = require("./iss");
let ip = "";
let coords = "";

//Fetching the users IP along with a callback function
fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didn't work!", error);
    return;
  }

  console.log("It worked! Returned IP:", ip);
  //Using the IP from the prev function and fetching the users coordinates along with a callback
  fetchCoordsByIP(ip, (error, loc) => {
    if (error) {
      console.log("Location couldn't be found!", error);
      return;
    } else {
      console.log("It worked! Returned your location:", loc);
      fetchISSFlyOverTimes(loc, (error, passTimes) => {
        // console.log(coords);
        if (error) {
          console.log("Coordinates of ISS couldn't be found!", error);
          return;
        } else {
          console.log("It worked! Returned ISS location:", passTimes);
        }
      });
    }
  });
});

// nextISSTimesForMyLocation((error, passTimes) => {
//   if (error) {
//     return console.log("It didn't work!", error);
//   }
//   // success, print out the deets!
//   console.log(passTimes);
// });
