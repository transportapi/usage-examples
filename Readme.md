# Usage examples

TransportAPI usage examples show how our endpoints can be used.
They are intended for a technical audience, to provide inspiration for
what can be built, and tutorials to get started, with code that can be
reused in applications.
The examples are mini web applications, written in HTML and javascript.
They focus on processing data from the API, rather than style:
we don't want functional code getting lost in a sea of styling.

## Development

1. Install the required packages
```shell
npm ci
```
2. Build the project from the project root directory
```shell
npm run build
```
3. Serve (automatically refreshes on code changes)
```shell
npm run serve
```

3. Open
`http://localhost:1234/?localDevelopment=true&branch=<YOUR DEVELOPMENT BRANCH>`

## Reviewing examples
### By using the local setup

1. Run the usage examples locally (See [Development](#development))
2. Open `http://localhost:1234/?localDevelopment=true&branch=<REVIEWED BRANCH>`

### By using experimental examples in production

The usage examples navigation page supports experimental usage examples
to perform production quality inspection without affecting the user experience.
The examples that are marked as experimental won't be shown unless an
additional request parameter `showExperimental=true` is provided.

Example:
https://developer.transportapi.com/examples?showExperimental=true

To mark example as experimental add `experimental: true` to the listed
`examples` in `main.js`
