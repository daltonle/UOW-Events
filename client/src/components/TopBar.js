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
    sessionStorage.clear();
    this.props.history.push("/");
  }

  handleProfile(){
    this.props.history.push("/profile");
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
                {sessionStorage.getItem('id') ? 
                    <a onClick={this.handleLogOut.bind(this)}>LOG OUT</a> :
                    <a onClick={this.handleLogIn.bind(this)}>LOG IN</a>
                }
            </div>
            <div className="quick-link">
                {sessionStorage.getItem('id') ? 
                    <a onClick={this.handleProfile.bind(this)}>PROFILE</a> :
                    <a onClick={this.handleSignUp.bind(this)}>SIGN UP</a>
                }
            </div>
            <div className="quick-link">
                <a onClick={this.handleBrowse.bind(this)}>BROWSE</a>
            </div>
        </div>
    );
  }
}

export default TopBar;