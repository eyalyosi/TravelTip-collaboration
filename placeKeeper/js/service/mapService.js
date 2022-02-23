'use strice'

const STORAGE_KEY = 'placesDB'
var gPlaces = loadFromStorage(STORAGE_KEY) || []
var gMarkers = {}

function initMap(lat, lng) {
    if (!lat) lat = 29.538974563652805;
    if (!lng) lng = 34.945081485669185;
    var elMap = document.querySelector('#map');
    var options = {
        center: { lat, lng },
        zoom: 16
    };
    var map = new google.maps.Map(
        elMap,
        options
    );
    // This event listener calls addMarker() when the map is clicked.
    google.maps.event.addListener(map, "click", (event) => {
        onMapClick(event.latLng, map);
    });
    // Add a marker at the center of the map.

    const locationButton = document.createElement("button");
    const locationImg = document.createElement('img')
    locationImg.src = "img/my-location.png"

    // locationButton.textContent = "My Location";
    locationButton.appendChild(locationImg)
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

                    // infoWindow.setPosition(pos);
                    // infoWindow.setContent("Location found.");
                    // infoWindow.open(map);
                    map.setCenter(pos);
                    new google.maps.Marker({
                        position: pos,
                        map,
                        title: 'My home!',
                    });
                },
                handleLocationError
            );
        } else {
            // Browser doesn't support Geolocation
            alert("HTML5 Geolocation is not supported in your browser.");
            return;
        }
    });

    renderPlace()
    initMarkers(map)
    //change colors
    setUserColors()
}

function createPlace(location, map, placeName) {

    const place = {
        lat: location.lat(),
        lng: location.lng(),
        id: getRandomIntInclusive(1, 999),
        title: placeName
    }
    addMarker(place, map)
    // if (!gPlaces) {
    //     gPlaces = []
    // }

    gPlaces.push(place)
    saveToStorage(STORAGE_KEY, gPlaces)
}

function addMarker(place, map) {
    const marker = new google.maps.Marker({
        position: {
            lat: place.lat,
            lng: place.lng
        },
        map,
        title: place.placeName,
    })
    gMarkers[place.id] = marker
}

function getPlaces() {
    return gPlaces
}

function handleLocationError(error) {
    var locationError = document.getElementById("locationError");

    switch (error.code) {
        case 0:
            locationError.innerHTML = "There was an error while retrieving your location: " + error.message;
            break;
        case 1:
            locationError.innerHTML = "The user didn't allow this page to retrieve a location.";
            break;
        case 2:
            locationError.innerHTML = "The browser was unable to determine your location: " + error.message;
            break;
        case 3:
            locationError.innerHTML = "The browser timed out before retrieving the location.";
            break;
    }
}

function removePlace(placeId) {

    // TODO filter

    const placeIdx = gPlaces.findIndex(place => placeId === place.id)
    gPlaces.splice(placeIdx, 1)
    saveToStorage(STORAGE_KEY, gPlaces)
}

function getMarkerById(placeId) {
    return gMarkers[placeId]
}