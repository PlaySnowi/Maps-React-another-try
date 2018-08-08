import React, { Component } from 'react';

class Search extends Component {

    render() {
        let visibility = 'hide';
        
        if (this.props.menuVisibility) {
            visibility = 'show';
        }

        return (
            <div id="search" className={visibility}>
                <h1 className="App-title">My Top 5 Restaurants</h1>
                <input
                    type="text"
                    placeholder="Search restaurants"
                    value={this.props.searchQuery}
                    onChange={(event) => this.props.updateQuery(event.target.value)}
                />
                <ul className="list">
                    {this.props.markers.filter(marker => marker.getVisible()).map((marker, i) => (
                    <li key={i}>
                        {marker.title}
                    </li>
                    ))}
                </ul>
          </div>
        )
    }
}

export default Search;