# Neighborhood Map

## Overview

This is a single page application featuring a map of my neighborhood with my favorite restaurants.

The map displays all location markers by default.

A list-view of location names is provided which displays all locations by default.

This app includes a text input field that filters the map markers and list items to locations matching the text input.

Clicking a location on the list or a marker displays unique information about the location inside an infoWindow.

## APIs
This app utilizes the [Google Maps API](https://developers.google.com/maps/documentation/javascript/tutorial) to show the map.

Functionality providing additional data about a location is provided and sourced from [Foursquare API](https://developer.foursquare.com/) (this information is provided in the marker’s infoWindow).

## Dependencies

This app uses the [react-async-script-loader](https://www.npmjs.com/package/react-async-script-loader) dependency to deal with the asynchronous API request for the Google Maps API.

## Service worker

By default, the production build is a fully functional, offline-first Progressive Web App.

* When available in the browser, the site uses a service worker to cache responses to requests for site assets.
* Visited pages are rendered when there is no network access.

Service workers require HTTPS, although to facilitate local testing, that policy does not apply to `localhost`. If your production web server does not support HTTPS, then the service worker registration will fail, but the rest of your web app will remain functional.

The service worker is only enabled in the production environment, e.g. the output of `npm run build`.

If you need to test the offline-first service worker locally, build the application (using `npm run build`) and run a simple http server from the build directory. After running the build script, `create-react-app` will give instructions for one way to test the production build locally and the deployment instructions have instructions for using other methods. Be sure to always use an incognito window to avoid complications with the browser cache.

If possible, configure the production environment to serve the generated `service-worker.js` with HTTP caching disabled. If that's not possible — GitHub Pages, for instance, does not allow you to change the default 10 minute HTTP cache lifetime — then be aware that if you visit your production site, and then revisit again before `service-worker.js` has expired from your HTTP cache, you'll continue to get the previously cached assets from the service worker. If you have an immediate need to view your updated production deployment, performing a shift-refresh will temporarily disable the service worker and retrieve all assets from the network.

## Quickstart

To run this app you can download the zip or clone the directory to your computer.

From inside the new directory:
* install all project dependencies with `npm install`
* start the development server with `npm start`

## Create React App

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

> #**MadeWithUdacity**