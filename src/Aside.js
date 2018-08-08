import React, { Component } from 'react';
import Search from './Search.js';
import HamburgerIcon from './HamburgerIcon';

class Aside extends Component {

    state = {
        visible: false
    }
    
    handleClick = (e) => {
        this.toggleMenu();
        e.stopPropagation();
    }
    
    toggleMenu = () => {
        this.setState({visible: !this.state.visible})
    }

    render() {
        return (
            <aside>
                <HamburgerIcon
                    handleClick={this.handleClick}
                />
                <Search
                    handleClick={this.handleClick}
                    menuVisibility={this.state.visible}
                    searchQuery={this.props.searchQuery}
                    updateQuery={this.props.updateQuery}
                    markers={this.props.markers}
                />
            </aside>
        )
    }
}

export default Aside;