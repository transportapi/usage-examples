/* global $ _ Prism Handlebars */
import filePartial from './partials/file.hbs'
import ctaSectionPartial from './partials/cta_section.hbs'
import navigation from './layouts/navigation.hbs'
import example from './layouts/example.hbs'

const STATIC_CONTENT_URL = 'https://examples.staging.transportapi.com/examples/bus-stop-timetable/index.html'
const RAW_GITHUB_CONTENT_URL = 'https://raw.githubusercontent.com/transportapi/usage-examples/master/src/'
const LOCAL_DEVELOPMENT_QUERY_PARAM = 'localDevelopment'
const BRANCH_QUERY_PARAM = 'branch'
const SHOW_EXPERIMENTAL_QUERY_PARAM = 'showExperimental'

const urlParams = new URLSearchParams(window.location.search)
const showExperimental =
  urlParams.has(SHOW_EXPERIMENTAL_QUERY_PARAM) ? JSON.parse(urlParams.get(SHOW_EXPERIMENTAL_QUERY_PARAM)) : false
const gitBranch = urlParams.has(BRANCH_QUERY_PARAM) ? urlParams.get(BRANCH_QUERY_PARAM) : 'master'

// For local development load the files from a relative path
const examplesSourceFilesRootUrl = urlParams.has(LOCAL_DEVELOPMENT_QUERY_PARAM) ? './' : RAW_GITHUB_CONTENT_URL
const staticContentRootUrl = urlParams.has(LOCAL_DEVELOPMENT_QUERY_PARAM) ? '' : STATIC_CONTENT_URL

const products = [
  {
    id: 'tapi-journey-planner',
    label: 'TAPI Journey Planner',
    logo: 'media/logo-tapi-journey-planner.svg'
  },
  {
    id: 'tapi-bus-information',
    label: 'TAPI Bus Information',
    logo: 'media/logo-tapi-bus-information.svg'
  },
  {
    id: 'tapi-bus-performance',
    label: 'TAPI Bus Performance',
    logo: 'media/logo-tapi-bus-performance.svg'
  },
  {
    id: 'tapi-bus-fares',
    label: 'TAPI Bus Fares',
    logo: 'media/tapi-bus-fares.svg'
  },
  {
    id: 'tapi-rail-information',
    label: 'TAPI Rail Information',
    logo: 'media/logo-tapi-rail-information.svg'
  },
  {
    id: 'tapi-places',
    label: 'TAPI Places',
    logo: 'media/logo-tapi-places.svg'
  }
]

const examples = [
  {
    title: 'Stop timetable',
    description: 'Retrieves information about all buses departing from a stop with a given ATCOCode in the near ' +
      'future',
    directory: 'bus-stop-timetable',
    experimental: false,
    product_ids: ['tapi-bus-information']
  },
  {
    title: 'Bus route geometry',
    description: 'Retrieves the geometry of a bus route specified by operator, line and direction and draws it on a ' +
      'map',
    directory: 'bus-route-geometry',
    experimental: false,
    product_ids: ['tapi-bus-information']
  },
  {
    title: 'Bus service description',
    description: 'Show bus service metadata: the operator, linename, directions and destinations',
    directory: 'bus-service-description',
    experimental: false,
    product_ids: ['tapi-bus-information']
  },
  {
    title: 'Bus service search',
    description: 'List bus services matching the search on operator code and line name',
    directory: 'bus-service-search',
    experimental: false,
    product_ids: ['tapi-bus-information']
  },
  {
    title: 'Bus journey timetable',
    description: 'Show the scheduled timing point stops for a specific bus journey',
    directory: 'bus-journey-timetable',
    experimental: false,
    product_ids: ['tapi-bus-information']
  },
  {
    title: 'Buses on a map',
    description: 'Show the buses for a specific service on a map',
    directory: 'buses-on-a-map',
    experimental: false,
    product_ids: ['tapi-bus-information']
  },
  {
    title: 'Bus full timetable',
    description: 'Show the full timetable for a given service on a given date',
    directory: 'bus-full-timetable',
    experimental: false,
    product_ids: ['tapi-bus-information']
  },
  {
    title: 'Journey planner',
    description: 'Shows a journey plan between two points',
    directory: 'journey-planner',
    experimental: false,
    product_ids: ['tapi-journey-planner']
  },
  {
    title: 'Train station timetable',
    description: 'Create a departure board for a train station, based on scheduled departure times',
    directory: 'train-station-timetable',
    experimental: false,
    product_ids: ['tapi-rail-information']
  },
  {
    title: 'Places text search',
    description: 'Perform a text search on the Places endpoint, and show matching places as a list',
    directory: 'places-text-search',
    experimental: false,
    product_ids: ['tapi-places']
  }
]

if (urlParams.has('example')) {
  const directory = urlParams.get('example')
  const properties = _.find(examples, { directory })
  showExample(properties)
} else {
  const examplesToList = showExperimental ? examples : examples.filter(example => !example.experimental)
  const productExamples = organizeByProduct(examplesToList)
  const properties = {
    productExamples: productExamples,
    additionalUrlQueryParams: exampleViewUrlQueryParameters(),
    // eslint-disable-next-line no-undef
    userLoggedIn: userLoggedIn,
    showExample: showExample
  }
  loadTemplate(navigation, properties, () => null)
}

function loadTemplate (templateFunction, properties, onLoad) {
  properties.rootUrl = staticContentRootUrl
  properties.ctaSectionPartial = ctaSectionPartial
  properties.userLoggedIn = userLoggedIn

  const html = templateFunction(properties)
  $('#app').html(html)
  onLoad()
}

function showExample (exampleProperties) {
  exampleProperties.branch = gitBranch
  exampleProperties.sourceFilesRootUrl = examplesSourceFilesRootUrl
  exampleProperties.filePartial = filePartial

  loadTemplate(example, exampleProperties)
}

function organizeByProduct (examples) {
  return products.map(product => ({
    label: product.label,
    logo: product.logo,
    examples: examples.filter(example => example.product_ids.includes(product.id))
  }))
    .filter(product => product.examples.length !== 0)
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
