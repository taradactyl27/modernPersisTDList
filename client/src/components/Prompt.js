import React, {Component} from 'react';
import '../App.css';
import Axios from 'axios'

class Prompt extends Component {

    constructor(props) {
        super(props);
        this.state = {
          task: '',
          taskErr: '',
        };
      }
      ontaskChange(e) {
        this.setState({task: e.target.value, taskErr:''});
      }
    submitLogin(e) {
      e.preventDefault();
      const task = {
        content: this.state.task,
      }
      const auth = {
          headers: {"Authorization": localStorage.getItem('userToken')},
      }
      Axios.post('https://stormy-ocean-79116.herokuapp.com/https://hunter-todo-api.herokuapp.com/todo-item',task,auth).then((res) => {
        console.log(res.status);
        console.log(res);
        this.props.handler(res.data);
      }).catch((e) => {
        console.log(e);
        this.setState({taskErr: "Something went wrong!"});
      });


    }
  
    render() {
      let taskErr = this.state.taskErr;
      return (
        <div className="inner-container">
          <div className="header">
            Add a new Task
          </div>
          <div className="box">
  
            <div className="input-group">
              <label htmlFor="task">task</label>
              <input
                type="textarea"
                name="task"
                className="login-input"
                placeholder="Task to Do"
                onChange={this
                  .ontaskChange
                  .bind(this)} />
                <small className="danger-error">{taskErr
                    ? taskErr
                  : ""}
                </small>    
            </div>
            <button
              type="button"
              className="login-btn"
              onClick={this
              .submitLogin
              .bind(this)}>Add Task</button>
          </div>
        </div>
      );
    }
  }

export default Prompt;