import React, { Component } from 'react';
import { 
  BrowserRouter,
  Route,
  Link,
  Switch,
  Redirect 
} from 'react-router-dom';
import './App.css';
import Homepage from './components/Homepage';
import EventDetails from './components/EventDetails';

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
        <Homepage />
    );
  }
}

export default App;
