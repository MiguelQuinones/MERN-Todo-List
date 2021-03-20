// Page for displaying the actual todo list

// Necessary import statement
import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

// Create object that will act as table of tasks -- add deletion functionality
const Task = props => (
    <tr>
        <td className = "taskDescription"> { props.task.task_description }</td>
        <td className = "taskPriority"> { props.task.task_priority } </td>
        <td className = { props.task.task_completed ? "completed" : "" }> </td>
        <td> 
            <Link to = { "/edit/" + props.task._id }> Edit Task </Link>
        </td>
        <td>
            <Link to ={ "/delete/" + props.task._id }> Delete Task </Link>
        </td>
    </tr>
)

export default class todoList extends Component {
    
    constructor( props ) {
        super( props );

        // Default state consists of empty array, tasks retrieved from DB will be placed here
        this.state = { tasks: [] }
    }

    // componentDidMount method to execute fetch api request to get list of tasks from DB
    // Figure out how to use fetch instead later
    componentDidMount() {
        axios.get( "http://localhost:4000/tododb/" )
        .then( response => {
            this.setState( { tasks: response.data } );
        } )
        .catch( ( error ) => {
            console.log( error );
        } )
    }

    // Function to map list of tasks
    taskList() {
        return this.state.tasks.map( ( currentTask, index ) => {
            return < Task task = { currentTask } key = { index } />;
        })
    }

    // Render function to display table of tasks to user -- if task is completed, add checkmark next to task in new header
    render() {
        return (
            <div>
                <h1> Task List </h1>
                <table className = "table table-striped table-bordered table-hover table-dark">
                    <thead>
                        <tr>
                            <th> Description </th>
                            <th> Priority </th>
                            <th> Completed </th>
                            <th> Edit </th>
                            <th> Delete </th>
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