import { storService } from './storageServics.js'

export const locService = {
    getLocs,
    createPlace,
    getPlaces,
    removePlace,
}


var STORAGE_KEY = 'places_db'
var gPlaces = storService.loadFromStorage(STORAGE_KEY) || []
var gId = gPlaces.length + 1

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
    console.log(place);

    gPlaces.push(place)
    storService.saveToStorage(STORAGE_KEY, gPlaces)

    // return
}

function addMarker(place,map) {
    
    var marker = new google.maps.Marker({
        position: {
            lat: place.lat,
            lng: place.lng
        },
        map,
        title: place.name
    });

    return marker;
}

function getPlaces() {
    return gPlaces
}

function removePlace(placeId) {

    const placeIdx = gPlaces.findIndex(place => placeId === place.id)
    gPlaces.splice(placeIdx, 1)
    storService.saveToStorage(STORAGE_KEY, gPlaces)
}
