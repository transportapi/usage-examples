import $ from 'jquery'

// To make live requests get your app_id and app_key by signing up at https://developer.transportapi.com/signup
// and filling them here
const appId = ''
const appKey = ''

const url = (appId === '' || appKey === '')
  ? 'response.json'
  : `https://transportapi.com/v3/uk/bus/stop/450024834/timetable.json?app_id=${appId}&app_key=${appKey}`

$.getJSON(url, data => {
  const departures = data.departures
  const rows = Object.keys(departures)
    .filter(line => departures[line].length > 0)
    .map(line => {
      const service = departures[line][0]
      return `
        <tr>
          // <td>${service.aimed_departure_time}</td>
          <td>${service.line_name}</td>
          <td>${service.direction}</td>
        </tr>
      `
    })
    .join('\n')
  const html = `
    <table>
      <tr>
<!--        <th>Time</th>-->
        <th>Line</th>
        <th>Destination</th>
      </tr>
      ${rows}
    </table>
  `
  $('#app').html(html)
})
