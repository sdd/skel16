# Server


## Startup and Transpilation

As I write this, node 6 supports pretty much all ES2015 features, and the V8 team have recently announced that async functions
are now available in their latest build, and as such are likely to arrive in Node within the next few weeks. With this in
mind, Babel's transpilation is only needed in order to provide async/await, ES6 modules, and rest for destructuring assignment
and spread for object literals, which I like. These transforms will be removed as necessary, as their functionality gets
incorporated into Node. I may keep Babel in place anyway in order to 1) make use of further bleeding-edge JS proposals
as they arrive, and 2) enable ease of execution on older node versions if necessary.

The simplest way of using Babel is to use babel-register, but this entails having a 'wrapper' initialisation script that
acts as a non-transpiled entry point. I have chosen instead to use babel-watch, which provides the functionality of both
nodemon and babel-node, allowing transparent ES6 usage, but with faster restarts due to keeping Babel in memory. This 
is sufficient for development mode but is not recommended for production, for which I use separate build and run steps.


## Configuration

I follow the philosophy espoused by "The Twelve-factor App" (http://12factor.net/config), i.e. that an application's config
should be stored in the environment. I use envalid in order to provide this. This allows me to use a .env file for storing
local secrets in a way that avoids them being committed into source control, as .env is .gitignored. In addition to this,
envalid allows me to specify some default values, provide automatic isDev / isTest / isProduction, and makes the config
immutable. Also, when using docker-compose, the .env file can be imported using the ENVIRONMENT command.


## Koa 2

The server is based on Koa 2. For me, Koa's prime advantages over Express are twofold. 1) That most functionality is not
bundled in, allowing for more customisation, but more importantly 2) the signature of the middleware allows for a much better
structure. Koa 2 improves on Koa 1.x by replacing the slightly clunky (but still better than Express) generator middleware
with async functions, or functions that return Promises.


## Functionality

### /meta

The /meta endpoint exists to be queried by whatever DevOps monitoring or deployment services that will be used,
in order to check that the server is up, and determine version and uptime.

### /assets/*

Requests to /assets/* are handled in one of two ways, depending upon the configuration. When in development
(ie. NODE_ENV=development), and DEV_PROXY_ENABLED is true (default), then requests
to /assets are proxied through to http://localhost:8080 by default. This destination
can be overridden with setting DEV_PROXY_URL. If you run `npm run-script dev` from 
the client folder, the default proxy destination will be the webpack-dev-server
that will be running as a result.
 
### Default Route

Any requests to paths that do not begin with /assets, that are not handled
by any middleware that you might add, and that are for HTML, will result in the 
default template being rendered and served.


### Static Error Pages

Any requests that result in a 4xx or 5xx status code, where the request was for
HTML (ie 'Accepts: text/html' header), will be served one of the static error
pages in /server/static-error-pages. 404 pages have their own page, and all 
other errors get the 500 error page served (however their status code will not
be coerced to 500.)


## npm Scripts

* lint: runs ESLint on the server source
* unit: uses mocha to run the server unit tests (along side each file), and the
	server integration tests (in /server/test)
* test: runs lint and then unit scripts
* test:watch: runs unit script in watch mode
* dev: starts the server using babel-watch, so that any file changes in the source
    trigger a restart
* build: transpiles the source into a single file, saved as /server/dist/index.js
* start: starts the server from the built file in /server/dist
