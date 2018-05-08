import React, { Component } from 'react';
import './styles/EventDetails.css';
import TopBar from './TopBar'; 
import {NotificationManager} from 'react-notifications';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import FaCalendarO from 'react-icons/lib/fa/calendar-o';

class EventDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      event: {},
      isBooked: false,
      avail: 0
    }
    this.displayTime = this.displayTime.bind(this);
    this.handleRedirect = this.handleRedirect.bind(this);
  }

  componentDidMount() {
    const link = '/api/browse/' + this.props.id;
    fetch(link)
      .then(res => res.json())
      .then(_event => {
        let _avail = _event.capacity - _event.attendees.length;
        if (!sessionStorage.getItem('id')) {
          this.setState({event: _event, isBooked: false, avail: _avail});
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
          this.setState({event: _event, isBooked: flag, avail: _avail});
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
          onClick: () => this.handleRedirect()
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

  handleRedirect = () => {
    this.props.history.push("/profile");
  }

  displayRegisterButton = () => {
    if (!sessionStorage.getItem('id')) {
      return <button className="event-register" onClick={this.createLogInWarning.bind(this)}>Register</button>
    }
    else {
      if (this.state.isBooked)
        return <button className="event-unregister" onClick={this.handleUnregister.bind(this)}>Unregister</button>
      else if (this.state.avail !== 0)
        return <button className="event-register" onClick={this.handleRegister.bind(this)}>Register</button>
      else return <button className="event-register" disabled="disabled">Register</button>
    }
  }

  createLogInWarning = () => {
    NotificationManager.warning('You have to log in first', 'Warning', 3000);
  }
  
  displayTime = (ver) => {
    let start = new Date(this.state.event.start);
    let finish = new Date(this.state.event.finish);
    let months = ["January", "February", "March", "April",
                  "May", "June", "July", "August",
                  "September", "Octorber", "November", "December"
                ];
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    if (ver === 'full') {
      return (
        <p>{days[start.getDay()]}, {months[start.getMonth()]} {start.getDate()}, {start.getFullYear()}<br/>
        {start.getHours()}:{start.getMinutes() < 10 ? 0 : ''}{start.getMinutes()} - {finish.getHours()}:
        {finish.getMinutes() < 10 ? 0 : ''}{finish.getMinutes()} AEDT
        </p>
      )
    }
    if (ver === 'short') {
      return (
        <span>{days[start.getDay()]}, {months[start.getMonth()]} {start.getDate()}, {start.getFullYear()}</span>
      )
    }
  }

  render() {
    return (
      <div className="EventDetails">
        <TopBar history={this.props.history}/>
        <div className="evt-details-container">
          <div className="evt-details-title">
            <span>{this.state.event.title}</span><br/>
            <p>Hosted by {this.state.event.host}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<FaCalendarO/>&nbsp;{this.displayTime('short')}</p>
          </div>
          <div className="evt-details-book">
            {this.displayRegisterButton()}
            <br/>
            <span>{this.state.avail} spots left.</span>
          </div>
          <div className="evt-details-img">
            <img src={this.state.event.image} alt=""/>
          </div>
          <div className="evt-details-left">
            <p>{this.state.event.desc}</p>
          </div>
          <div className="evt-details-right">
            <h3>When</h3>
            {this.displayTime('full')}
            <h3>Where</h3>
            {this.state.event.venue}
            <h3>Price</h3>
            {this.state.event.price === 0 ? "Free" : `$ ${this.state.event.price}`}
          </div>
        </div>
      </div>
    );
  }
}



export default EventDetails;