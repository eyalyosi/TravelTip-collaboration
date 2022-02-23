import { storService } from './storageServics.js'

export const locService = {
    getLocs,
    createPlace
}

var gId = 1;
var STORAGE_KEY = 'places_db'
var gPlaces = storService.loadFromStorage(STORAGE_KEY);


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
    gPlaces.push(place)
    storService.saveToStorage(STORAGE_KEY, gPlaces)

    // return
}