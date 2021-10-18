/* global $ _ Prism Handlebars */

const ROOT_URL = 'https://transportapi.github.io/usage-examples/src/'

const examples = [
  {
    title: 'Stop timetable',
    description: 'Retrieves information about all buses departing from a stop with a given ATCOCode in the near ' +
      'future',
    directory: 'bus-stop-timetable',
  },
  {
    title: 'Bus route geometry',
    description: 'Retrieves the geometry of a bus route specified by operator, line and direction and draws it on a ' +
      'map',
    directory: 'bus-route-geometry',
  },
  {
    title: 'Bus service description',
    description: 'Show bus service metadata: the operator, linename, directions and destinations',
    directory: 'bus-service-description',
  },
  {
    title: 'Bus service search',
    description: 'List bus services matching the search on operator code and line name',
    directory: 'bus-service-search',
  },
  {
    title: 'Bus journey timetable',
    description: 'Show the scheduled timing point stops for a specific bus journey',
    directory: 'bus-journey-timetable',
  },
  {
    title: 'Buses on a map',
    description: 'Show the buses for a specific service on a map',
    directory: 'buses-on-a-map',
  },
  {
    title: 'Bus full timetable',
    description: 'Show the full timetable for a given service on a given date',
    directory: 'bus-full-timetable',
  },
  {
    title: 'Journey planner',
    description: 'Shows a journey plan between two points',
    directory: 'journey-planner',
  },
  {
    title: 'Train station timetable',
    description: 'Create a departure board for a train station, based on scheduled departure times',
    directory: 'train-station-timetable',
  },
]

const urlParams = new URLSearchParams(window.location.search)

console.log(window.location)

if (urlParams.has('example')) {
  const directory = urlParams.get('example')
  const properties = _.find(examples, { directory })
  showExample(properties)
} else {
  const properties = { examples: examples, showExample: showExample }
  loadTemplate('navigation.hbs', properties, () => null)
}

function loadTemplate (fileName, properties, onLoad) {
  $.get(ROOT_URL + fileName, templateSource => {
    const template = Handlebars.compile(templateSource)

    properties.root_url = ROOT_URL
    const html = template(properties)
    $('#app').html(html)
    onLoad()
  })
}

const fileHtml = `
  <h2 class="source-title">{{name}}</h2>
  <pre class="line-numbers"
       data-download-link
       data-src="https://raw.githubusercontent.com/transportapi/usage-examples/master/examples/{{directory}}/{{name}}"
  ><code id="{{name}}" {{#if language}}class="language-{{language}}{{/if}}"></code></pre>
`
Handlebars.registerPartial('file', fileHtml)

function showExample (exampleProperties) {
  exampleProperties.root_url = ROOT_URL
  loadTemplate('example.hbs', exampleProperties, () => {
    // This can't simply be put in the CSS file because Prism.js seemingly redraws the element
    $('pre.line-numbers').css('max-height', '45em')
    // Using Prism.highlight(contents) would be sufficient to get syntax highlighting but the line-numbers plugin
    // doesn't work without this approach
    setTimeout(() => Prism.highlightAll(), 0)
  })
}
