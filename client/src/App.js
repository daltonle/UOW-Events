import React, { Component } from 'react';
import './App.css';
import Homepage from './components/Homepage';

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
      </div>
    );
  }
}

export default App;
