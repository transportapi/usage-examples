/* global $ _ Prism Handlebars */

const urlParams = new URLSearchParams(window.location.search)
const showExperimental =
  urlParams.has('showExperimental') ? JSON.parse(urlParams.get('showExperimentalExamples')) : false

const BRANCH = urlParams.has('branch') ? urlParams.get('branch') : 'master'
const GITHUB_PAGES_URL = 'https://transportapi.github.io/usage-examples/src/'
const RAW_GITHUB_CONTENT_ROOT = `https://raw.githubusercontent.com/transportapi/usage-examples/${BRANCH}/`

const examples = [
  {
    title: 'Stop timetable',
    description: 'Retrieves information about all buses departing from a stop with a given ATCOCode in the near ' +
      'future',
    directory: 'bus-stop-timetable',
    experimental: false
  },
  {
    title: 'Bus route geometry',
    description: 'Retrieves the geometry of a bus route specified by operator, line and direction and draws it on a ' +
      'map',
    directory: 'bus-route-geometry',
    experimental: false
  },
  {
    title: 'Bus service description',
    description: 'Show bus service metadata: the operator, linename, directions and destinations',
    directory: 'bus-service-description',
    experimental: false
  },
  {
    title: 'Bus service search',
    description: 'List bus services matching the search on operator code and line name',
    directory: 'bus-service-search',
    experimental: false
  },
  {
    title: 'Bus journey timetable',
    description: 'Show the scheduled timing point stops for a specific bus journey',
    directory: 'bus-journey-timetable',
    experimental: false
  },
  {
    title: 'Buses on a map',
    description: 'Show the buses for a specific service on a map',
    directory: 'buses-on-a-map',
    experimental: false
  },
  {
    title: 'Bus full timetable',
    description: 'Show the full timetable for a given service on a given date',
    directory: 'bus-full-timetable',
    experimental: false
  },
  {
    title: 'Journey planner',
    description: 'Shows a journey plan between two points',
    directory: 'journey-planner',
    experimental: false
  }
]

if (urlParams.has('example')) {
  const directory = urlParams.get('example')
  const properties = _.find(examples, { directory })
  showExample(properties)
} else {
  const examplesToList = showExperimental ? examples : examples.filter(example => !example.experimental)
  const properties = { examples: examplesToList, showExample: showExample }
  loadTemplate('navigation.hbs', properties, () => null)
}

function loadTemplate (fileName, properties, onLoad) {
  $.get(RAW_GITHUB_CONTENT_ROOT + 'src/' + fileName, templateSource => {
    const template = Handlebars.compile(templateSource)

    properties.root_url = GITHUB_PAGES_URL
    const html = template(properties)
    $('#app').html(html)
    onLoad()
  })
}

const exampleFile = RAW_GITHUB_CONTENT_ROOT + 'examples/{{directory}}/{{name}}'
const fileHtml = `
  <h2 class="source-title">{{name}}</h2>
  <pre class="line-numbers"
       data-download-link
       data-src="${exampleFile}"
  ><code id="{{name}}" {{#if language}}class="language-{{language}}{{/if}}"></code></pre>
`
Handlebars.registerPartial('file', fileHtml)

function showExample (exampleProperties) {
  exampleProperties.root_url = GITHUB_PAGES_URL
  exampleProperties.branch = BRANCH

  loadTemplate('example.hbs', exampleProperties, () => {
    // This can't simply be put in the CSS file because Prism.js seemingly redraws the element
    $('pre.line-numbers').css('max-height', '45em')
    // Using Prism.highlight(contents) would be sufficient to get syntax highlighting but the line-numbers plugin
    // doesn't work without this approach
    setTimeout(() => Prism.highlightAll(), 0)
  })
}
