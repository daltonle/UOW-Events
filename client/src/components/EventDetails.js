import React, { Component } from 'react';
import './styles/EventDetails.css';
import TopBar from './TopBar'; 
import {NotificationManager} from 'react-notifications';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

class EventDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      event: {},
      isBooked: false
    }
    this.displayTime = this.displayTime.bind(this);
  }

  componentDidMount() {
    const link = '/api/browse/' + this.props.id;
    fetch(link)
      .then(res => res.json())
      .then(_event => {
        if (!sessionStorage.getItem('id')) {
          this.setState({event: _event, isBooked: false});
        }
        else {
          let userEvents = JSON.parse(sessionStorage.getItem('events'));
          let flag = false;
          for (var i = 0; i < userEvents.length; i++) {
            // eslint-disable-next-line
            if (_event.id == userEvents[i])
              flag = true;
              break;
          }
          this.setState({event: _event, isBooked: flag});
        }
        
      });
  }

  handleRegister = () => {
    confirmAlert({
      title: `Confirm payment. AUD ${this.state.event.price}`,
      message: 
        `Card Type: ${sessionStorage.getItem('cardType')} |
        Card Number: ${sessionStorage.getItem('cardNumber')}`,
      buttons: [
        {
          label: 'Confirm',
          onClick: () => {
            fetch('/booking/1', {
              method: 'post',
              headers: new Headers({'Content-Type': 'application/json'}),
              body: JSON.stringify({
                userId: sessionStorage.getItem('id'),
                eventId: this.state.event.id
              })
            })
            .then(res => res.json())
            .then(user => {
              sessionStorage.setItem('events', JSON.stringify(user.events));
            });
            this.setState({isBooked: true});
            NotificationManager.success('This event has been added to your events.', 'Registered');
          }
        },
        {
          label: 'Cancel',
          onClick: () => {}
        },
        {
          label: 'Change card',
          onclick: () => this.history.push('/profile')
        }
      ]
    })
  }

  handleUnregister() {
    confirmAlert({
      title: 'You may not be refunded for this event.',
      message: 'Make sure to read our refunding policies before continue.',
      buttons: [
        {
          label: 'Confirm',
          onClick: () => {
            fetch('/booking/0', {
              method: 'post',
              headers: new Headers(),
              body: JSON.stringify({
                userId: sessionStorage.getItem('id'),
                eventId: this.state.event.id
              })
            })
            .then(res => res.json())
            .then(user => {
              sessionStorage.setItem('id', user.id);
              sessionStorage.setItem('username', user.username);
              sessionStorage.setItem('events', JSON.stringify(user.events));
            });
            this.setState({isBooked: false});
            NotificationManager.success('This event has been removed from your events.', 'Un-registered');
          }
        },
        {
          label: 'Cancel',
          onClick: () => {}
        }
      ]
    })
  }

  displayRegisterButton = () => {
    if (!sessionStorage.getItem('id'))
      return <button className="event-register" onClick={this.createWarning.bind(this)}>Register</button>
    else {
      if (this.state.isBooked) {
        return <button className="event-unregister" onClick={this.handleUnregister.bind(this)}>Unregister</button>
      }
      else return <button className="event-register" onClick={this.handleRegister.bind(this)}>Register</button>
    }
  }

  createWarning = () => {
    NotificationManager.warning('You have to log in first', 'Warning', 3000);
  }
  
  displayTime() {
    let start = new Date(this.state.event.start);
    let finish = new Date(this.state.event.finish);
    let months = ["January", "February", "March", "April",
                  "May", "June", "July", "August",
                  "September", "Octorber", "November", "December"
                ];
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return (
      <p>{days[start.getDay()]}, {months[start.getMonth()]} {start.getDate()}, {start.getFullYear()}<br/>
      {start.getHours()}:{start.getMinutes() < 10 ? 0 : ''}{start.getMinutes()} - {finish.getHours()}:
      {finish.getMinutes() < 10 ? 0 : ''}{finish.getMinutes()} AEDT
      </p>
    )
  }

  render() {
    return (
      <div className="EventDetails">
        <TopBar history={this.props.history}/>
        <br/>
        <div className="evt-details-container">
          <div className="evt-details-title">
            <h1>{this.state.event.title}</h1>
          </div>
          <div className="evt-details-book">
            Are you going?<br/>
            {this.displayRegisterButton()}
          </div>
          <div className="evt-details-left">
            <p>{this.state.event.desc}</p>
          </div>
          <div className="evt-details-right">
            <h3>When</h3>
            {this.displayTime()}
            <h3>Where</h3>
            {this.state.event.venue}
            <h3>Price</h3>
            {this.state.event.price === 0 ? "Free" : `AUD ${this.state.event.price}`}
          </div>
        </div>
      </div>
    );
  }
}



export default EventDetails;