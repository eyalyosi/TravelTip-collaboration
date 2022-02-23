import { storService } from './storageServics.js'

export const locService = {
    getLocs,
    createPlace,
    getPlaces,
    removePlace,
    addMarker,
    removeMarker,
    getPlaceById,
}


var STORAGE_KEY = 'places_db'
var gPlaces = storService.loadFromStorage(STORAGE_KEY) || []
var gId = gPlaces.length + 1;
var gMarkers = {} // = createGMarkers()


const locs = [
    { name: 'Greatplace', lat: 32.047104, lng: 34.832384 },
    { name: 'Neveragain', lat: 32.047201, lng: 34.832581 }
]

function getLocs() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(locs);
        }, 2000)
    });
}

function createPlace(location, map, placeName) {
    const place = {
        id: gId++,
        name: placeName,
        lat: location.lat(),
        lng: location.lng(),
        // weather,
        createdAt: new Date(),
        // updatedAt
    }

    addMarker(place, map)
    gPlaces.push(place)

    storService.saveToStorage(STORAGE_KEY, gPlaces)

    // return
}

function addMarker(place, map) {

    var marker = new google.maps.Marker({
        position: {
            lat: place.lat,
            lng: place.lng
        },
        map,
        title: place.name
    });

    gMarkers[place.id] = marker
        // gMarkers.push(marker)
        // console.log('gMarkers', gMarkers)
}

function removeMarker(placeId) {
    // const placeIdx = gPlaces.findIndex(place => placeId === place.id)
    // gPlaces.splice(placeIdx, 1)
    // storService.saveToStorage(STORAGE_KEY, gPlaces)

    // gMarkers.pop()
    var marker = gMarkers[placeId]
    console.log('gMarkers', marker)

    marker.setMap(null)
        // gMarkers = {}

}

function getPlaces() {
    return gPlaces
}

function removePlace(placeId) {

    const placeIdx = gPlaces.findIndex(place => placeId === place.id)
    gPlaces.splice(placeIdx, 1)
        // console.log('gPlaces', gPlaces)
    storService.saveToStorage(STORAGE_KEY, gPlaces)
}



function getMarkerById(placeId) { return gMarkers[placeId] }

function getPlaceById(placeId) {
    var place = null;
    for (let i = 0; i < gPlaces.length; i++) {
        if (gPlaces[i].id === placeId) {
            place = gPlaces[i]
            break;
        }
    }
    return place;
}