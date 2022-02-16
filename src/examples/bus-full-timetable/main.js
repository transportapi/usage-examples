import $ from 'jquery'

// To make live requests get your app_id and app_key by signing up at https://developer.transportapi.com/signup
// and filling them here
const appId = ''
const appKey = ''

const url = (appId === '' || appKey === '')
  ? 'response.json'
  : 'https://transportapi.com/v3/uk/bus/service_timetables.json?operator=FPOT&service=72&direction=outbound' +
    `&date=2021-06-01&app_id=${appId}&app_key=${appKey}`

$.getJSON(url, data => {
  const journeys = data.member.map(journey => {
    const stopEntries = journey.stops
      .filter(stop => stop.timing_point)
      .map(stop => [stop.atcocode, { label: `${stop.stop_name}, ${stop.locality}`, time: stop.time }])
    return new Map(stopEntries)
  })
  const stops = journeys.reduce(mergeStops, [])
  const tableHtml = stops
    .map(stop => {
      const journeysHtml = journeys.map(journey => `<td>${(journey.get(stop.atcocode) || {}).time || '-'}</td>`)
        .join('\n')
      return `
        <tr>
          <td class="stop-label">${stop.label}</td>
          ${journeysHtml}
        </tr>
      `
    })
    .join('\n')
  $('#app').html(`
    <h1>First Potteries 25 outbound (01 Jun 2021)</h1>
    <table>${tableHtml}</table>
  `)
})

function mergeStops (allStops, journey) {
  let result = []
  let journeyIndex = 0
  let allStopsIndex = 0
  const journeyStops = Array.from(journey.entries()).map(([atcocode, stopData]) => {
    return { atcocode, label: stopData.label }
  })

  while (journeyIndex < journeyStops.length) {
    const i = allStops.findIndex(stop => stop.atcocode === journeyStops[journeyIndex].atcocode)
    if (i === -1) {
      result.push(journeyStops[journeyIndex])
    } else {
      result = result.concat(allStops.slice(allStopsIndex, i + 1))
      allStopsIndex = i + 1
    }

    journeyIndex += 1
  }

  return result.concat(allStops.slice(allStopsIndex))
}
