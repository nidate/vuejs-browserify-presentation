var moment = require('moment-timezone');

document.addEventListener("DOMContentLoaded", function() {
  var Tokyo = document.getElementById('#tokyo');
  Tokyo.innerHTML = moment().tz('Asia/Tokyo').format()

  var LA = document.getElementById('#la');
  LA.innerHTML = moment().tz('America/Los_Angeles').format();
});