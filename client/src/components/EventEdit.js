import React, { Component } from 'react';
import TopBar from './TopBar'; 
import {NotificationManager} from 'react-notifications';
import EventForm from './EventForm';

class EventEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      event: {}
    }

  }

  componentDidMount() {
    if (!localStorage.getItem('id')) {
      this.props.history.push(`/browse/${this.props.id}`);
    }
    else {
      fetch(`/api/event/${this.props.id}`)
      .then(res => res.json())
      .then(_event => {
        if (_event.host.toString() !== localStorage.getItem('id')) {
          this.props.history.push(`/browse/${this.props.id}`);
        }
        else {
          this.setState({event: _event});
        }
      })
    }
  }

  render() {
    return (
      <div>
        <TopBar history={this.props.history} />
        <div className="page-container">
          <h2>Edit event</h2>
          <EventForm operation="edit" event={this.state.event} history={this.props.history}/>
        </div>
      </div>
    );
  }
}



export default EventEdit;