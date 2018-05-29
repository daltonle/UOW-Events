import React, { Component } from 'react';
import TopBar from './TopBar';
import {Link} from 'react-router-dom';
import moment from 'moment';

class PastEvents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: []
    }
  }

  componentDidMount() {
    fetch('/api/browse')
      .then(res => res.json())
      .then(events => {
        for (var i = 0; i < events.length; i++) {
          if (Date.parse(events[i].start) >= Date.now()) {
            events = events.slice(0,i);
            break;
          }
        }
        this.setState({events});
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
                    {event.title.length <= 23? <span>{event.title}</span>:<span>{event.title.substring(0,20)}...</span>}
                  </Link>
		    					<p>{event.desc.substring(0, 75)}...</p>							
		    				</div>
		  			</div>
		  		</div>
        );
      });
    }

    return <div>
      <TopBar history={this.props.history} isLoggedIn={this.state.isLoggedIn}/>
	    <div className="container">
        <h1>Past events</h1>
	      {eventItems}
	    </div>
    </div>

  }
}

export default PastEvents;