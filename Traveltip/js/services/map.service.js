'use stri'
import { locService } from './loc.service.js'
export const mapService = {
    initMap,
    panTo,
    initMarkers,
    goToMyLocation
}

var gMap;

function initMap(lat = 32.0749831, lng = 34.9120554) {
    // console.log('InitMap');
    return _connectGoogleApi()
        .then(() => {
            // console.log('google available');
            gMap = new google.maps.Map(
                document.querySelector('#map'), {
                center: { lat, lng },
                zoom: 15
            })
            // console.log('Map!', gMap);
            google.maps.event.addListener(gMap, "click", (event) => {
                onMapClick(event.latLng, gMap);
                // console.log('event', event)
            });
        })
}

function goToMyLocation(pos) {
    gMap.setCenter({
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
      });
}

function initMarkers() {
    var places = locService.getPlaces()
    if (places) {
        places.map(place => {
            locService.addMarker(place, gMap)
        })
    }
}

function panTo(lat, lng) {
    var laLatLng = new google.maps.LatLng(lat, lng);
    gMap.panTo(laLatLng);
}

function _connectGoogleApi() {
    if (window.google) return Promise.resolve()
    const API_KEY = 'AIzaSyB_a5738jFkyev1QtQ6i7tRuQEn38OAEn8';
    var elGoogleApi = document.createElement('script');
    elGoogleApi.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}`;
    elGoogleApi.async = true;
    document.body.append(elGoogleApi);

    return new Promise((resolve, reject) => {
        elGoogleApi.onload = resolve;
        elGoogleApi.onerror = () => reject('Google script failed to load')
    })
}


