import React, { Component } from 'react';
import './styles/LoginPage.css';

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
        username: '',
        password: ''
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }

  handleUsernameChange(e) {
    this.setState({username: e.target.value});
  }

  handlePasswordChange(e) {
    this.setState({password: e.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();

    fetch('/login', {
      method: 'post',
      headers: new Headers(),
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password
      })
    })
    .then(res => res.json())
    .then(data => {
      sessionStorage.setItem('id', data.id);
      sessionStorage.setItem('username', data.username);
    });
  }

  render() {
    if (!sessionStorage.getItem('id')) {
      return (
        <div className="LoginPage">
		  	  <div className="logo">
		  		  <h1>UOW Events</h1>
		  	  </div>
		  	  <div className="login-form">
			  	  <form onSubmit={this.handleSubmit.bind(this)}>
				  	  <input type="text" placeholder="username" value={this.state.username} onChange={this.handleUsernameChange}/><br/>
					    <input type="password" placeholder="password" value={this.state.password} onChange={this.handlePasswordChange}/><br/>
					    <button type="submit">LOG IN</button>
		  		  </form>
			    </div>
		    </div>
      );
    }
    else {
      this.props.history.push("/");
      return;
    }

  }
}

export default LoginPage;