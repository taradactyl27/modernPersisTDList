import React, {Component} from 'react';
import Card from 'react-bootstrap/Card';
import '../App.css'
import Axios from 'axios'

class Task extends Component {

    constructor(props){
        super(props);
    }

    removeItem(){
        let id = this.props.data.id;
       // console.log(id);
        const auth = {
              headers: {"Authorization": localStorage.getItem('userToken')},
        }
        Axios.delete('https://stormy-ocean-79116.herokuapp.com/https://hunter-todo-api.herokuapp.com/todo-item/' + id,auth).then((res) => {
          //  console.log(res.status);
          //  console.log(res);
            this.props.handler(res.data);
        }).catch((e) => {
            console.log(e);
            this.setState({taskErr: "Something went wrong!"});
        });
    }
    completeItem(){
        //console.log("COMPLETING ITEM");
        let id = this.props.data.id;
        const auth = {
            headers: {"Authorization": localStorage.getItem('userToken')},
        }
        Axios.put('https://stormy-ocean-79116.herokuapp.com/https://hunter-todo-api.herokuapp.com/todo-item/' + id,{"completed":true},auth).then((res) => {
       //   console.log(res.status);
        //  console.log(res);
          this.props.handler(res.data);
        }).catch((e) => {
            console.log(e);
            this.setState({taskErr: "Something went wrong!"});
        });
    }
    render() {
        let isstrikedThrough = '';
        if (this.props.data.completed){
            isstrikedThrough = <> <Card.Text style={{textDecoration:"line-through"}}>
            {this.props.data.content}
            </Card.Text> </>;
        }
        else{
            isstrikedThrough = <> <Card.Text>
            {this.props.data.content}
            </Card.Text> </>;
        }

        return(
            <Card style={{ width: '18rem' }}>
                <Card.Body>
                    <Card.Title>TO_DO</Card.Title>
                    {isstrikedThrough}
                    <Card.Link onClick={this.completeItem.bind(this)} href="#"> Mark As Done </Card.Link>
                    <Card.Link onClick={this.removeItem.bind(this)} href="#"> Remove</Card.Link>
                </Card.Body>
            </Card>
        );
    }

}

export default Task;