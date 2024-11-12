
function init() {

mapboxgl.accessToken = 'pk.eyJ1IjoiaXRzeWFib2llZGNob2kiLCJhIjoiY20zNHUxaGVvMDNpdjJrcHI5cnhkb2J4ZCJ9.wg2NQqf76EaCderql_0t2g';

//code from step 3 will go here

const geojson = {
  type: 'FeatureCollection',
  features: 
  [
  {
      type: 'Feature',
      geometry: {
          type: 'Point',
          coordinates: [-77.032, 38.913]
      },
      properties: {
          title: 'Mapbox',
          description: 'Washington, D.C.'
      }
  },
  {
      type: 'Feature',
      geometry: {
          type: 'Point',
          coordinates: [-122.414, 37.776]
      },
      properties: {
          title: 'Mapbox',
          description: 'San Francisco, California'
      }
  },
  {
      type: 'feature',
      geometry: {
          type: 'Point',
          coordinates: [-87.616, 41.776]
      },
      properties: {
          title: 'O\'Block',
          description: 'Chicago, Illinois'
      }
  }
  ]
};

const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/light-v11',
  center: [-96, 37.8],
  zoom: 3
});

//code from step 4 will go here

// add markers to map
for (const feature of geojson.features) {

  // code from step 5-1 will go here
  // create a HTML element for each feature
  const el = document.createElement('div');
  el.className = 'marker';
  // make a marker for each feature and add to the map
  new mapboxgl.Marker(el).setLngLat(feature.geometry.coordinates).addTo(map);

  //code from step 6 will go here
  new mapboxgl.Marker(el)
      .setLngLat(feature.geometry.coordinates)
      .setPopup(
          new mapboxgl.Popup({ offset: 25 }) // add popups
              .setHTML(
                  `<h3>${feature.properties.title}</h3><p>${feature.properties.description}</p>`
              )
      )
  .addTo(map);
}

}
export { init };