import React, { Component } from 'react';
import { 
  BrowserRouter,
  Route,
  Link,
  Switch,
  Redirect 
} from 'react-router-dom';
import EventDetails from './EventDetails';
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
      eventItems = this.state.events.map (event =>
        <li key={event.id}>
          <Link to={`/browse/${event.id}`}>{event.title}</Link>: {event.location}
        </li>
      );
    }
    
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" render={ () => {
            return <ul>{eventItems}</ul>
          }} />
          <Route path={`/browse/:id`} render={ (props) => {
            return <EventDetails id={props.match.params.id} />
          }} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default Homepage;