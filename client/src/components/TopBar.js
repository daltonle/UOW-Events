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
      this.props.history.push("/");
  }

  handleAccount(){
      this.props.history.push("/account");
  }

  handleSignUp() {
      this.props.history.push("/signup");
  }

  render() {
    return (
        <div className="nav-wrapper">
            <div className="logo">
                <img src="/images/logo.png" alt="logo" />
                <h1>UOW EVENTS</h1>
            </div>
            <div className="quick-link">
                {sessionStorage.getItem('id') ? 
                    <a onClick={this.handleLogOut.bind(this)}>Log out</a> :
                    <a onClick={this.handleLogIn.bind(this)}>Log in</a>
                }
            </div>
            <div className="quick-link">
                {sessionStorage.getItem('id') ? 
                    <a onClick={this.handleAccount.bind(this)}>Account</a> :
                    <a onClick={this.handleSignUp.bind(this)}>Sign up</a>
                }
            </div>
            <div className="quick-link">
                <a onClick={this.handleBrowse.bind(this)}>Browse</a>
            </div>
        </div>
    );
  }
}

export default TopBar;