import $ from 'jquery'

// To make live requests get your app_id and app_key by signing up at https://developer.transportapi.com/signup
// and filling them here
const appId = ''
const appKey = ''

const url = (appId === '' || appKey === '')
  ? 'response.json'
  : `https://transportapi.com/v3/uk/bus/route/FPOT/25/outbound/timetable.json?app_id=${appId}&app_key=${appKey}`

$.getJSON(url, data => {
  const html = data.stops
    .filter(stop => stop.timing_point)
    .map(stop => `
      <div>
        ${stop.time} -<span class="stop-description">${stop.name}<br><i>${stop.locality}</i></span>
      </div>
    `)
    .join('\n<br>')
  $('#app').html(html)
})
