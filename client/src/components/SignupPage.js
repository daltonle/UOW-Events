import React, { Component } from 'react';
import './styles/SignupPage.css';

class SignupPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      username: '',
      password: ''
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
  }

  handleUsernameChange(e) {
    this.setState({username: e.target.value});
  }

  handlePasswordChange(e) {
    this.setState({password: e.target.value});
  }

  handleEmailChange(e) {
    this.setState({email: e.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();

    fetch('/signup', {
      method: 'post',
      headers: new Headers({'Content-Type': 'application/json'}),
      body: JSON.stringify({
        email: this.state.email,
        username: this.state.username,
        password: this.state.password
      })
    })
    .then(res => res.json())
    .then(data => {
      sessionStorage.setItem('id', data.id);
      sessionStorage.setItem('username', data.username);
      sessionStorage.setItem('events', data.stringify(data.events));
    });

    this.forceUpdate();
  }

  render() {
    if (sessionStorage.getItem('id')) {
      return <div>{this.props.history.push("/")}</div>
    }
    else {
      return (
        <div className="SignupPage">
          <div className="logo">
		  		  <h1>UOW Events - Register</h1>
		  	  </div>
		  	  <div className="signup-form">
			  	  <form onSubmit={this.handleSubmit.bind(this)}>
              <input type="text" placeholder="email" value={this.state.email} onChange={this.handleEmailChange}/>
				  	  <input type="text" placeholder="username" value={this.state.username} onChange={this.handleUsernameChange}/><br/>
					    <input type="password" placeholder="password" value={this.state.password} onChange={this.handlePasswordChange}/><br/>
					    <button type="submit">Submit</button>
		  		  </form>
			    </div>
        </div>
      )
    }
  }
}

export default SignupPage;