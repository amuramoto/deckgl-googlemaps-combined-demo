new TripsLayer({
    id: 'trips',
    data: trips,
    getPath: d => d.segments,
    getColor: [253, 128, 93],
    opacity: 0.7,
    widthMinPixels: 2,
    rounded: true,
    trailLength: 100,
    currentTime: current_time
})

new ArcLayer({
  id: 'arcs',
  data: DATASOURCES.chicago_taxis,
  // dataTransform: d => d.features.filter(f => f.properties.scalerank < 4),
  getSourcePosition: f => [f.pickup_centroid_longitude, f.pickup_centroid_latitude],
  getTargetPosition: f => [f.dropoff_centroid_longitude, f.dropoff_centroid_latitude],
  getSourceColor: [0, 128, 200],
  getTargetColor: [255, 101, 101],
  getWidth: 0.5
})

new ScatterplotLayer({
  id: 'scatterplot-tree-layer',
  data: DATASOURCES.nyc_trees,
  opacity: 0.8,
  stroked: true,
  filled: true,
  radiusMinPixels: 1,
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
  radiusMinPixels: 1,
  radiusMaxPixels: 10,
  lineWidthMinPixels: 1,
  getPosition: d => d.the_geom.coordinates,
  getFillColor: d => [255, 0, 216],
  getLineColor: d => [0, 0, 0]      
})