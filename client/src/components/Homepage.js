import React, { Component } from 'react';
import { 
  BrowserRouter,
  Route,
  Link,
  Switch
} from 'react-router-dom';
import EventDetails from './EventDetails';
import TopBar from './TopBar';
import LoginPage from './LoginPage';
import SignupPage from './SignupPage';
import Profile from './Profile';
import './styles/Homepage.css';

class Homepage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      location: 'all',
      time: 'all',
    }
    
  }

  componentDidMount() {
    fetch('/api/browse')
      .then(res => res.json())
      .then(events => this.setState({events}));
  }

  handleFilterSubmit(e) {
    e.preventDefault();
    const link = '/api/browse/filter/' + this.state.location + '/' + this.state.time;
    fetch(link)
      .then(res => res.json())
      .then(_events => this.setState({
        events: _events,
        location: this.state.location,
        time: this.state.time
      }));
  }

  handleLocationChange(e) {
    let _time = this.state.time;
    let _events = this.state.events;
    this.setState({events: _events, location: e.target.value, time: _time});
  }

  handleTimeChange(e) {
    let _location = this.state.location;
    let _events = this.state.events;
    this.setState({events: _events, location: _location, time: e.target.value});
  }

  render() {
    let eventItems;
    if (this.state.events) {
      eventItems = this.state.events.map (event => {
        let d = new Date(event.start);
        let months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

        return (
          <div className="evt-card">
					  <div className="card-media">
						  <img src={event.image} alt="Attached" />
		  			</div>
			  		<div className="card-content">
				    		<div className="card-time">
		    					<p className="date-thumbnail__month">{months[d.getMonth()]}</p>
		    					<p className="date-thumbnail__day">{d.getDate()}</p>
		     				</div>
		    				<div className="card-desc">
                  <Link to={`/browse/${event.id}`} style={{textDecoration: 'none'}}><span>{event.title}</span></Link>
		    					<p>{event.desc.substring(0, 75)}...</p>							
		    				</div>
		  			</div>
		  		</div>
        );
      });
    }
    
    return (
      <BrowserRouter>
        <Switch>
          <Route path={`/browse/:id`} key="eventDetails" render={ (props) => {
            return <EventDetails id={props.match.params.id} history={props.history}/>
          }} />
          <Route exact path="/" key="browse" render={ (props) => {
            return <div>
              <TopBar history={props.history}/>
	          	<div className="container">
	          		<form className="filter" onSubmit={this.handleFilterSubmit.bind(this)}>
	          			<div className="filter-form-title">Filter</div>
	          			<label>Campus</label>
	          			<select
                    value={this.state.location}
                    onChange={this.handleLocationChange.bind(this)}>
                    <option selected value="all">Anywhere</option>
		          			<option value="main">Wollongong Main Campus</option>
	          				<option value="sws">South Western Sydney</option>
	          				<option value="inno">Innovation Campus</option>
	          			</select><br/>
	          			<label>Time</label>
	          			<select
                    value={this.state.time}
                    onChange={this.handleTimeChange.bind(this)}>
                    <option value="all" selected>Anytime</option>
	          				<option value="thisWk">This week</option>
	          				<option value="nextWk">Next week</option>
		          		</select>		
                  <input type="submit" value="Apply"/>
                  <span>{this.state.events.length} events displayed.</span>
		          	</form>
                { (this.state.events.length === 0) ? 
                  <div className="evt-container-empty">No events found. Try removing some filter options.</div> :
	          		  <div className="evt-container">
	          			  {eventItems}
	          		  </div>
                }
	          	</div>
            </div>
          }} />
					<Route path={`/login`} key="login" render={ (props) => {
            return <LoginPage history={props.history} />
          }} />
          <Route path={`/signup`} key="signup" render={ (props) => {
            return <SignupPage history={props.history} />
          }} />
          <Route path={`/profile`} key="profile" render={ (props) => {
            return <Profile history={props.history} />
          }} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default Homepage;