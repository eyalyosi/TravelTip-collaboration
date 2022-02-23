import { locService } from './services/loc.service.js'
import { mapService } from './services/map.service.js'

window.onload = onInit;
window.onMapClick = onMapClick;
// window.onAddMarker = onAddMarker;
window.onPanTo = onPanTo;
window.onGetLocs = onGetLocs;
window.onGetUserPos = onGetUserPos;
window.onRemovePlace = onRemovePlace;
window.onGoToPlace = onGoToPlace
    // window.initMarkers = mapService.initMarkers
    // var gMap;

function onInit() {
    mapService.initMap()
        .then(() => {
            console.log('Map is ready');
        })
        .catch(() => console.log('Error: cannot init map'));

    mapService.initMarkers()

}

// This function provides a Promise API to the callback-based-api of getCurrentPosition
function getPosition() {
    console.log('Getting Pos');
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
    })
}

function onMapClick(location, map) {
    const placeName = getplaceName()
    if (!placeName) return

    locService.createPlace(location, map, placeName)

    // mapService.addMarker(location, placeName)
    renderPlaces()
}

function renderPlaces() {
    var places = locService.getPlaces()
    var strHtml = places.map(place => {
        return `
        <tr>
        <td>${place.id}</td>
        <td>${place.name}</td>
        <td>${place.lat}</td>
        <td>${place.lng}</td>
        <td>${place.createdAt}</td>
        <td>place.updatedAt</td>
        <td><button onclick="onGoToPlace(${place.id})">Go</button></td>
        <td><button onclick="onRemovePlace(${place.id})">X</button></td>
        </tr>`
    })
    document.querySelector('.places-table').innerHTML = strHtml.join('')
        // mapService.initMarkers()
}

function onGoToPlace(placeId) {
    console.log('csacas', place)
    var place = locService.getPlaceById(placeId)
    onPanTo(place.lat, place.lng)
}

function getplaceName() {
    var placeName = prompt('Name the location')
    return placeName
}

function onGetLocs() {
    locService.getLocs()
        .then(locs => {
            console.log('Locations:', locs)
            document.querySelector('.locs').innerText = JSON.stringify(locs)
        })
}

function onGetUserPos() {
    getPosition()
        .then(pos => {
            console.log('User position is:', pos.coords);
            document.querySelector('.user-pos').innerText =
                `Latitude: ${pos.coords.latitude} - Longitude: ${pos.coords.longitude}`
        })
        .catch(err => {
            console.log('err!!!', err);
        })
}

function onPanTo(lat, lng) {
    console.log('Panning the Map');
    mapService.panTo(lat, lng);
}

function onRemovePlace(placeId) {
    locService.removePlace(placeId)
    locService.removeMarker(placeId)

    // const place = getPlaceById(placeId)
    // marker = place.marker
    // marker.setMap(null)
    renderPlaces()
        // initMarkers() this call in the render func!
}