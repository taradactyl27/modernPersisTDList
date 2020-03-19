import React, {Component} from 'react';
import '../App.css';

class RegisterBox extends Component {

    constructor(props) {
      super(props);
      this.state = {};
    }
  
    submitRegister(e) {}
  
    render() {
      return (
        <div className="inner-container">
          <div className="header">
            Register
          </div>
          <div className="box">
  
            <div className="input-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                name="username"
                className="Register-input"
                placeholder="Username"/>
            </div>
            <button
              type="button"
              className="Register-btn"
              onClick={this
              .submitRegister
              .bind(this)}>Register</button>
          </div>
        </div>
      );
    }
  }

export default RegisterBox;