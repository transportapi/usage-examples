import $ from 'jquery'
import L from 'leaflet'
import 'leaflet-rotatedmarker'

// To make live requests get your app_id and app_key by signing up at https://developer.transportapi.com/signup
// and filling them here
const appId = ''
const appKey = ''

const url = (appId === '' || appKey === '')
  ? 'response.json'
  : 'https://transportapi.com/v3/uk/bus/service_timetables.json?service=25&operator=FPOT&direction=outbound' +
    `&active=true&live=true&app_id=${appId}&app_key=${appKey}`

$.getJSON(url, data => {
  const map = drawMap()
  drawBuses(data.member, map)
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

function drawBuses (buses, map) {
  const busesLayerGroup = L.layerGroup()
  map.addLayer(busesLayerGroup)
  const busIcon = L.icon({
    iconUrl: 'bus.svg',
    iconSize: [30, 30],
  })
  const arrowIcon = L.icon({
    iconUrl: 'arrow.svg',
    iconSize: [60, 60],
  })
  buses.forEach(bus => {
    const coordinates = bus.status.location.coordinates
    // The coordinates are returned as [longitude, latitude] so they need to be swapped before they're passed to Leaflet
    const latlng = L.latLng(coordinates[1], coordinates[0])
    const busMarker = L.marker(latlng, { icon: busIcon })
    busesLayerGroup.addLayer(busMarker)
    busMarker.bindTooltip(tooltipHtml(bus))

    const bearing = bus.status.bearing
    if (bearing !== -1) {
      const bearingMarker = L.marker(latlng, {
        icon: arrowIcon,
        rotationAngle: bearing + 90,
        rotationOrigin: 'center',
        zIndexOffset: -1,
      })
      busesLayerGroup.addLayer(bearingMarker)
    }
  })
  fitMap(buses, map)
}

function tooltipHtml (bus) {
  return `
    <dl>
      <dt>Operator</dt><dd>${bus.operator_name}</dd>
      <dt>Line</dt><dd>${bus.line_name}</dd>
      <dt>Direction</dt><dd>${bus.dir}</dd>
      <dt>Departure time</dt><dd>${bus.stops[0].time}</dd>
    </dl>
  `
}

function fitMap (buses, map) {
  const coordinates = buses.map(bus => {
    const coordinates = bus.status.location.coordinates
    return L.latLng(coordinates[1], coordinates[0])
  })
  map.fitBounds(coordinates)
}
