import React, { Component } from 'react';
import './styles/Profile.css';
import TopBar from './TopBar'; 
import {NotificationManager} from 'react-notifications';
import FaEdit from 'react-icons/lib/fa/edit';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      upcoming: [],
      past: [],
      usernameValid: true,
      passwordValid: true,
      emailValid: true,
      phoneValid: true,
      cardNumberValid: true,
      isEditing: false
    }
  }

  componentDidMount() {
    fetch(`/api/user/id/${localStorage.getItem('id')}`)
    .then(res => res.json())
    .then(_user => {
      this.setState({user: _user});
    });
    fetch(`/api/event/attendees/${localStorage.getItem('id')}`)
    .then(res => res.json())
    .then(events => {
      for (var i = 0; i < events.length; i++) {
        if (Date.parse(events[i].start) >= Date.now()) {
          events.splice(0,i);
          break;
        }
      }
      this.setState({upcoming: events});
    });
    fetch(`/api/event/attendees/${localStorage.getItem('id')}`)
    .then(res => res.json())
    .then(events => {
      for (var i = 0; i < events.length; i++) {
        if (Date.parse(events[i].start) >= Date.now()) {
          this.setState({past: events.slice(0,i)});
          break;
        }
      }
    });
    this.forceUpdate();
  }

  createNotification(type) {
    return () => {
      switch (type) {
        case 'saveSuccess':
          NotificationManager.success('', 'Changes saved!');
          //this.handleSubmit();
          break;
        case 'error':
          NotificationManager.error('Something went wrong. Please try again.', 'Oops!', 5000, () => {});
          break;
        default: break;
      }
    };
  };

  enableEditing() {
    this.setState({isEditing: true});
    this.forceUpdate();
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.usernameValid === false || this.state.emailValid === false ||
      this.state.passwordValid === false || this.state.cardNumberValid === false ||
      this.state.phoneValid === false) {
        NotificationManager.error('Something went wrong. Please check your details.', 'Oops!', 5000)
      }
    else {
      fetch('/api/user/update', {
        method: 'post',
        headers: new Headers({'Content-Type': 'application/json'}),
        body: JSON.stringify(this.state.user)
      })
      .then(res => res.json())
      .then(_user => this.setState({user: _user, isEditing: false}));
      NotificationManager.success('', 'Changes saved!');
    }
  }

  handleEmailChange(e) {
    // set state
    let _user = this.state.user;
    _user.email = e.target.value;
    this.setState({user: _user});

    // validation
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
      this.refs.emailWarning.innerHTML = "<br/>";
      this.setState({emailValid: true});
    }
  }

  handlePhoneChange(e) {
    let _user = this.state.user;
    _user.phone = e.target.value;
    this.setState({user: _user});

    let regex = /\D/;
    if (regex.test(e.target.value) || (e.target.value.length < 8 && e.target.value !== '') || e.target.value.length > 12) {
      this.refs.phoneWarning.innerHTML = "Invalid phone number.";
      this.setState({phoneValid: false});
    }
    else {
      this.refs.phoneWarning.innerHTML = "<br/>";
      this.setState({phoneValid: true});
    }
  }

  handleCardTypeChange(e) {
    let _user = this.state.user;
    _user.cardType = e.target.value;
    this.setState({user: _user});
  }

  handleCardNumberChange(e) {
    let _user = this.state.user;
    _user.cardNumber = e.target.value;
    this.setState({user: _user});

    if ((e.target.value.length < 10 && e.target.value !== '') || e.target.value.length > 12) {
      this.refs.cardNumberWarning.innerHTML = "Invalid card number";
      this.setState({cardNumberValid: false});
    }
    else {
      this.refs.cardNumberWarning.innerHTML = "<br/>";
      this.setState({cardNumberValid: true});
    }
  }

  handleUsernameChange(e) {
    let _user = this.state.user;
    _user.username = e.target.value;
    this.setState({user: _user});

    if (e.target.value === '') {
      this.refs.usernameWarning.innerHTML = "Can't be blank.";
      this.setState({usernameValid: false});
    }
    else if (e.target.value.length < 6) {
      this.refs.usernameWarning.innerHTML = "Must be at least 6 characters.";
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
          this.refs.usernameWarning.innerHTML = "<br/>";
          this.setState({usernameValid: true});
        }
      })
    }
  }

  handlePasswordChange(e) {
    let _user = this.state.user;
    _user.pwd = e.target.value;
    this.setState({user: _user});

    let flag = true;
    if (e.target.value.length < 8 || e.target.value.length > 16) {
      this.refs.passwordWarning.innerHTML = "Must be 8-16 characters.";
      flag = false;
    }
    else {
      this.refs.passwordWarning.innerHTML = "<br/>";
    }
    if (e.target.value !== this.refs.passwordMatch.innerHTML) {
      this.refs.passwordMatchWarning.innerHTML = "Password doesn't match.";
      flag = false;
    }
    else {
      this.refs.passwordMatchWarning.innerHTML = "<br/>";
    }
    this.setState({passwordValid: flag});
  }

  handlePasswordMatchChange(e) {
    if (e.target.value !== this.state.user.pwd) {
      this.refs.passwordMatchWarning.innerHTML = "Password doesn't match.";
      this.setState({passwordValid: false});
    }
    else {
      this.refs.passwordMatchWarning.innerHTML = "<br/>";
      this.setState({passwordValid: true});
    }
  }

  handleRedirect(id) {
    this.props.history.push(`/browse/${id}`);
  }

  render() {
    if (localStorage.getItem('id')) {
      return (
        <div className="Profile">
          <TopBar history={this.props.history}/>
          <br/>
          <form className="profile-info-container" onSubmit={this.handleSubmit.bind(this)}>
            <div className="basic-info">
              <span>{this.state.user.name}</span>
            </div>
            <div className="contact-info-title">
              <h2>Contact</h2>
            </div>
            <div className="contact-info-label">
              <p>Email</p>
              <p>Phone</p>
            </div>
            <div className="contact-info-content">
              <input 
                type="text" 
                value={this.state.user.email} 
                disabled = {(this.state.isEditing)? "" : "disabled"}
                onChange={this.handleEmailChange.bind(this)}/>
              <input 
                type="text"
                value={this.state.user.phone}
                disabled = {(this.state.isEditing)? "" : "disabled"}
                onChange={this.handlePhoneChange.bind(this)}/>
            </div>
            <div className="contact-info-warning">
              <p ref="emailWarning"><br/></p>
              <p ref="phoneWarning"><br/></p>
            </div>
            <div className="payment-info-title">
              <h2>Payment</h2>
            </div>
            <div className="payment-info-label">
              <p>Card type</p>
              <p>Card number</p>
            </div>
            <div className="payment-info-content">
              <select 
                value={this.state.user.cardType}
                disabled = {(this.state.isEditing)? "" : "disabled"}
                onChange={this.handleCardTypeChange.bind(this)}>
                <option value='N/A'></option>
                <option value='Debit Mastercard'>Debit Mastercard</option>
                <option value='VISA'>VISA</option>
                <option value='PayPal'>PayPal</option>
              </select>
              <input
                type="text"
                value={this.state.user.cardNumber}
                disabled = {(this.state.isEditing)? "" : "disabled"}
                onChange={this.handleCardNumberChange.bind(this)} />
            </div>
            <div className="payment-info-warning">
              <p><br/></p>
              <p ref="cardNumberWarning"><br/></p>
            </div>
            <div className="account-info-title">
              <h2>Account</h2>
            </div>
            <div className="account-info-label">
              <p>Username</p>
              <p>Password</p>
              <p>Re-enter password</p>
              {(this.state.isEditing) ?
                <input type="submit" value="Save"/> :
                <button onClick={this.enableEditing.bind(this)}>Edit <FaEdit/></button>
              }
              </div>
              <div className="account-info-content">
                <input
                  type="text"
                  value={this.state.user.username}
                  disabled = {(this.state.isEditing)? "" : "disabled"}
                  onChange={this.handleUsernameChange.bind(this)} />
                <input
                  type="password"
                  value={this.state.user.pwd}
                  disabled = {(this.state.isEditing)? "" : "disabled"}
                  onChange={this.handlePasswordChange.bind(this)} />
                <input
                  type="password"
                  disabled = {(this.state.isEditing)? "" : "disabled"}
                  ref = "passwordMatch"
                  onChange={this.handlePasswordMatchChange.bind(this)} />
              </div>
              <div className="account-info-warning">
                <p ref="usernameWarning"><br/></p>
                <p ref="passwordWarning"><br/></p>
                <p ref="passwordMatchWarning"><br/></p>
              </div>
              <div className="upcoming-title">
                <h2>Upcoming Events</h2>
              </div>
              <ul className="upcoming-events">
                { (this.state.upcoming.length === 0) ?
                  <span>No upcoming events.</span> :
                  this.state.upcoming.map(event => 
                    <li onClick={this.handleRedirect.bind(this, event._id)}>{new Date(event.start).getDate()}/{new Date(event.start).getMonth()}/{new Date(event.start).getFullYear()} - {event.title}</li>
                  )
                }
              </ul>
              <div className="past-title">
                <h2>Past Events</h2>
              </div>
              <ul className="past-events">
                { (this.state.past.length === 0) ?
                  <span>No past events.</span> :
                  this.state.past.map(event =>
                    <li onClick={this.handleRedirect.bind(this, event._id)}>{new Date(event.start).getDate()}/{new Date(event.start).getMonth()}/{new Date(event.start).getFullYear()} - {event.title}</li>
                  )
                }
              </ul>
          </form>
        </div>
      );
    }
    else {
      return <div>{this.props.history.push("/")}</div>
    }
  }
}



export default Profile;