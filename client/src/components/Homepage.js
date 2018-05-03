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
    }
    
  }

  componentDidMount() {
    fetch('/api/browse')
      .then(res => res.json())
      .then(events => this.setState({events}));
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
                  <Link to={`/browse/${event.id}`}><h2>{event.title}</h2></Link>
		    					<p>{event.desc}</p>							
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
	          	<br />
	          	<div className="container">
	          		<div className="filter">
	          			<h3>Filter</h3>
	          			<h4>Location</h4>
	          			<select name="location">
		          			<option value="main">Wollongong Main Campus</option>
	          				<option value="sws">South Western Sydney</option>
	          				<option value="inno">Innovation Campus</option>
	          				<option value="all">Anywhere</option>
	          			</select><br/>
	          			<h4>Time</h4>
	          			<select name="time">
	          				<option value="thisWk">This week</option>
	          				<option value="nextWk">Next week</option>
	          				<option value="all" selected>Anytime</option>
		          		</select><br/>		
		          	</div>
	          		<div className="evt-container">
	          			{eventItems}
	          		</div>
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