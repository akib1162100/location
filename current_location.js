// Note: This example requires that you consent to location sharing when
// prompted by your browser. If you see the error "The Geolocation service
// failed.", it means you probably did not give permission for the browser to
// locate you.
let map, infoWindow;

function initMap() {
    
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 23.8103, lng: 90.4125 },
    zoom: 16,
  });
  infoWindow = new google.maps.InfoWindow();

  var marker = new google.maps.Marker({
    position: {
      lat: 12.971599,
      lng: 77.594563
    }, 
    map: map,
    draggable: true,

  });
  const locationButton = document.createElement("button");

  locationButton.textContent = "Pan to Current Location";
  locationButton.classList.add("custom-map-control-button");
  map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);
  locationButton.addEventListener("click", () => {
    // Try HTML5 geolocation.
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };

          marker=new google.maps.Marker({
            icon: "http://maps.google.com/mapfiles/ms/icons/green-dot.png",
            position: pos,
            map,
            title: "Hello World!",
          });
        //   infoWindow.setPosition(pos);
        //   infoWindow.setContent("Location found.");
          infoWindow.open(map);
          map.setCenter(pos);
          circle(map, pos, 1000,"#4D23B9");
        },
        () => {
          handleLocationError(true, infoWindow, map.getCenter());
        }
      );
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, infoWindow, map.getCenter());
    }
  });
  
}

function circle(map, pos, radius, color="#FF0000") {
  var cityCircle = new google.maps.Circle({
    strokeColor: color,
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: color,
    fillOpacity: 0.35,
    map:map,
    center: pos,
    radius: radius,
  });
}





function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(
    browserHasGeolocation
      ? "Error: The Geolocation service failed."
      : "Error: Your browser doesn't support geolocation."
  );
  infoWindow.open(map);
}