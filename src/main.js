/* global $ _ Prism */
import filePartial from './partials/file.hbs'
import ctaSectionPartial from './partials/cta_section.hbs'
import navigationLayout from './layouts/navigation.hbs'
import exampleLayout from './layouts/example.hbs'

const STATIC_CONTENT_URL = 'https://examples.staging.transportapi.com/'
const RAW_GITHUB_CONTENT_URL = 'https://raw.githubusercontent.com/transportapi/usage-examples/master/src/'
const EXAMPLES_SOURCE_GITHUB_URL = 'https://github.com/transportapi/usage-examples/tree/master/src/examples/'
const PRODUCT_PAGES_ROOT = 'https://www.transportapi.com/managed-services/'
const LEGACY_DOCS_URL = 'https://developer.transportapi.com/docs?raml=https://docs.transportapi.com/raml/transportapi.raml'

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
    logo: 'static/logo-tapi-journey-planner.svg',
    page: `${PRODUCT_PAGES_ROOT}journey-planner`
  },
  {
    id: 'tapi-bus-information',
    label: 'TAPI Bus Information',
    logo: 'static/logo-tapi-bus-information.svg',
    page: `${PRODUCT_PAGES_ROOT}bus-information`
  },
  {
    id: 'tapi-bus-performance',
    label: 'TAPI Bus Performance',
    logo: 'static/logo-tapi-bus-performance.svg',
    page: `${PRODUCT_PAGES_ROOT}bus-performance`
  },
  {
    id: 'tapi-bus-fares',
    label: 'TAPI Bus Fares',
    logo: 'static/tapi-bus-fares.svg',
    page: `${PRODUCT_PAGES_ROOT}bus-fares`
  },
  {
    id: 'tapi-rail-information',
    label: 'TAPI Rail Information',
    logo: 'static/logo-tapi-rail-information.svg',
    page: `${PRODUCT_PAGES_ROOT}rail-information`
  },
  {
    id: 'tapi-places',
    label: 'TAPI Places',
    logo: 'static/logo-tapi-places.svg',
    page: `${PRODUCT_PAGES_ROOT}places`
  }
]

const examples = [
  {
    title: 'Stop timetable',
    description: 'Retrieves information about all buses departing from a stop with a given ATCOCode in the near ' +
      'future',
    directory: 'bus-stop-timetable',
    endpoint: {
      path: 'bus/stop/.../timetable',
      docsUrl: LEGACY_DOCS_URL
    },
    experimental: false,
    product_ids: ['tapi-bus-information'],
    render: {
      width: 248,
      height: 164
    }
  },
  {
    title: 'Bus route geometry',
    description: 'Retrieves the geometry of a bus route specified by operator, line and direction and draws it on a ' +
      'map',
    directory: 'bus-route-geometry',
    endpoint: {
      path: 'bus/route/.../timetable',
      docsUrl: LEGACY_DOCS_URL
    },
    experimental: false,
    product_ids: ['tapi-bus-information'],
    render: {
      width: 800,
      height: 491
    }
  },
  {
    title: 'Bus service description',
    description: 'Show bus service metadata: the operator, linename, directions and destinations',
    directory: 'bus-service-description',
    endpoint: {
      path: 'bus/services/{service}',
      docsUrl: LEGACY_DOCS_URL
    },
    experimental: false,
    product_ids: ['tapi-bus-information'],
    render: {
      width: 400,
      height: 132
    }
  },
  {
    title: 'Bus service search',
    description: 'List bus services matching the search on operator code and line name',
    directory: 'bus-service-search',
    endpoint: {
      path: 'bus/services',
      docsUrl: LEGACY_DOCS_URL
    },
    experimental: false,
    product_ids: ['tapi-bus-information'],
    render: {
      width: 400,
      height: 500
    }
  },
  {
    title: 'Bus journey timetable',
    description: 'Show the scheduled timing point stops for a specific bus journey',
    directory: 'bus-journey-timetable',
    endpoint: {
      path: 'bus/route/.../timetable',
      docsUrl: LEGACY_DOCS_URL
    },
    experimental: false,
    product_ids: ['tapi-bus-information'],
    render: {
      width: 400,
      height: 450
    }
  },
  {
    title: 'Buses on a map',
    description: 'Show the buses for a specific service on a map',
    directory: 'buses-on-a-map',
    endpoint: {
      path: 'bus/service_timetables',
      docsUrl: LEGACY_DOCS_URL
    },
    experimental: false,
    product_ids: ['tapi-bus-information'],
    render: {
      width: 800,
      height: 491
    }
  },
  {
    title: 'Bus full timetable',
    description: 'Show the full timetable for a given service on a given date',
    directory: 'bus-full-timetable',
    endpoint: {
      path: 'bus/service_timetables',
      docsUrl: LEGACY_DOCS_URL
    },
    experimental: false,
    product_ids: ['tapi-bus-information'],
    render: {
      width: 700,
      height: 400
    }
  },
  {
    title: 'Journey planner',
    description: 'Shows a journey plan between two points',
    directory: 'journey-planner',
    endpoint: {
      path: 'public/journey/from/{from}/to/{to}',
      docsUrl: LEGACY_DOCS_URL
    },
    experimental: false,
    product_ids: ['tapi-journey-planner'],
    render: {
      width: 840,
      height: 540
    }
  },
  {
    title: 'Train station timetable',
    description: 'Create a departure board for a train station, based on scheduled departure times',
    directory: 'train-station-timetable',
    endpoint: {
      path: 'train/station/{trainStation}/timetable',
      docsUrl: LEGACY_DOCS_URL
    },
    experimental: false,
    product_ids: ['tapi-rail-information'],
    render: {
      width: 520,
      height: 374
    }
  },
  {
    title: 'Places text search',
    description: 'Perform a text search on the Places endpoint, and show matching places as a list',
    directory: 'places-text-search',
    endpoint: {
      path: 'places.json',
      docsUrl: LEGACY_DOCS_URL
    },
    experimental: false,
    product_ids: ['tapi-places'],
    render: {
      width: 700,
      height: 400
    }
  }
]

