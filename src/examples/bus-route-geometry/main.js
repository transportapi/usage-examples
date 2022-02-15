import $ from 'jquery'
import L from 'leaflet'

// To make live requests get your app_id and app_key by signing up at https://developer.transportapi.com/signup
// and filling them here
const appId = ''
const appKey = ''

const url = (appId === '' || appKey === '')
  ? 'response.json'
  : 'https://transportapi.com/v3/uk/bus/route/FLDS/40/outbound/timetable.json?edge_geometry=true' +
    `&app_id=${appId}&app_key=${appKey}`

$.getJSON(url, data => {
  const map = drawMap()
  const stops = data.stops
  drawGeometry(stops, map)
  drawStops(stops, map)
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

function drawGeometry (stops, map) {
  const edgesLayerGroup = L.layerGroup()
  map.addLayer(edgesLayerGroup)
  // The coordinates are returned as [longitude, latitude] so they need to be swapped before they're passed to Leaflet
  const polyLines = stops
    .slice(0, -1)
    .map(stop => stop.next.coordinates.map(a => [a[1], a[0]]))
  polyLines.forEach(polyLine => {
    edgesLayerGroup.addLayer(L.polyline(polyLine))
  })

  map.fitBounds(polyLines.flat(1))
}

function drawStops (stops, map) {
  const stopsLayerGroup = L.layerGroup()
  map.addLayer(stopsLayerGroup)
  stops.forEach(stop => {
    const markerOptions = {
      radius: 5,
      color: '#612d08',
    }
    const marker = L.circleMarker(L.latLng(stop.latitude, stop.longitude), markerOptions)
    stopsLayerGroup.addLayer(marker)
    marker.bindTooltip(`${stop.name} - ${stop.locality}`)
  })
}
