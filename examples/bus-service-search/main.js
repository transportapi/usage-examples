import $ from 'jquery'

// To make live requests get your app_id and app_key by signing up at https://developer.transportapi.com/signup
// and filling them here
const appId = ''
const appKey = ''

const url = (appId === '' || appKey === '')
  ? 'response.json'
  : `https://transportapi.com/v3/uk/bus/services.json?operator=FBRI&line_name=1&app_id=${appId}&app_key=${appKey}`

$.getJSON(url, data => {
  const html = data.member
    .map(service => {
      const directions = service.directions
        .map(direction =>
          `<li>${direction.name}: to ${direction.destination.description}</li>`)
        .join('\n')
      return `
        <h1>${service.operator.name}: ${service.line_name}</h1>
        <ul>
          ${directions}
        </ul>
      `
    })
    .join('\n<hr>\n')
  $('#app').html(html)
})
