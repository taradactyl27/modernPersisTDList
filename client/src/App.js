import React, {Component} from 'react';
import {Navbar, Nav} from 'react-bootstrap';
import Button from 'react-bootstrap/Button'
import {MDBRow} from "mdbreact";
import './App.css';
import RegisterBox from './components/RegisterBox.js';
import LoginBox from './components/LoginBox.js';
import TaskGroup from './components/TaskGroup.js';
import Prompt from './components/Prompt.js';
import Axios from 'axios'

class App extends Component {
  constructor(props){
    super(props);
    this.handler = this.handler.bind(this);
    this.state={
      loginOpen: true,
      registerOpen: false,
      tasks: [],
    };
 
}
  handler(cookie) {
    let auth = localStorage.getItem('isAuthenticated');
    if (!auth){
    localStorage.setItem('userToken',cookie.token);
    localStorage.setItem('user',cookie.username);
    localStorage.setItem('isAuthenticated',true);
    this.forceUpdate();
    }
    this.updateTasks();
  }
  updateTasks(){
    let token = localStorage.getItem('userToken');
    //console.log(token);
    let auth = {headers: {"Authorization": token}};
    if (token)
    Axios.get('https://stormy-ocean-79116.herokuapp.com/https://hunter-todo-api.herokuapp.com/todo-item',auth).then((res) => {
      let todoList = res.data;
      for(var i = 0; i< todoList.length; i++){
        if (todoList[i].deleted == true){
         delete todoList[i] //remove all instances of deleted todo items
        }
      }
      this.setState({tasks: todoList});
    }).catch((e) => {
      console.log(e);
    });
  }
  componentDidMount(){
    let token = localStorage.getItem('userToken');
   // console.log(token);
    let auth = {headers: {"Authorization": token}};
    if (token)
    Axios.get('https://stormy-ocean-79116.herokuapp.com/https://hunter-todo-api.herokuapp.com/todo-item',auth).then((res) => {
      let todoList = res.data;
      for(var i = 0; i< todoList.length; i++){
        if (todoList[i].deleted == true){
         delete todoList[i] //remove all instances of deleted todo items
        }
      }
      this.setState({tasks: todoList});
    }).catch((e) => {
      console.log(e);
    });
  }
  openRegister(){
    this.setState({loginOpen: false, registerOpen: true});
  };

  openLogin() {
    this.setState({loginOpen: true, registerOpen: false});
  };

  loginOut(){
    localStorage.removeItem('userToken');
    localStorage.removeItem('user');
    localStorage.removeItem('isAuthenticated');
    this.forceUpdate();
  }
  render() {
    //console.log(this.state.user, this.state.isAuthenticated);
    let links = '';
    let body = ''
    let auth = localStorage.getItem('isAuthenticated');
    if (!auth){
      links =  <> <Nav.Link onClick={this.openRegister.bind(this)}>Register</Nav.Link>
      <Nav.Link onClick={this.openLogin.bind(this)}>Login</Nav.Link> </>;
    }
    else{
      links = <Nav.Link onClick={this.loginOut.bind(this)}> Logout </Nav.Link>;
    }
    let token = localStorage.getItem('userToken');
    let name = localStorage.getItem('user');
    if(auth){
     body = <> <h1> Welcome {name} </h1>
      <div className="game-area">
        <MDBRow>
          <TaskGroup tasks={this.state.tasks} handler={this.handler}/>
                 </MDBRow>
                 <div className="actions">
                   <div className = "box-container">
                   <Prompt handler={this.handler} />
                   </div>
              </div>
      </div>
      
      </>;
    }
    else{
      body = <> <div className="box-container">
      {this.state.loginOpen && <LoginBox handler ={this.handler} />}
      {this.state.registerOpen && <RegisterBox/>}
    </div> </>
    }
    return (
    <div className="ToDoList">
      <header>
        <Navbar variant="dark" bg="primary">
          <Navbar.Brand href="/">Modern ToDoList</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Nav bg="light" className="ml-auto">
                  {links}
            </Nav>
        </Navbar>
      </header>
        {body}
    </div>
    );
  };
}

export default App;
