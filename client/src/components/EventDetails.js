import React, { Component } from 'react';
import './styles/EventDetails.css';

class EventDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      event: {}
    }
  }

  componentDidMount() {
    const link = '/api/browse/' + this.props.id;
    fetch(link)
      .then(res => res.json())
      .then(event => this.setState({event}));
  } 
  
  render() {
    return (
      <div className="EventDetails">
        <h3>{this.state.event.title}</h3>
        <p>Time: {this.state.event.time}</p>
      </div>
    );
  }
}

export default EventDetails;