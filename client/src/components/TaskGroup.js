import React, {Component} from 'react';
import Task from './Task.js';
import {MDBCol} from "mdbreact";
import '../App.css'

class TaskGroup extends Component {
    constructor(props){
        super(props);
    }
    render() { 
        return(
        this.props.tasks.map(task =>
            <MDBCol> <Task key="nice" data={task} handler={this.props.handler}/> </MDBCol>   
            )
        );
   }

}

export default TaskGroup;