import React, { Component } from 'react';
import Events from './Events';
import EventDetails from './EventDetails';
import './styles/Homepage.css';

class Homepage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      renderList: true
    }
    
  }

  componentDidMount() {
    fetch('/api/browse')
      .then(res => res.json())
      .then(events => this.setState({events: events, renderList: true}));
  }

  handleClickEvent(id){
    console.log(id);
    return <EventDetails id={id} />
  }
  
  render() {
    {/*let eventItems;
    if (this.state.events) {
      eventItems = this.state.events.map (event =>
        <li key={event.id}>
              {event.title}: {event.location}
        </li>
      );
    }*/}
    return (
    <div className="Homepage">
        <Events events={this.state.events} onClick={this.handleClickEvent.bind(this)}/>
        {/*<ul>{eventItems}</ul>*/}
      </div>
    );
  }
}

export default Homepage;