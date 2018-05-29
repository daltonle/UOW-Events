import React, { Component } from 'react';
import './styles/TopBar.css';

class TopBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    }
  }

  handleBrowse() {
    this.props.history.push("/");
  }

  handleLogIn() {
    this.props.history.push("/login");
  }

  handleLogOut(){
    localStorage.clear();
    this.props.history.push("/");
  }

  handleProfile(){
    this.props.history.push("/profile");
  }

  handleEventMgnt(){
    this.props.history.push("/events-management");
  }

  handleSignUp() {
    this.props.history.push("/signup");
  }

  render() {
    return (
        <div className="nav-wrapper">
            <div className="logo">
                <img src="/images/logo.png" alt="logo" />
                <span onClick={this.handleBrowse.bind(this)}>UOW EVENTS</span>
            </div>
            <div className="quick-link">
                {localStorage.getItem('id') ? 
                    <a onClick={this.handleLogOut.bind(this)}>LOG OUT</a> :
                    <a onClick={this.handleLogIn.bind(this)}>LOG IN</a>
                }
            </div>
            {localStorage.getItem('id') ?
              <div className="dropdown">
              <a className="quick-link" id="dropdown-btn">ACCOUNT</a><br/><br/>
              <div className="dropdown-content">
                <a onClick={this.handleProfile.bind(this)}>Account info</a>
                <a onClick={this.handleEventMgnt.bind(this)}>Your events</a>
              </div> 
              </div> : 
              <a className="quick-link" onClick={this.handleSignUp.bind(this)}>SIGN UP</a>
            }
            <div className="quick-link"onClick={this.handleBrowse.bind(this)}>
                <a>BROWSE</a>
            </div>
        </div>
    );
  }
}

export default TopBar;