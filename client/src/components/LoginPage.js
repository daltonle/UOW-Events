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

  componentWillMount() {
    if (sessionStorage.getItem('id')) {
      this.props.history.push("/");
    }
  }

  handleSubmit(e) {
    e.preventDefault();

    fetch('/login', {
      method: 'post',
      headers: new Headers({'Content-Type': 'application/json'}),
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password
      })
    })
    .then(res => res.json())
    .then(data => {
      sessionStorage.setItem('id', data.id);
      sessionStorage.setItem('username', data.username);
      sessionStorage.setItem('events', JSON.stringify(data.events));
      sessionStorage.setItem('cardType', data.cardType);
      sessionStorage.setItem('cardNumber', data.cardNumber);
      //console.log(`${JSON.stringify(data.events)}, ${JSON.parse(JSON.stringify(data.events))[0]}`)
    });

    this.forceUpdate();
  }

  handleRedirect() {
    this.props.history.push("/signup");
  }

  render() {
    if (!sessionStorage.getItem('id')) {
      return (
        <div className="LoginPage">
		  	  <div className="logo">
		  		  <h1>UOW Events</h1>
		  	  </div>
		  	  <div className="login-form">
			  	  <form onSubmit={this.handleSubmit}>
				  	  <input type="text" placeholder="username" value={this.state.username} onChange={this.handleUsernameChange}/>
					    <input type="password" placeholder="password" value={this.state.password} onChange={this.handlePasswordChange}/>
					    <button type="submit">LOG IN</button>
		  		  </form><br/>
            Hint: You can log in with your UOW Account<br/>
            Don't have one? <a onClick={this.handleRedirect.bind(this)}>Sign up as guest.</a>
			    </div>
		    </div>
      );
    }
    else {
      return <div>
        {this.props.history.push("/")}
      </div>
    }

  }
}

export default LoginPage;