import React, {Component} from 'react';
import '../App.css';
import Axios from 'axios'

class RegisterBox extends Component {

    constructor(props) {
      super(props);
      this.state = {
        username: '',
        usernameErr: '',
      };
    }
    onUsernameChange(e) {
      this.setState({username: e.target.value, usernameErr:''});
    }
    submitRegister(e) {
      e.preventDefault();
      const URL = '/registerA';
      const user = {
        username: this.state.username,
      }
      Axios.post('https://stormy-ocean-79116.herokuapp.com/https://hunter-todo-api.herokuapp.com/user',user).then((res) => {
       // console.log(res.status);
        if (res.status === 200){
          this.setState({usernameErr: "User registered!"});
        }
      }).catch((e) => {
        this.setState({usernameErr: "User Already Exists!"});
      });
    }
  
    render() {
      let usernameErr = this.state.usernameErr;
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
                placeholder="Username"
                onChange={this
                  .onUsernameChange
                  .bind(this)} />
                <small className="danger-error">{usernameErr
                    ? usernameErr
                  : ""}
                </small>
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