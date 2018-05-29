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
import EventMgnt from './EventMgnt';
import PastEvents from './PastEvents';
import moment from 'moment';
import './styles/Homepage.css';

class Homepage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: []
    }
    
  }

  componentDidMount() {
    fetch('/api/browse')
      .then(res => res.json())
      .then(_events => {
        for (var i = 0; i < _events.length; i++) {
          if (Date.parse(_events[i].start) >= Date.now()) {
            _events.splice(0,i);
            break;
          }
        }
        this.setState({events: _events});
      });
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
						  <img src={event.image} alt={event.title} onerror={this.src="/images/1.jpg"} />
		  			</div>
			  		<div className="card-content">
				    		<div className="card-time">
		    					<p className="date-thumbnail__month">{months[d.getMonth()]}</p>
		    					<p className="date-thumbnail__day">{d.getDate()}</p>
		     				</div>
		    				<div className="card-desc">
                  <Link to={`/browse/${event._id}`} style={{textDecoration: 'none'}}>
                    {event.title.length <= 30? <span>{event.title}</span>:<span>{event.title.substring(0,26)}...</span>}
                  </Link>
		    					<p>{event.desc.substring(0, 90)}...</p>							
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
              <TopBar history={props.history} isLoggedIn={this.state.isLoggedIn}/>
	          	<div className="container">
                <h1>Browse events</h1>
	          		{eventItems}
                <div className="past-events">
                  <Link to={`/past-events`}>View past events</Link>
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
          <Route path={`/events-management`} key="eventMgnt" render={ (props) => {
            return <EventMgnt history={props.history} />
          }} />
          <Route path={`/past-events`} key="pastEvents" render={ (props) => {
            return <PastEvents history={props.history} />
          }} />
          <Route path={`/redirect`} key="redirect" render={ (props) => {
            props.history.push('/');
          }} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default Homepage;