# Usage examples

TransportAPI usage examples show how our endpoints can be used.
They are intended for a technical audience, to provide inspiration for what can be built, and tutorials to get started,
with code that can be reused in applications.
The examples are mini web applications, written in HTML and javascript. They focus on processing data from the API,
rather than style: we don't want functional code getting lost in a sea of styling.

## Experimental examples

The usage examples navigation page supports experimental usage examples to perform production quality inspection
without affecting the user experience. The examples that are marked as experimental won't be shown unless an additional
request parameter `showExperimental=true` is provided. 

Example:
https://developer.transportapi.com/examples?showExperimental=true

To mark example as experimental add `experimental: true` to the listed `examples` in `main.js`

## Development

To serve the page content on `localhost` execute:
```shell
ruby -run -e httpd . -p 8080
```
in the project root directory and open `http://localhost:8081/src`

The pages of each individual usage example use [CodeSandbox](https://codesandbox.io/) for the embedded example playground and
https://raw.githubusercontent.com/ for the listed source files.
They are both online and to load them properly you need to push your development branch and add its name
as request parameter `branch`, otherwise your new usage examples won't be found and the changes to the existing ones
won't be reflected.

Example:
`http://localhost:8080/?example=bus-stop-timetable&branch=add-new-example`

## Production setup

Currently `src/index.html` is manually copied to the `Usage examples` section in the 3scale CMS.
(If you need to introduce some changes to this file you have to also reflect them there)

It loads `main.js` from [the Github Pages of the repository](https://transportapi.github.io/usage-examples/src). It is
serving the content of the `master` branch.

1. Usage examples index page
`src/navigation.hbs` is loaded from https://raw.githubusercontent.com/transportapi/usage-examples/master/src/navigation.hbs
`src/navigation.css` is loaded from https://transportapi.github.io/usage-examples/src/navigation.css because it provides the proper MIME type. 

2. Usage example page
`src/example.hbs` is loaded from https://raw.githubusercontent.com/transportapi/usage-examples/master/src/example.hbs
`src/example.css` is loaded from https://transportapi.github.io/usage-examples/src/example.css because it provides the proper MIME type.

The CodeSandbox playground is loaded from
https://codesandbox.io/s/github/transportapi/usage-examples/tree/master/examples/<EXAMPLE_NAME>?from-embed

The usage example source files are loaded from
https://raw.githubusercontent.com/transportapi/usage-examples/master/src/<EXAMPLE_NAME>/<FILE_NAME>

## Deployment

The usage examples page is deployed to https://developer.transportapi.com/examples on every merge to `master` 

Please note that currently `src/index.html` is manually copied to the `Usage examples` section in the 3scale CMS.
If you introduce any changes to `index.html` you should also reflect them in 3scale.
