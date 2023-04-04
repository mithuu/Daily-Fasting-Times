// Get user's location
function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }
  
  // Update sehri and iftar time based on user's location
  function showPosition(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    
    // You can use an API to get the prayer times based on the user's latitude and longitude.
    // For example, you can use the following API: https://aladhan.com/prayer-times-api
    // Here is an example of how to get prayer times using the API:
    
    let apiUrl = `https://api.aladhan.com/v1/timings?latitude=${latitude}&longitude=${longitude}&method=2`;
    
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        let sehriTime = data.data.timings.Fajr;
        let iftarTime = data.data.timings.Maghrib;
        
        // Update the sehri and iftar time in the HTML
        document.getElementById("sehri-time").innerHTML = convertTimeFormat(sehriTime);
        document.getElementById("iftar-time").innerHTML = convertTimeFormat(iftarTime);
      })
      .catch(error => console.log(error));
  }
  
  // Convert time to 12 hour format with am/pm text
  function convertTimeFormat(time) {
    let hours = parseInt(time.split(":")[0]);
    let minutes = time.split(":")[1];
    let amPm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12;
    return `${hours}:${minutes} ${amPm}`;
  }
  
  // Call getLocation function when the page is loaded
  window.onload = function() {
    getLocation();
  };
  