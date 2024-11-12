import * as map from './map.js';
import * as ajax from './ajax.js';

let poi;

function loadPOI() {
    const url = "https://people.rit.edu/~acjvks/shared/330/igm-points-of-interest.php";

    // callback function for when data shows up
    function poiLoaded(jsonString) {
        // if poi is already loaded, skip
        if (!poi) {
            poi = JSON.parse(jsonString);
            console.log(poi);
    
            // make markers and add them to map
            for (let p of poi) {
                map.addMarker(p.coordinates, p.title, "A POI!", 'poi');
            }
        }
        else {
            console.log("POI already loaded!");
        }
    }

    // start download
    ajax.downloadFile(url, poiLoaded);
}

function setupUI(){
    // it's easy to get [longitude,latitude] coordinates with this tool: http://geojson.io/
    const lnglatRIT = [-77.67454147338866, 43.08484339838443];
    const lnglatIGM = [-77.67990589141846, 43.08447511795301];

    // rit 15.5
    btn1.onclick = () => {
        map.setZoomLevel(15.5);
        map.setPitchAndBearing(0,0);
        map.flyTo(lnglatRIT);
    }

    // rit iso
    btn2.onclick = () => {
        map.setZoomLevel(15.5);
        map.setPitchAndBearing(45,0);
        map.flyTo(lnglatRIT);
    }

    // world 0
    btn3.onclick = () => {
        map.setZoomLevel();
        map.setPitchAndBearing(0,0);
        map.flyTo();
    }

    // igm 18
    btn4.onclick = () => {
        map.setZoomLevel(18);
        map.setPitchAndBearing(0,0);
        map.flyTo(lnglatIGM);
    }

    // load marker
    btn5.onclick = () => {
        if (!poi) {
            loadPOI();
        }
    }
};

function init() {
    //code from step 3 will go here
    //code from step 4 will go here
    map.initMap();
    map.loadMarkers();
    map.addMarkersToMap();
    setupUI();
}
export { init };