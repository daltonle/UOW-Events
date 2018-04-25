import React, { Component } from 'react';
import './styles/Events.css';
import EventItem from './EventItem';

class Events extends Component {
  eventOnClick(id) {
    this.props.onClick(id);
  }
  
  render() {
    let eventItems;
    if (this.props.events) {
      eventItems = this.props.events.map (event =>
        <EventItem key={event.id} event={event} onClick={this.eventOnClick.bind(this)}/>
      );
    }
    return (
      <div className="Events">
        {eventItems}
      </div>
    );
  }
}

export default Events;