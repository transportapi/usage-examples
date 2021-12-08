import $ from 'jquery'

// To make live requests get your app_id and app_key by signing up at https://developer.transportapi.com/signup
// and filling them here
const appId = ''
const appKey = ''
const trainStation = 'HBD'

const url = (appId === '' || appKey === '')
  ? 'response.json'
  : `https://transportapi.com/v3/uk/train/station/${trainStation}/timetable.json?app_id=${appId}&app_key=${appKey}&train_status=passenger`

console.log(window.location)

$.getJSON(url, data => {
  const departures = data.all
  const rows =
    departures.map(departure => {
      return `
        <tr>
          <td>${departure.aimed_departure_time}</td>
          <td>${departure.origin_name}</td>
          <td>${departure.destination_name}</td>
          <td>${departure.platform}</td>
          <td>${departure.train_uid}</td>
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
