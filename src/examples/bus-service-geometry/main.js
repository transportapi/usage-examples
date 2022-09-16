import $ from 'jquery'
import L from 'leaflet'

// To make live requests get your app_id and app_key by signing up at https://developer.transportapi.com/signup
// and filling them here
const appId = ''
const appKey = ''

// Specify a bounding box
const minLon = -3.430
const minLat = 50.610
const maxLon = -3.370
const maxLat = 50.650

const url = (appId === '' || appKey === '')
  ? 'response.json'
  : 'https://transportapi.com/v3/uk/bus/services.json?edge_geometry=true' +
    `&app_id=${appId}&app_key=${appKey}` +
    `&min_lon=${minLon}&min_lat=${minLat}&max_lon=${maxLon}&max_lat=${maxLat}`

$.getJSON(url, data => {
  const map = drawMap()
  const services = data.member
  drawGeometry(services, map)
})

function drawMap () {
  const map = L.map('mapElement').setView([51.505, -0.09], 13)
  const urlTemplate = 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png'
  map.addLayer(L.tileLayer(urlTemplate, {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; ' +
        '<a href="https://carto.com/attributions">CARTO</a>',
    subdomains: ['a', 'b', 'c', 'd'],
    maxZoom: 19,
    id: 'map',
    tileSize: 512,
    zoomOffset: -1
  }))
  return map
}

function drawGeometry (services, map) {
  const edgesLayerGroup = L.layerGroup()
  map.addLayer(edgesLayerGroup)
  // The coordinates are returned as [longitude, latitude] so they need to be swapped before they're passed to Leaflet
  const polylines = services
    .flatMap(service => service.directions)
    .map(direction => direction.edges)
    .map(edge => edge.member.map(line => line.geometry.geometry.coordinates.map(a => [a[1], a[0]])))
  polylines.forEach(polyline => {
    edgesLayerGroup.addLayer(L.polyline(polyline))
  })

  map.fitBounds(polylines.flat(1))
}
