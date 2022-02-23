// 'use strict'

function onInit() {
    initMap()
}

function renderPlace() {
    var places = getPlaces()
    var strHtml = places.map(place => {
        return `
        <tr>
        <td>${place.id}</td>
        <td>${place.title}</td>
        <td>${place.lat}</td>
        <td>${place.lng}</td>
        <td><button onclick="onRemovePlace(${place.id})">X</button></td>
        </tr>`

    })
    document.querySelector('.places-table').innerHTML = strHtml.join('')
}

function onMapClick(location, map) {
    const placeName = getplaceName()
    if (!placeName) return

    createPlace(location, map, placeName)
    renderPlace()
}

function getplaceName() {
    var placeName = prompt('Name the location')
    return placeName
}

function initMarkers(map) {
    var places = getPlaces()
    if (places) {
        places.map(place => {
            addMarker(place, map)
        })
    }
}

function onRemovePlace(placeId) {
    removePlace(placeId)
    const marker = getMarkerById(placeId)
    marker.setMap(null)
    renderPlace()
}