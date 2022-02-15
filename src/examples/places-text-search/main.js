import $ from 'jquery'

// To make live requests get your app_id and app_key by signing up at https://developer.transportapi.com/signup
// and filling them here
const appId = ''
const appKey = ''

const placesQuery = 'Waterloo'
const url = (appId === '' || appKey === '')
  ? 'response.json'
  : `https://transportapi.com/v3/uk/places.json?query=${placesQuery}&app_id=${appId}&app_key=${appKey}`

$.getJSON(url, data => {
  const places = data.member
    .map(place => {
      const description = place.description ? `, ${place.description}` : ''
      return `<li>${place.name}${description} (${place.type})</li>`
    })
    .join('\n')
  const html = `
    <h1>Results for "${placesQuery}"</h1>
    <ol>
      ${places}
    </ol>
  `
  $('#app').html(html)
})
