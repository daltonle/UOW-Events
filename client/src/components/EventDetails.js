import React, { Component } from 'react';
import './styles/EventDetails.css';
import TopBar from './TopBar'; 
import {NotificationManager} from 'react-notifications';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import FaCalendarO from 'react-icons/lib/fa/calendar-o';
import moment from 'moment';

class EventDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      event: {},
      isBooked: false,
      avail: 0,
      hostName: "",
      hostId: "",
      isPromo: false,
    }
    this.displayTime = this.displayTime.bind(this);
    this.handleRedirect = this.handleRedirect.bind(this);
  }

  componentDidMount() {
    fetch(`/api/event/${this.props.id}`)
    .then(res => res.json())
    .then(_event => {
      this.setState({event: _event});

      let _avail = _event.capacity - _event.attendees.length;
      this.setState({avail: _avail});

      if (localStorage.getItem('id')) {
        fetch(`/api/event/${localStorage.getItem('id')}`)
        .then(res => res.json())
        .then(events => {
          events.forEach(event => {
            if (event._id === this.state.event._id) {
              this.setState({isBooked: true});
            } 
          })
        })
      }

      fetch(`/api/user/id/${_event.host.toString()}`)
      .then(res => res.json())
      .then(user => {
        this.setState({hostName: user.name, hostId: user._id});
      })
    });
  }

  handleRegister = () => {
    fetch(`/api/user/id/${localStorage.getItem('id')}`)
    .then(res => res.json())
    .then(user => {
      if ((user.cardType === '' || user.cardType === 'N/A' || user.cardNumber === '' || user.cardNumber === 'N/A') && (this.state.event.price !== 0)) {
        confirmAlert({
          title: `Can't register`,
          message: 
            `This is a charged event. Please provide your payment details before registering.`,
          buttons: [
            {
              label: 'OK',
              onClick: () => {}
            },
            {
              label: 'Account Info',
              onClick: () => {
                this.props.history.push('/profile');
              }
            }
          ]
        })
      }
      else {
        confirmAlert({
          title: `Confirm payment. AU $${this.state.event.price}`,
          message: 
            `Card Type: ${user.cardType} |
            Card Number: ${user.cardNumber}`,
          buttons: [
            {
              label: 'Confirm',
              onClick: () => {
                fetch(`/api/booking/1`, {
                  method: 'post',
                  headers: new Headers({'Content-Type': 'application/json'}),
                  body: JSON.stringify({
                    userId: localStorage.getItem('id'),
                    eventId: this.props.id
                  })
                })
                .then(res => res.json())
                .then(_event => this.setState({event: _event}));
                this.setState({isBooked: true});
                this.setState({avail: (this.state.avail-1)});
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
            },
            {
              label: 'Enter promo code',
              onClick: () => this.handlePromo()
            }
          ]
        })
      }
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
            fetch(`/api/booking/0`, {
              method: 'post',
              headers: new Headers({'Content-Type': 'application/json'}),
              body: JSON.stringify({
                userId: localStorage.getItem('id'),
                eventId: this.props.id
              })
            })
            .then(res => res.json())
            .then(_event => this.setState({event: _event}));
            this.setState({isBooked: false});
            this.setState({avail: (this.state.avail+1)})
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

  handlePromo = () => {
    if (this.state.event.price === 0) {}
    else if (this.state.isPromo === true) {
      NotificationManager.warning("You've already applied a promo code.", "Oops", 3000);
    } 
    else {
      let promoCode = window.prompt("Enter promo code");
      if (promoCode !== '' && promoCode === this.state.event.promoCode) {
        let _event = this.state.event;
        _event.price = _event.price - _event.price*_event.promoValue;
        this.setState({event: _event, isPromo: true});
        let val = this.state.event.promoValue*100
        NotificationManager.success(`Value: ${val}%`, 'Promo code applied.', 3000);
      }
      else {
        confirmAlert({
          title: `Invalid promo code. Do you still want to proceed with payment?`,
          message: `Amount: AU $${this.state.event.price}`,
          buttons: [
            {
              label: 'Confirm',
              onClick: () => {
                fetch(`/api/booking/1`, {
                  method: 'post',
                  headers: new Headers({'Content-Type': 'application/json'}),
                  body: JSON.stringify({
                    userId: localStorage.getItem('id'),
                    eventId: this.props.id
                  })
                })
                .then(res => res.json())
                .then(_event => this.setState({event: _event}));
                this.setState({isBooked: true});
                this.setState({avail: (this.state.avail-1)});
                NotificationManager.success('This event has been added to your events.', 'Registered');
              }
            },
            {
              label: 'Cancel',
              onClick: () => {}
            }
          ]
        })
      }
    }
  }

  displayRegisterButton = () => {
    if (moment(this.state.event.start).isBefore(moment())) {
      return <button className="event-register" disabled="disabled">Register</button>
    }
    else if (!localStorage.getItem('id')) {
      return <button className="event-register" onClick={this.createLogInWarning.bind(this)}>Register</button>
    }
    else {
      if (this.state.hostId === localStorage.getItem('id')) {
        return <button className="event-register" disabled="disabled">Unregister</button>
      }
      else if (this.state.isBooked)
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
    let start = moment(this.state.event.start);
    let finish = moment(this.state.event.finish);
    if (ver === 'full') {
      return (
        <p>{start.format('ddd, DD MMMM YYYY @ hh:mmA')} -<br/>
        {finish.format('ddd, DD MMMM YYYY @ hh:mmA')}
        </p>
      )
    }
    if (ver === 'short') {
      return (
        <span>{start.format('ddd, MMM DD')} - {start.format('ddd, MMM DD YYYY')}</span>
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
            <p>Hosted by {this.state.hostName}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<FaCalendarO/>&nbsp;{this.displayTime('short')}</p>
          </div>
          <div className="evt-details-book">
            {this.displayRegisterButton()}
            <br/>
            { (moment(this.state.event.start).isBefore(moment())) ?
            <span>{this.state.event.attendees.length} people went.</span> :
            <span>{this.state.avail} spots left.</span>
            }
          </div>
          <div className="evt-details-img">
            <img src={this.state.event.image} alt={this.state.event.title} onerror={this.src="/images/1.jpg"}/>
          </div>
          <div className="evt-details-left">
            <p ref="eventDesc">{this.state.event.desc}</p>
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