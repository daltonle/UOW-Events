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
      isEditing: false
    }
  }

  componentDidMount() {
    fetch('/profile', {
      method: 'post',
      headers: new Headers({'Content-Type': 'application/json'}),
      body: JSON.stringify({
        id: sessionStorage.getItem('id')
      })
    })
    .then(res => res.json())
    .then(user => {
      this.setState({user})
    });
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
    let _user = this.state.user;
    this.setState({user: _user, isEditing: true});
    this.forceUpdate();
  }

  handleSubmit(e) {
    e.preventDefault();

    fetch('/profile/edit', {
      method: 'post',
      headers: new Headers({'Content-Type': 'application/json'}),
      body: JSON.stringify(this.state.user)
    })
    .then(res => res.json())
    .then(_user => this.setState({user: _user, isEditing: false}));
  }

  handleEmailChange(e) {
    let _user = this.state.user;
    let _isEditing = this.state.isEditing;
    _user.email = e.target.value;
    this.setState({_user, _isEditing});
  }

  handlePhoneChange(e) {
    let _user = this.state.user;
    let _isEditing = this.state.isEditing;
    _user.phone = e.target.value;
    this.setState({_user, _isEditing});
  }

  handleAddressChange(e) {
    let _user = this.state.user;
    let _isEditing = this.state.isEditing;
    _user.address = e.target.value;
    this.setState({_user, _isEditing});
  }

  handleCardTypeChange(e) {
    let _user = this.state.user;
    let _isEditing = this.state.isEditing;
    _user.cardType = e.target.value;
    this.setState({_user, _isEditing});
  }

  handleCardNumberChange(e) {
    let _user = this.state.user;
    let _isEditing = this.state.isEditing;
    _user.cardNumber = e.target.value;
    this.setState({_user, _isEditing});
  }

  render() {
    if (sessionStorage.getItem('id')) {
      return (
        <div className="Profile">
          <TopBar history={this.props.history}/>
          <br/>
          <form className="profile-info-container" onSubmit={this.handleSubmit.bind(this)}>
            <div className="basic-info">
              <h1>{this.state.user.name} ({this.state.user.id})</h1>
            </div>
              <div className="contact-info-title">
                <h2>Contact</h2>
              </div>
              <div className="contact-info-label">
                <strong>Email</strong>
                <br/>
                <strong>Phone</strong>
                <br/>
                <strong>Address</strong>
                <br/>
                {(this.state.isEditing) ?
                  <input type="submit" onClick={this.createNotification('saveSuccess')} value="Save changes"/> :
                  <button onClick={this.enableEditing.bind(this)}>Edit <FaEdit/></button>
                }
              </div>
              <div className="contact-info-content">
                <input 
                  type="text" 
                  value={this.state.user.email} 
                  disabled = {(this.state.isEditing)? "" : "disabled"}
                  onChange={this.handleEmailChange.bind(this)}/>
                <br/>
                <input 
                  type="text"
                  value={this.state.user.phone}
                  disabled = {(this.state.isEditing)? "" : "disabled"}
                  onChange={this.handlePhoneChange.bind(this)}/>
                <br/>
                <input
                  type="text"
                  value={this.state.user.address}
                  disabled = {(this.state.isEditing)? "" : "disabled"}
                  onChange={this.handleAddressChange.bind(this)}/>
              </div>
              <div className="payment-info-title">
                <h2>Payment Info</h2>
              </div>
              <div className="payment-info-label">
                <strong>Card type</strong>
                <br/>
                <strong>Card number</strong>
              </div>
              <div className="payment-info-content">
                <select 
                  value={this.state.user.cardType}
                  disabled = {(this.state.isEditing)? "" : "disabled"}
                  onChange={this.handleCardTypeChange.bind(this)}>
                  <option value='Debit Mastercard'>Debit Mastercard</option>
                  <option value='VISA'>VISA</option>
                </select>
                <br/>
                <input
                  type="text"
                  value={this.state.user.cardNumber}
                  disabled = {(this.state.isEditing)? "" : "disabled"}
                  onChange={this.handleCardNumberChange.bind(this)} />
              </div>
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