import React, { Component } from 'react';
import scriptLoader from 'react-async-script-loader';
import Aside from './Aside';
import './App.css';

class App extends Component {

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

  state = {
    //these are the restaurant listings that will be shown to the user
    locations: [
      { title: 'Real Hamburgueria Portuguesa', location: {lat: 41.152565, lng: -8.620043}, venueID: '5253f4e311d2c499d31ac389'} ,
      { title: 'Santo Burga', location: {lat: 41.197335, lng: -8.709368}, venueID: '55e9dee4498e433f9e80c8a6' },
      { title: 'Mendi', location: {lat: 41.160475, lng: -8.640309}, venueID: '4cd5c0de7da9a35daaa8ebb9' },
      { title: 'Real Indiana', location: {lat: 41.159654, lng: -8.68377}, venueID: '5442c5b7498ef5d7f4bb079c' },
      { title: 'Portarossa', location: {lat: 41.156569, lng: -8.676524}, venueID: '51c848f3498e89b9acc8a5da' }
    ],
    //create a new blank array for all the listing markers
    markers:[],
    query: '',
    infoWindow: {}
  };

  updateQuery = (query) => {
    this.setState({ query })
  }

  initApp() {
      //constructor creates a new map
      this.map = new window.google.maps.Map(document.getElementById('map'), {
        center: {lat: 41.157944, lng: -8.629105},
        zoom: 12,
        mapTypeControl: false
      });

      this.setState({
        infoWindow: new window.google.maps.InfoWindow()
      });
      
      const bounds = new window.google.maps.LatLngBounds();
  
      //the following group uses the location array to create an array of markers on initialize
      for (let i = 0; i < this.state.locations.length; i++) {
        //get the position from the location array
        let position = this.state.locations[i].location;
        let title = this.state.locations[i].title;
        let venueID = this.state.locations[i].venueID;
        
        //create a marker per location, and put into markers array
        const marker = new window.google.maps.Marker({
          map: this.map,
          position: position,
          title: title,
          icon: this.state.defaultIcon,
          venueID: venueID
        });
  
        //push the marker to our array of markers  
        this.setState((state) => ({
          markers: [...state.markers, marker]
        }))
  
        const theApp = this;
  
        //create an onclick event to open an infowindow at each marker
        marker.addListener('click', function() {
          theApp.populateInfoWindow(marker, theApp.state.infoWindow);
        });
  
        bounds.extend(marker.position);
      }
      //extend the boundaries of the map for each marker
      this.map.fitBounds(bounds);
  
      //on clicking a list item, run openInfoWindow function
      document.querySelector('.list').addEventListener('click', function(e) {
        openInfoWindow(e)
      })
    
      const openInfoWindow = (e) => {
        //returns the index of the marker that matches the clicked list item
        const markerIndex = this.state.markers.findIndex(marker => marker.title === e.target.innerText)
        //runs populateInfoWindow function for the matched marker
        this.populateInfoWindow(this.state.markers[markerIndex], this.state.infoWindow)
      }
  }

  /*
   * This function populates the infowindow when the marker is clicked.
   * We'll only allow one infowindow which will open at the marker that is clicked,
   * and populate based on that markers position
   */
  populateInfoWindow = (marker, infowindow) => {
    const clientID = 'QXQJ2XVHGO02KDPNXEAFVKVNW2YFQK234E52ZEEIHOBUI42Z';
    const clientSecret = 'MPEJQNHCMWXYHZ2DTRZEG2IQ4F2OPMYYNKYR2ADJWITBPQPC';
    
    fetch(`https://api.foursquare.com/v2/venues/${marker.venueID}?&client_id=${clientID}&client_secret=${clientSecret}&v=20180804`)
      .then(response => response.json())
      .then(addInfo)
      .catch(e => requestError(e, 'info'));
  
    function addInfo(data) {
      const venueName = data.response.venue.name;
      const venueRating = data.response.venue.rating;
      const venueLink = `${data.response.venue.canonicalUrl}?ref=${clientID}`;
      
      if (venueName) {
        infowindow.setContent(
          `<div class="info-content">
              <a href="${venueLink}" target="_blank" class="venue-name">${venueName}</a><br>
              Rating: ${venueRating}
            </div>
            <img src="powered-by-foursquare-blue.svg" alt="powered by foursquare" class="foursquare">`
        )
      } else {
        infowindow.setContent('No info available');
      }
    }

    function requestError(e, part) {
      console.log(e);
      infowindow.setContent(`Oh no! There was an error making a request for the ${part}.`);
    }

    //create a "highlighted location" marker color for when the user selects a location
    const highlightedIcon = this.makeMarkerIcon('FFFF24');

    //check to make sure the infowindow is not already opened on this marker
    if (infowindow.marker !== marker) {
      const defaultIcon = marker.getIcon()
      
      if (infowindow.marker) {//if a previous marker was selected,
        //return the index of that previous selected marker
        const markerIndex = this.state.markers.findIndex(marker => marker.title === infowindow.marker.title)
        //set the corresponding marker to the default icon
        this.state.markers[markerIndex].setIcon(defaultIcon)
      }

      //create a "highlighted location" marker color for when the user selects a location
      marker.setIcon(highlightedIcon);
      
      infowindow.marker = marker;
      infowindow.open(this.map, marker);

      //make sure the marker property is cleared and the marker returns to default if the infowindow is closed
      infowindow.addListener('closeclick',function(){
        infowindow.marker = null;
        marker.setIcon(defaultIcon);
      });
    }
  }

  makeMarkerIcon(markerColor) {
    const markerImage = new window.google.maps.MarkerImage(
      'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|'+ markerColor + '|40|_|%E2%80%A2',
      new window.google.maps.Size(21, 34),//This marker is 21 pixels wide by 34 pixels high
      new window.google.maps.Point(0, 0),//The origin for this image is (0, 0)
      new window.google.maps.Point(10, 34),//The anchor for this image is (10, 34)
      new window.google.maps.Size(21,34)//scaledSize
    );
    return markerImage;
  }

  render(){
      
    if (this.state.query) {//if there is some input
      this.state.locations.forEach((local, i) => {
        if (local.title.toLowerCase().includes(this.state.query.toLowerCase())) {//if the string matches the input,
          this.state.markers[i].setVisible(true)//show matched markers
        } else {//if the string doesn't match the input
          if (this.state.infoWindow.marker === this.state.markers[i]) {//if there are opened infowindows for markers that don't match,
            this.state.infoWindow.close()//close those infowindows
          }
          this.state.markers[i].setVisible(false)
        }
      })
    } else {//if there is no input,
      this.state.locations.forEach((local, i) => {
        if (this.state.markers.length) {
          this.state.markers[i].setVisible(true)//show all markers
        }
      })
    }

      return(
        <div className="App">
          <Aside
            searchQuery={this.state.query}
            updateQuery={this.updateQuery}
            markers={this.state.markers}
          />
          <main id="map"role="application" aria-label="location"></main>
        </div>
      )
  }
}

export default scriptLoader(
    ["https://maps.googleapis.com/maps/api/js?key=AIzaSyCI3eIrMweOmEiMl3DzWe152eYEVbYCqjc"]
)(App)