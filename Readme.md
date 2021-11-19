# Usage examples

TransportAPI usage examples show how our endpoints can be used.
They are intended for a technical audience, to provide inspiration for
what can be built, and tutorials to get started, with code that can be
reused in applications.
The examples are mini web applications, written in HTML and javascript.
They focus on processing data from the API, rather than style:
we don't want functional code getting lost in a sea of styling.

## Development

To serve the page content on `localhost` execute:
```shell
ruby -run -e httpd . -p 8080
```
in the project root directory and open
`http://localhost:8080/src?localDevelopment=true`

Please note that to see your local files you have to add query parameter
`localDevelopment=true`, otherwise the template `.hbs` files will be loaded
from GitHub pages and examples sources from raw.githubusercontent.com

The pages of each individual usage example use
[CodeSandbox](https://codesandbox.io/) for the embedded example playground.
It is online and to load it with your local changes reflected you need to
push your development branch and add its name as request parameter `branch`.

Example:

`http://localhost:8080/?example=bus-stop-timetable&localDevelopment=true&branch=<YOUR DEVELOPMENT BRANCH>`

## Reviewing examples
### By using the local setup

1. Run the usage examples locally (See [Development](#development))
2. Open `http://localhost:8080/src?localDevelopment=true&branch=<REVIEWED BRANCH>`
Please note that you have to manually add the
`localDevelopment=true&branch=<REVIEWED BRANCH>`query parameters to the url of
each page.

### By using experimental examples in production

The usage examples navigation page supports experimental usage examples
to perform production quality inspection without affecting the user experience.
The examples that are marked as experimental won't be shown unless an
additional request parameter `showExperimental=true` is provided.

Example:
https://developer.transportapi.com/examples?showExperimental=true

To mark example as experimental add `experimental: true` to the listed
`examples` in `main.js`
