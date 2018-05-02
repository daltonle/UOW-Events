import React, { Component } from 'react';
import './styles/EventDetails.css';
import TopBar from './TopBar'; 
import { runInThisContext } from 'vm';

class EventDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      event: {}
    }
    this.displayTime = this.displayTime.bind(this);
  }

  componentDidMount() {
    const link = '/api/browse/' + this.props.id;
    fetch(link)
      .then(res => res.json())
      .then(event => this.setState({event}));
  } 

  handleRegister() {
    
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
        <TopBar isLoggedIn={false} history={this.props.history}/>
        <br/>
        <div className="evt-details-container">
          <div className="evt-details-title">
            <h1>{this.state.event.title}</h1>
          </div>
          <div className="evt-details-book">
            Are you going?<br/>
            <button onClick={this.handleRegister.bind(this)}>Register</button>
          </div>
          <div className="evt-details-left">
            <p>{this.state.event.desc}</p>
          </div>
          <div className="evt-details-right">
            <h3>When</h3>
            {this.displayTime()}
            <h3>Where</h3>
            {this.state.event.venue}
          </div>
        </div>
      </div>
    );
  }
}



export default EventDetails;