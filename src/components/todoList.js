// Page for displaying the actual todo list

// Necessary import statement
import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

// Create object that will act as table of tasks
const Task = props => (
    <tr>
        <td> { props.task.task_description } </td>
        <td> { props.task.task_priority } </td>
        <td> 
            <Link to = { "/edit/" + props.task._id } > Edit Task </Link>
        </td>
    </tr>
)

export default class todoList extends Component {
    
    // Constructor will go here
    constructor( props ) {
        super( props );
        this.state = { tasks: [] }
    }

    // componentDidMount method to execute fetch api request to get list of tasks from DB
    // Figure out how to use fetch instead later
    componentDidMount() {
        axios.get( "http://localhost:4000/tododb/" )
        .then( response => {
            this.setState( { tasks: response.data } );
        })
        .catch( ( error ) => {
            console.log( error );
        })
        // fetch( 'http://localhost:4000/tododb/' )
        // .then( response => response.json() )
        // .then( response =>  {
        //     this.setState( { tasks: response.data } )
        // } )
        // .catch( ( error ) => {
        //     console.error( "Error:", error )
        // });
    }

    // Function to map list of tasks
    taskList() {
        return this.state.tasks.map( ( currentTask, index ) => {
            return < Task task = { currentTask } key = { index } />;
        })
    }

    // Render function to display table of tasks to user -- check bootstrap styling for tables later
    render() {
        return (
            <div>
                <h1> Task List </h1>
                <table className = "table table-striped">
                    <thead>
                        <tr>
                            <th> Description </th>
                            <th> Priority </th>
                            <th> Action </th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.taskList() }
                    </tbody>
                </table>
            </div>
        );
    }
}