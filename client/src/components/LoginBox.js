import React, {Component} from 'react';
import '../App.css';
import Axios from 'axios'

class LoginBox extends Component {

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
    submitLogin(e) {
      e.preventDefault();
      const URL = '/authorize';
      const user = {
        username: this.state.username,
      }
      Axios.post('https://stormy-ocean-79116.herokuapp.com/https://hunter-todo-api.herokuapp.com/auth',user).then((res) => {
       // console.log(res.status);
        if (res.status === 200){
          console.log(res.data);
          let returnJson = {"token":res.data.token,"username":this.state.username};
          this.props.handler(returnJson);
        }
      }).catch((e) => {
        console.log(e);
        this.setState({usernameErr: "User doesn't exist!"});
      });


    }
  
    render() {
      let usernameErr = this.state.usernameErr;
      return (
        <div className="inner-container">
          <div className="header">
            Login
          </div>
          <div className="box">
  
            <div className="input-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                name="username"
                className="login-input"
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
              className="login-btn"
              onClick={this
              .submitLogin
              .bind(this)}>Login</button>
          </div>
        </div>
      );
    }
  }

export default LoginBox;