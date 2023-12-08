import $ from 'jquery'

// To make live requests get your app_id and app_key by signing up at https://developer.transportapi.com/signup
// and filling them here
const appId = ''
const appKey = ''

const station = 'crs:MAN'
const dateTime = encodeURIComponent('2023-12-07T19:00:00+01:00')
// 15minute buffer either side
const fromOffset = '-PT00:15:00'
const toOffset = 'PT00:15:00'

const url = (appId === '' || appKey === '')
  ? 'response.json'
  : `https://transportapi.com/v3/uk/train/station_actual_journeys/${station}.json?` +
    `app_id=${appId}&app_key=${appKey}&expected=true&type=departure,arrival&datetime=${dateTime}&` +
    `from_offset=${fromOffset}&to_offset=${toOffset}&limit=50&page=1`

$.getJSON(url, data => {
  const rows = data.member.map(journey => {
    const service = journey.service
    return `
        <tr>
          <td class="table-row">${service.origin_name}</td>
          <td class="table-row">${service.destination_name}</td>
          <td class="table-row">${service.toc.name}</td>
          <td class="table-row">${(journey.aimed && journey.aimed.arrival && journey.aimed.arrival.time) || ''}</td>
          <td class="table-row">${(journey.actual && journey.actual.arrival && journey.actual.arrival.time) || ''}</td>
          <td class="table-row">${(journey.aimed && journey.aimed.departure && journey.aimed.departure.time) || ''}</td>
          <td class="table-row">${(journey.actual && journey.actual.departure && journey.actual.departure.time) || ''}</td>
          <td class="table-row">${journey.cancelled}</td>
          <td class="table-row">${(service.running_late && service.running_late.reason) || ''}</td>
        </tr>
      `
  }).join('\n')
  const html = `
    <table>
      <tr>
        <th rowspan="2" class="table-row">Origin</th>
        <th rowspan="2" class="table-row">Destination</th>
        <th rowspan="2" class="table-row">TOC</th>
        <th colspan="2" class="table-row">Arrival</th>
        <th colspan="2" class="table-row">Departure</th>
        <th rowspan="2" class="table-row">Cancelled</th>
        <th rowspan="2" class="table-row table-header">Running Late Reason</th>
      </tr>
      <tr>
        <th scope="col" class="table-row">Aimed</th>
        <th scope="col" class="table-row">Actual</th>
        <th scope="col" class="table-row">Aimed</th>
        <th scope="col" class="table-row">Actual</th>
      </tr>
      ${rows}
    </table>
  `
  $('#app').html(html)
})
