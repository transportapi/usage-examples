import $ from 'jquery'

// To make live requests get your app_id and app_key by signing up at https://developer.transportapi.com/signup
// and filling them here
const appId = ''
const appKey = ''

const url = (appId === '' || appKey === '')
  ? 'response.json'
  : `https://transportapi.com/v3/uk/train/service/train_uid:C83947/2021-10-15/timetable.json?app_id=${appId}&app_key=${appKey}`

console.log(window.location)

$.getJSON(url, data => {
  const origin = data.origin_name
  const destination = data.destination_name
  const trainUid = data.train_uid
  const stops = data.stops
  const rows =
    stops.map(stop => {
      return `
        <tr>
          <td>${stop.aimed_departure_time}</td>
          <td>${origin}</td>
          <td>${destination}</td>
          <td>${stop.platform}</td>
          <td>${trainUid}</td>
        </tr>
      `
    }).join('\n')
  const html = `
    <table>
      <tr>
        <th>Departs</th>
        <th>Origin</th>
        <th>Destination</th>
        <th>Platform</th>
        <th>train_uid</th>
      </tr>
      ${rows}
    </table>
  `
  $('#app').html(html)
})
