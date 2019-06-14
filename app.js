/* global document, google */
import {GoogleMapsOverlay} from '@deck.gl/google-maps';
import {ScatterplotLayer, ArcLayer, TripsLayer} from '@deck.gl/layers';
import {map_styles} from './styles';

/* DATASOURCES */

// sources: 
// Chicago Data Portal https://data.cityofchicago.org/Transportation/Taxi-Trips/wrvz-psew
// source: NYC Open Data https://data.cityofnewyork.us/Environment/2015-Street-Tree-Census-Tree-Data/pi5s-9p35
const DATASOURCES = {
  chicago_taxis: 'https://data.cityofchicago.org/resource/wrvz-psew.json?$limit=25000',
  nyc_trees: 'https://data.cityofnewyork.us/resource/5rq2-4hqu.json?$limit=65000&&boroname=Manhattan',
  nyc_meters: 'https://data.cityofnewyork.us/resource/92q3-8jse.json?$limit=15000'
}

let map;
let overlay;
let data;

function loadMapsScript() {
  const GOOGLE_MAPS_API_KEY = process.env.GoogleMapsAPIKey; // eslint-disable-line
  const GOOGLE_MAPS_API_URL = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=visualization&v=3.34`;
  const script = document.createElement('script');
  const head = document.querySelector('head');
  script.type = 'text/javascript';
  script.src = GOOGLE_MAPS_API_URL;
  head.appendChild(script);
  return new Promise(resolve => {
    script.onload = resolve;
  });
}

async function initMap() {
  const MAP_CENTER = {
    nyc: {lat: 40.760306, lng: -73.982302},
    chicago: {lat: 41.975997, lng: -87.905111}    
  }; 
  const MAP_ZOOM = 15;
  await loadMapsScript();
  map = new google.maps.Map(document.getElementById('map'), {
    center: MAP_CENTER.nyc,
    zoom: MAP_ZOOM,
    styles: map_styles
  });
  return map;
}

function render() {
  let layers = [new ScatterplotLayer({
  id: 'scatterplot-tree-layer',
  data: DATASOURCES.nyc_trees,
  opacity: 0.8,
  stroked: true,
  filled: true,
  radiusScale: 6,
  radiusMinPixels: 2,
  radiusMaxPixels: 10,
  lineWidthMinPixels: 1,
  getPosition: d => d.the_geom.coordinates,
  getFillColor: d => [51, 255, 60],
  getLineColor: d => [0, 0, 0]      
}),
new ScatterplotLayer({
  id: 'scatterplot-meter-layer',
  data: DATASOURCES.nyc_meters,
  opacity: 0.8,
  stroked: true,
  filled: true,
  radiusScale: 6,
  radiusMinPixels: 2,
  radiusMaxPixels: 10,
  lineWidthMinPixels: 1,
  getPosition: d => d.the_geom.coordinates,
  getFillColor: d => [255, 0, 216],
  getLineColor: d => [0, 0, 0]      
})];
  overlay.setProps({layers: layers});
}

(async () => {
  map = await initMap();
  overlay = new GoogleMapsOverlay();
  overlay.setMap(map);
  render();
})();
