import $ from 'jquery'

// To make live requests get your app_id and app_key by signing up at https://developer.transportapi.com/signup
// and filling them here
const appId = ''
const appKey = ''

const url = (appId === '' || appKey === '')
  ? 'response.json'
  : `https://transportapi.com/v3/uk/bus/services/FPOT:25.json?stop_geometry=true&journey_patterns=true&app_id=${appId}&app_key=${appKey}`

$.getJSON(url, service => {
  const directions = service.directions
  const atcocodeToStopName =
      Object.fromEntries(directions.flatMap(direction => direction.stops.member.map(stop => [stop.atcocode, stop.name])))

  const directionsHtml = directions.map(direction => {
    const journeyPatterns = direction.journey_patterns.member.sort((jp1, jp2) => jp2.stops.length - jp1.stops.length)
    const longestJourneyPattern = journeyPatterns[0].stops.length
    const tableContent =
        [...Array(longestJourneyPattern).keys()].map(index => tableRowHtml(atcocodeToStopName, journeyPatterns, index)).join('')
    const journeyPatternsHeadersHtml = journeyPatterns.map(jp => tableHeadersHtml(jp)).join('')
    const journeyPatternsTableHtml = `<table><tr>${journeyPatternsHeadersHtml}</tr>${tableContent}</table>`
    return `<h2>To ${direction.destination.description} (${direction.name})</h2>${journeyPatternsTableHtml}`
  }).join('<br>')

  const html = `<h1>${service.operator.name}: ${service.line_name}</h1>${directionsHtml}`

  $('#app').html(html)
})

function tableHeadersHtml (journeyPattern) {
  return `<th>${journeyPattern.count} Occurrences<br>${journeyPattern.stops.length} Stops</th>`
}
function tableRowHtml (atcocodeToStopName, journeyPatterns, rowIndex) {
  return `<tr>${journeyPatterns.map(journeyPattern => tableCellHtml(atcocodeToStopName, journeyPattern, rowIndex)).join('')}</tr>`
}

function tableCellHtml (atcocodeToStopName, journeyPattern, rowIndex) {
  const atcocode = journeyPattern.stops[rowIndex] && journeyPattern.stops[rowIndex].atcocode
  return `<td><b>${atcocodeToStopName[atcocode] || ''}</b> ${atcocode || ''}</td>`
}
