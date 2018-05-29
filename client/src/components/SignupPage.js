import React, { Component } from 'react';
import './styles/SignupPage.css';
import {NotificationManager} from 'react-notifications';

class SignupPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nameValid: false,
      emailValid: false,
      usernameValid: false,
      passwordValid: false,
      name: '',
      email: '',
      username: '',
      password: ''
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordMatchChange = this.handlePasswordMatchChange.bind(this);
  }

  componentWillUnmount() {
    this.forceUpdate();
  }

  handleNameChange(e) {
    this.setState({name: e.target.value});
    if (e.target.value === '') {
      this.refs.nameWarning.innerHTML = "Name can't be blank.";
      this.setState({nameValid: false});
    }
    else {
      this.refs.nameWarning.innerHTML = "";
      this.setState({nameValid: true});
    }
  }

  handleUsernameChange(e) {
    this.setState({username: e.target.value});
    if (e.target.value === '') {
      this.refs.usernameWarning.innerHTML = "Username can't be blank.";
      this.setState({usernameValid: false});
    }
    else if (e.target.value.length < 6) {
      this.refs.usernameWarning.innerHTML = "Username must be at least 6 characters.";
      this.setState({usernameValid: false});
    }
    else {
      fetch(`/api/user/username/${e.target.value}`)
      .then(res => res.json())
      .then(userId => {
        if (userId) {
          this.refs.usernameWarning.innerHTML = "Username taken.";
          this.setState({usernameValid: false});
        }
        else {
          this.refs.usernameWarning.innerHTML = "";
          this.setState({usernameValid: true});
        }
      })
    }
  }

  handlePasswordChange(e) {
    this.setState({password: e.target.value});
    let flag = true;
    if (e.target.value.length < 8 || e.target.value.length > 16) {
      this.refs.passwordWarning.innerHTML = "Password must be 8-16 characters.";
      flag = false;
    }
    else {
      this.refs.passwordWarning.innerHTML = "";
    }
    if (e.target.value !== this.refs.passwordMatch) {
      this.refs.passwordMatchWarning.innerHTML = "Password doesn't match.";
      flag = false;
    }
    else {
      this.refs.passwordMatchWarning.innerHTML = "";
    }
    this.setState({passwordValid: flag});
  }

  handlePasswordMatchChange(e) {
    if (e.target.value !== this.state.password) {
      this.refs.passwordMatchWarning.innerHTML = "Password doesn't match.";
      this.setState({passwordValid: false});
    }
    else {
      this.refs.passwordMatchWarning.innerHTML = "";
      this.setState({passwordValid: true});
    }
  }

  handleEmailChange(e) {
    this.setState({email: e.target.value});
    let regex = new RegExp('.+@.+');
    if (e.target.value === '') {
      this.refs.emailWarning.innerHTML = "Email can't be blank.";
      this.setState({emailValid: false});
    }
    else if (!regex.test(e.target.value)) {
      this.refs.emailWarning.innerHTML = "Invalid email.";
      this.setState({emailValid: false});
    }
    else {
      this.refs.emailWarning.innerHTML = "";
      this.setState({emailValid: true});
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.nameValid === false || this.state.emailValid === false ||
      this.state.usernameValid === false || this.state.passwordValid === false) {
        NotificationManager.warning('Please check your form again.','Can\'t register.', 3000);
      }
    else {
      fetch('/api/user/add', {
        method: 'post',
        headers: new Headers({'Content-Type': 'application/json'}),
        body: JSON.stringify({
          name: this.state.name,
          email: this.state.email,
          username: this.state.username,
          password: this.state.password
        })
      })
      .then(res => res.json())
      .then(user => {
        localStorage.setItem('id', user._id);
        localStorage.setItem('username', user.username);
        
      });
      this.props.history.push('/redirect');
    }
  }

  render() {
    if (localStorage.getItem('id')) {
      return <div>{this.props.history.push("/")}</div>
    }
    else {
      return (
        <div className="SignupPage">
          <div className="logo">
		  		  <h1>UOW Events<br/>Register</h1>
		  	  </div>
		  	  <div className="signup-form">
			  	  <form onSubmit={this.handleSubmit.bind(this)}>
              <input type="text" placeholder="Name" value={this.state.name} onChange={this.handleNameChange}/>
              <p ref='nameWarning'></p>
              <input type="text" placeholder="Email" value={this.state.email} onChange={this.handleEmailChange}/>
              <p ref='emailWarning'></p>
				  	  <input type="text" placeholder="Username" value={this.state.username} onChange={this.handleUsernameChange}/>
              <p ref='usernameWarning'></p>
					    <input type="password" placeholder="Password" value={this.state.password} onChange={this.handlePasswordChange}/>
              <p ref='passwordWarning'></p>
              <input type="password" ref='passwordMatch' placeholder="Re-enter password" onChange={this.handlePasswordMatchChange}/>
              <p ref='passwordMatchWarning'></p>
					    <input type="submit" value="SUBMIT" />
		  		  </form>
			    </div>
        </div>
      )
    }
  }
}

export default SignupPage;