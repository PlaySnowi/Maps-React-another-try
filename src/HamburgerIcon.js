import React, { Component } from 'react';

class HamburgerIcon extends Component {
    render() {
        return (
            <nav className="top-bar">
                <button id="hamburger-icon" onClick={this.props.handleClick} aria-label="menu">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path d="M2 6h20v3H2zm0 5h20v3H2zm0 5h20v3H2z"/>
                    </svg>
                </button>
            </nav>
        );
    }
}

export default HamburgerIcon;