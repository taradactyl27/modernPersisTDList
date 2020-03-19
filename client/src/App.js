import React, {Component} from 'react';
import {Navbar, Nav} from 'react-bootstrap';
//Nav, NavDropdown, Form,  FormControl, Button, Table} 
import logo from './logo.svg';
import './App.css';
import RegisterBox from './components/RegisterBox.js';
import LoginBox from './components/LoginBox.js';

class App extends Component {
  constructor(props){
    super(props);
    this.state={
      tasks: [],
      userToken: "",
      loginOpen: true,
      registerOpen: false,
    };
}

  componentDidMount() {
    fetch('/')
      .then(res => res.json())
      .then(tasks => this.setState({tasks}));
  };

  openRegister(){
    this.setState({loginOpen: false, registerOpen: true});
  };

  openLogin() {
    this.setState({loginOpen: true, registerOpen: false});
  };

  render() {
    let links = '';
    if (!this.state.userToken){
      links =  <> <Nav.Link onClick={this.openRegister.bind(this)}>Register</Nav.Link>
      <Nav.Link onClick={this.openLogin.bind(this)}>Login</Nav.Link> </>;
    }
    else{
      links = <Nav.Link href="/logout"> Logout </Nav.Link>;
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
      
      <div className="box-container">
       {this.state.loginOpen && <LoginBox/>}
       {this.state.registerOpen && <RegisterBox/>}
     </div>
    </div>
    );
  };
}

export default App;
