import React, { Component } from 'react';

class List extends Component {

    render() {
        return (
                <div className="list">
                    {this.props.markers.filter(marker => marker.getVisible()).map((marker, i) => (
                    <button className="restaurant" key={i}>
                        {marker.title}
                    </button>
                    ))}
                </div>
        )
    }
}

export default List;