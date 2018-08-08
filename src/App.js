import React, { Component } from 'react';
import scriptLoader from 'react-async-script-loader';
import './App.css';

class App extends Component{

  state = {
    mapIsReady: false,
    locations: [
      {title: 'Real Hamburgueria Portuguesa', location: {lat: 41.152565, lng: -8.620043}, filter: 'Burger'},
      {title: 'Santo Burga', location: {lat: 41.197335, lng: -8.709368}, filter: 'Burger'},
      {title: 'Mendi', location: {lat: 41.160475, lng: -8.640309}, filter: 'Indian'},
      {title: 'Real Indiana', location: {lat: 41.159654, lng: -8.68377}, filter: 'Indian'},
      {title: 'Portarossa', location: {lat: 41.156569, lng: -8.676524}, filter: 'Italian'}
    ],
    markers:[]/*,
    infoWindow: {}*/
  };

  componentWillReceiveProps ({ isScriptLoaded, isScriptLoadSucceed }) {
    if (isScriptLoaded && !this.props.isScriptLoaded) { // load finished
      if (isScriptLoadSucceed) {
        this.initApp()
      }
      else this.props.onError()
    }
  }

  componentDidMount () {
    const { isScriptLoaded, isScriptLoadSucceed } = this.props
    if (isScriptLoaded && isScriptLoadSucceed) {
      this.initApp()
    }
  }

  initApp() {
      this.map = new window.google.maps.Map(document.getElementById('map'), {
        center: {lat: 41.157944, lng: -8.629105},
        zoom: 12,
      });

      const infoWindow = new window.google.maps.InfoWindow();
      const bounds = new window.google.maps.LatLngBounds();

      for (let i = 0; i < this.state.locations.length; i++) {
        // Get the position from the location array.
        let position = this.state.locations[i].location;
        let title = this.state.locations[i].title;
        
        // Create a marker per location, and put into markers array.
        const marker = new window.google.maps.Marker({
          map: this.map,
          position: position,
          title: title
        });

        this.setState(state => ({
          markers: state.markers.concat(marker)
        }))

        const theApp = this

        marker.addListener('click', function() {
          theApp.populateInfoWindow(marker, infoWindow);
        });

        bounds.extend(marker.position);
      }
      // Extend the boundaries of the map for each marker
      this.map.fitBounds(bounds);
  }

  populateInfoWindow = (marker, infowindow) => {
    // Check to make sure the infowindow is not already opened on this marker.
    if (infowindow.marker != marker) {
      infowindow.marker = marker;
      infowindow.setContent('<div>' + marker.title + '</div>');
      infowindow.open(this.map, marker);
      // Make sure the marker property is cleared if the infowindow is closed.
      infowindow.addListener('closeclick',function(){
        infowindow.marker = null;
      });
    }
  }

  render(){
      return(
        <div className="App">
          <aside className="App-aside">
            <h1 className="App-title">Welcome to React</h1>
            <ul>
              {this.state.markers.map((marker, i) => (
                <li key={i}>
                  {marker.title}
                </li>
              ))}
            </ul>
          </aside>
          <div id="map"></div>
        </div>
      )
  }
}

export default scriptLoader(
    ["https://maps.googleapis.com/maps/api/js?key=AIzaSyCI3eIrMweOmEiMl3DzWe152eYEVbYCqjc"]
)(App)