if (urlParams.has('example')) {
  const exampleName = urlParams.get('example')
  showExample(exampleName)
} else {
  const examplesToList = showExperimental ? examples : examples.filter(example => !example.experimental)
  const productExamples = organizeByProduct(examplesToList)
  const properties = {
    productExamples: productExamples,
    additionalUrlQueryParams: exampleViewUrlQueryParameters(),
    showExample: showExample
  }
  loadTemplate(navigationLayout, properties, () => null)
}

function loadTemplate (templateFunction, properties, onLoad) {
  properties.rootUrl = staticContentRootUrl
  properties.ctaSectionPartial = ctaSectionPartial
  // userLoggedIn should be set in index.html
  // eslint-disable-next-line no-undef
  properties.userLoggedIn = userLoggedIn

  properties.filePartial = filePartial
  properties.ctaSectionPartial = ctaSectionPartial

  const html = templateFunction(properties)
  $('#app').html(html)
  onLoad()
}

function showExample (exampleName) {
  const exampleSpecificProperties = _.find(examples, { directory: exampleName })
  // Pick the first product as the current page design doesn't support listing more than one product
  // and we currently don't have this use case
  const exampleProductId = exampleSpecificProperties.product_ids[0]
  const commonProperties = {
    product: _.find(products, { id: exampleProductId }),
    sourceCodeUrl: `${EXAMPLES_SOURCE_GITHUB_URL}${exampleName}`,
    render: {
      indexPageUrl: `${staticContentRootUrl}examples/${exampleName}/index.html`
    },
    playgroundUrl: `https://codesandbox.io/s/github/transportapi/usage-examples/tree/${gitBranch}/src/examples/${exampleName}`,
    branch: gitBranch,
    sourceFilesRootUrl: examplesSourceFilesRootUrl
  }
  const properties = _.merge(exampleSpecificProperties, commonProperties)

  loadTemplate(exampleLayout, properties, () => {
    // This can't simply be put in the CSS file because Prism.js seemingly redraws the element
    $('pre.line-numbers').css('max-height', '45em')
    // Using Prism.highlight(contents) would be sufficient to get syntax highlighting but the line-numbers plugin
    // doesn't work without this approach
    setTimeout(() => Prism.highlightAll(), 0)
  })
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
