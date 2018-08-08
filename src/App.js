import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state = {
    mapIsReady: false,
  };

  componentDidMount() {
    const ApiKey = 'AIzaSyCI3eIrMweOmEiMl3DzWe152eYEVbYCqjc';
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${ApiKey}`;
    script.async = true;
    script.defer = true;
    script.addEventListener('load', () => {
      this.setState({ mapIsReady: true });
    });

    document.body.appendChild(script);
  }

  componentDidUpdate() {
    if (this.state.mapIsReady) {
      // Display the map
      this.map = new window.google.maps.Map(document.getElementById('map'), {
        center: {lat: -34.397, lng: 150.644},
        zoom: 12,
      });
      // You also can add markers on the map below
    }
  }

  render() {
    return (
      <div className="App">
        <aside className="App-aside">
          <h1 className="App-title">Welcome to React</h1>
        </aside>
        <div id="map"></div>
      </div>
    );
  }
}

export default App;
