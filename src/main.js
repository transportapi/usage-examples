/* global $ _ Prism Handlebars */

const GITHUB_PAGES_URL = 'https://transportapi.github.io/usage-examples/src/'
const RAW_GITHUB_CONTENT_URL = 'https://raw.githubusercontent.com/transportapi/usage-examples/master/'
const LOCAL_DEVELOPMENT_QUERY_PARAM = 'localDevelopment'
const BRANCH_QUERY_PARAM = 'branch'
const SHOW_EXPERIMENTAL_QUERY_PARAM = 'showExperimental'

const urlParams = new URLSearchParams(window.location.search)
const showExperimental =
  urlParams.has(SHOW_EXPERIMENTAL_QUERY_PARAM) ? JSON.parse(urlParams.get(SHOW_EXPERIMENTAL_QUERY_PARAM)) : false
const gitBranch = urlParams.has(BRANCH_QUERY_PARAM) ? urlParams.get(BRANCH_QUERY_PARAM) : 'master'

// For local development load the files from a relative path
const examplesRootUrl = urlParams.has(LOCAL_DEVELOPMENT_QUERY_PARAM) ? '../' : RAW_GITHUB_CONTENT_URL
const pageTemplatesRootUrl = urlParams.has(LOCAL_DEVELOPMENT_QUERY_PARAM) ? '' : GITHUB_PAGES_URL

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
  },
  {
    title: 'Train station timetable',
    description: 'Create a departure board for a train station, based on scheduled departure times',
    directory: 'train-station-timetable',
    experimental: false
  },
  {
    title: 'Places text search',
    description: 'Perform a text search on the Places endpoint, and show matching places as a list',
    directory: 'places-list',
    experimental: false
  }
]

if (urlParams.has('example')) {
  const directory = urlParams.get('example')
  const properties = _.find(examples, { directory })
  showExample(properties)
} else {
  const examplesToList = showExperimental ? examples : examples.filter(example => !example.experimental)
  const properties = {
    examples: examplesToList,
    additionalUrlQueryParams: exampleViewUrlQueryParameters(),
    showExample: showExample
  }
  loadTemplate('navigation.hbs', properties, () => null)
}

function loadTemplate (fileName, properties, onLoad) {
  $.get(pageTemplatesRootUrl + fileName, templateSource => {
    const template = Handlebars.compile(templateSource)

    properties.root_url = pageTemplatesRootUrl
    const html = template(properties)
    $('#app').html(html)
    onLoad()
  })
}

const exampleFile = examplesRootUrl + 'examples/{{directory}}/{{name}}'
const fileHtml = `
  <h2 class="source-title">{{name}}</h2>
  <pre class="line-numbers"
       data-download-link
       data-src="${exampleFile}"
  ><code id="{{name}}" {{#if language}}class="language-{{language}}{{/if}}"></code></pre>
`
Handlebars.registerPartial('file', fileHtml)

function showExample (exampleProperties) {
  exampleProperties.root_url = pageTemplatesRootUrl
  exampleProperties.branch = gitBranch

  loadTemplate('example.hbs', exampleProperties, () => {
    // This can't simply be put in the CSS file because Prism.js seemingly redraws the element
    $('pre.line-numbers').css('max-height', '45em')
    // Using Prism.highlight(contents) would be sufficient to get syntax highlighting but the line-numbers plugin
    // doesn't work without this approach
    setTimeout(() => Prism.highlightAll(), 0)
  })
}

function exampleViewUrlQueryParameters () {
  const parameters = {};
  // Parameter from the current view that if present should propagate to the example views
  [LOCAL_DEVELOPMENT_QUERY_PARAM, BRANCH_QUERY_PARAM]
    .filter(param => urlParams.has(param))
    .forEach(param => {
      parameters[param] = urlParams.get(param)
    })
  return toAdditionalQueryParametersString(parameters)
}

function toAdditionalQueryParametersString (parameters) {
  const params = `${Object.entries(parameters).map(entry => `${entry[0]}=${entry[1]}`).join('&')}`
  return params ? `&${params}` : ''
}
