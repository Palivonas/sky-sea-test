# SEA pre-interview task

This is a simple web app for Sky Software Academy 2018 unattended programming task. Task description PDF is included in this repository for completeness and for when the code is made public.

To launch the app, run `npm install && npm start` in both `server` and `client` directories. Open [localhost:8080](http://localhost:8080) in browser. App only tested with latest Chrome Mac (v62 at the time of writing).

Example JSON and XML files containing movies data are provided in the root directory of the repository. Initially the database is empty.

Multiple mood sliders are taken into account. The algorithm that decides which movies suit provided moods best can be found in `server/src/getMoviesHandler.js` `getFitness` function. The summary of it is:

A movie can have one or more moods assigned, each being less "important" than the previous one. User sliders produce an index between one and zero for moods. A movie can have "excluded" moods assigned, e.g. a horror movie should never be shown if index for mood `'fearless'` is more than zero.

## Server

A simple Node.js Express server with two possible actions:
* `GET /movies?moods[]=...` - retrieve movies matching given moods
* `POST /movies` - upload a JSON or XML file containing movie data

To launch the server, run `npm install && npm start` in the `server` directory. It runs on port 3001, unless PORT environment variable is set to some other value.

Node 8 is required (as specified in `.nvmrc`) as the code makes use of `async / await`.

Code is linted using [Airbnb eslint preset](https://www.npmjs.com/package/eslint-config-airbnb). Not a single `let` or `var` statement was used. Not that `let` is strictly a no-no, but I believe sticking to constants leads to better readability and maintenance.

Movie retrieval and updating is handled in `fileStore.js`. It's a very simple JSON file storage, which should be replaced with a proper database, e.g. MongoDB, if the application grows. The store is instantiated in `index.js` and passed to the two handlers, therefore it can be to easily changed without touching code that uses the store. I did not implement unit tests, but since the handlers are not coupled with the store, it would be easy to do by injecting a mock store.

### What could be improved?
Given more time, I would implement a better data validation in upload using something like [jsonchema](https://www.npmjs.com/package/jsonschema).

Right now local image names are served from the pre-existing folder on the server. Absolute image URLs are used as-is. The app could be improved to fetch them and store on the server as well.

Tests (there are none). Handlers should be made more testable before that though - `handleRequest` methods are a bit too large and the class is not exported.

Setup transpilation to make use of ES6 modules. Could also use an experimental Node flag for that.

## Client

The client is a [Vue.js](https://vuejs.org/) application built on [vue-cli](https://github.com/vuejs/vue-cli) [webpack template](https://github.com/vuejs-templates/webpack). Run `npm install && npm start` in `client` directory to launch.

### Why Vue?
I have wanted to try Vue for a while and the SEA task seemed like a good opportunity to do it. I can definitely say I like it and will be using for my next front-end app. I have previous experience with Ember and a little bit of Angular and React.

### Structure
`App.vue` component holds navigation and the two page components - `IndexPage` and `UploadPage`. There is no proper routing - just one variable which is either `'index'` or `'upload'`. If the development continued, I would setup [vue-router](https://router.vuejs.org).

Components for each slider and movie are implemented. And for the little stars as well. Events are emitted from children to parent components instead of modifying any passed down data to not break the important data-down-actions-up rule, which helps keep the codebase maintainable and testable.

No state management library is used as the app is very simple. I would use [vuex](https://vuex.vuejs.org/) if the app complexity increased.

The client is Airbnb linted as well.

![App screenshot](/screenshot.png?raw=true)

The ugly line-wrapped title is included on purpose, because in real life you will get a too-long title sooner or later. I could probably deal with it better, but at least it doesn't wreak havoc on the layout.