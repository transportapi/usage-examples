import $ from 'jquery'

// To make live requests get your app_id and app_key by signing up at https://developer.transportapi.com/signup
// and filling them here
const appId = ''
const appKey = ''

const url = (appId === '' || appKey === '')
  ? 'response.json'
  : `https://transportapi.com/v3/uk/bus/services/FPOT:25.json?app_id=${appId}&app_key=${appKey}`

$.getJSON(url, data => {
  const directions = data.directions
    .map(direction =>
      `<li><b class="direction">${direction.name}:</b> towards ${direction.destination.description}</li>`)
    .join('\n')
  const html = `
    <h1>${data.operator.name}: ${data.line_name}</h1>
    <ul>
      ${directions}
    </ul>
  `
  $('#app').html(html)
})
