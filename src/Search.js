import React, { Component } from 'react';
import List from './List.js';

class Search extends Component {

    render() {

        //define the default class name for this <div> to 'hide'
        let visibility = 'hide';
        
        //if the aside state was changed to true (by clicking the hamburger icon),
        if (this.props.menuVisibility) {//change the class name of this <div> to 'show'
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
            <List
                markers={this.props.markers}
            />
            </div>
        )
    }
}

export default Search;