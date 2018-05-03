import React, { Component } from 'react';
import './App.css';
import Homepage from './components/Homepage';
import {NotificationContainer} from 'react-notifications';
import 'react-notifications/lib/notifications.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    }
  }

  componentDidMount() {
    
  }
  
  render() {
    return (
      <div>
        <Homepage />
        <NotificationContainer/>
      </div>
    );
  }
}

export default App;
