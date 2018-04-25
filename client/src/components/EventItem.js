import React, { Component } from 'react';
import './styles/EventItem.css';

class EventItem extends Component {
    eventOnClick(id) {
        this.props.onClick(id);
    }
    
    render() {
        return (
            <div className="EventItem">
                <a href={"/browse/" + this.props.event.id} onClick={this.eventOnClick.bind(this, this.props.event.id)}>
                <strong>{this.props.event.title}</strong></a>: {this.props.event.time} {this.props.event.location}
            </div>
        );
    }
}

export default EventItem;