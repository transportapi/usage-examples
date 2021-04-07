/* global $ _ Prism Handlebars */

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
]

const urlParams = new URLSearchParams(window.location.search)
if (urlParams.has('example')) {
  const directory = urlParams.get('example')
  const properties = _.find(examples, { directory })
  showExample(properties)
} else {
  const properties = { examples: examples, showExample: showExample }
  loadTemplate('navigation.hbs', properties, () => null)
}

function loadTemplate (fileName, properties, onLoad) {
  $.get(fileName, templateSource => {
    const template = Handlebars.compile(templateSource)

    const html = template(properties)
    $('#app').html(html)
    onLoad()
  })
}

function showExample (exampleProperties) {
  loadTemplate('example.hbs', exampleProperties, () => {
    loadCode(exampleProperties.directory, 'main.js', 'javascript')
    loadCode(exampleProperties.directory, 'index.html', 'html')
    loadCode(exampleProperties.directory, 'index.css', 'css')
    loadCode(exampleProperties.directory, 'response.json', 'json')
  })
}

function loadCode (directory, fileName, language) {
  $.get(`https://raw.githubusercontent.com/transportapi/usage-examples/master/examples/${directory}/${fileName}`,
    contents => {
      const selector = '#' + fileName.replace('.', '\\.')
      $(selector).html(`
        <pre class="line-numbers"><code class="language-${language}">${_.escape(contents)}</code></pre>
      `)
      // Using Prism.highlight(contents) would be sufficient to get syntax highlighting but the line-numbers plugin
      // doesn't work without this approach
      setTimeout(() => Prism.highlightAll(), 0)
    })
}
