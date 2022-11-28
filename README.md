# Couch Gag Server

---

This is a node/express http server built with typescript and compiled with the native tsc compiler. The main focus of this service is to serve markdown content to `couch-gag-website` which is a react/typescript/hellerui package.

## Couch Gag Abstract

Couch Gag is a collective of several microservices that compose a modern markup site. We, Couch Gag, believe in a domain driven architectural design. A service should be small. It should do one thing exceedingly well. If it begins to dilute its responsibilities, the complexity of maintenance of the service rises geometrically along with it. It becomes arduous to onboard onto for new developers. It becomes bad code.

Bad code is so difficult to maintain. Its not even funny. I am not laughing, do you see my face. Its the reason why entire teams of developers rewrite services after 2 years, while only marginally adding onto overall functionality. As a developer, I want the code I write to run a thousand years. It won't. But with that mentality it might run 5, well.

**Couch Gag is a collection of microservices** and the list of associated services can be found below.

- couch-gag-common-library
  - A Typescript package, isomorphic, that supplied common utils to `couch-gag-server` and `couch-gag-website`. 
  - These utils include loggers, theme primitives, and shared types.
  - It is a compile time dependency for `couch-gag-website` and `couch-gag-server`.
- couch-gag-metrics-hub
  - A Rust implemented web-server microservice.
  - `couch-gag-website` and `couch-gag-server` pump metrics via http requests to this server.
  - This server listens for incoming http requests, pulls metric values off the request, and maps it to a Metric type
- couch-gag-server
  - A Node/Typescript/Express http server implementation
  - Manages **STORY MARKUP** and serves **story collection data*, and *individual story data* to `couch-gag-website`
  - pumps metric data about stories to `couch-gag-metrics-hub` 
  - Stories are written in **MARKDOWN** and can be found in this package in `src/data/`
- couch-gag-website
  - A typescript/nextjs/react application that acts as the frontend to serve **STORY MARKUP** through.
  - Fetches **story data** from `couch-gag-server` to render to users in browser/mobile.
  - pumps metric data about user events to `couch-gag-metrics-hub`

## Developer Guide