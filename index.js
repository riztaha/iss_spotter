// index.js
const { fetchMyIP, fetchCoordsByIP } = require("./iss");
let ip = "";

//Fetching the users IP along with a callback function
fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didn't work!", error);
    return;
  }

  console.log("It worked! Returned IP:", ip);
  ip += ip;
});

//Using the IP from the prev function and fetching the users coordinates along with a callback
fetchCoordsByIP(ip, (error, loc) => {
  if (error) {
    console.log("Location couldn't be found!", error);
    return;
  }
  console.log("It worked! Returned location:", loc);
});
