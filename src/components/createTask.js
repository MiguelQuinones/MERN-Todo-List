// Page for creating a task to add to the todo list

// Necessary import statements
import React, { Component } from "react";

export default class createTask extends Component {
    
    // Constructor to set default state
    constructor( props ) {
        super( props ); 

        // Bind user inputs to functions
        this.handleChangeDescription = this.handleChangeDescription.bind( this );
        this.handleChangePriority = this.handleChangePriority.bind( this );
        this.handleSubmit = this.handleSubmit.bind( this );

        // Default state descriptions
        this.state = {
            task_description : '',
            task_priority : '',
            task_completed : false
        }
    }

    // Function to update state of the description
    handleChangeDescription( e ) {
        this.setState ( {
            task_description : e.target.value
        } );
    }

    // Function to set the state of the priority for the task
    handleChangePriority( e ) {
        this.setState ( {
            task_priority : e.target.value
        } );
    }

    // Function to handle submission after a user has created their task
    handleSubmit( e ) {
        // Prevent page from refreshing after submission
        e.preventDefault();

        // Create object to hold user input
        const newTask = {
            task_description : this.state.task_description,
            task_priority: this.state.task_priority,
            task_completed: this.state.task_completed
        };

        // Send request to database comprised of stringified object
        fetch( 'http://localhost:4000/tododb/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify( newTask )
        })
        .catch( ( error ) => {
            console.error( "Error:", error)
        });

        // Set states back to default values after submission
        this.setState ({
            task_description : '',
            task_priority : '',
            task_completed : false
        })

        // Return user to list after submission
        this.props.history.push( '/' );
    }

    // Render function that displays form to user
    render() {
        return (
            <div>
                <h1 id = "header1"> Create a New Task </h1>
                <form onSubmit = { this.handleSubmit } >
                    <div className = "form-group">
                        <label className = "form-label"> Task Description: </label>
                        <input type = "text"
                               className = "form-control"
                               placeholder = "Enter the task you'd like to add here"
                               value = { this.state.task_description }
                               onChange = { this.handleChangeDescription }
                               />
                    </div>
                    <div>
                        <label> Set Task Priority: </label>
                    </div>
                    <div className = "form-group">
                        <div className = "custom-control custom-switch">
                            <input className = "custom-control-input"
                                   type = "checkbox"
                                   name = "priorityOptions"
                                   id = "customSwitch1"
                                   value = "Low"
                                   checked = { this.state.task_priority === 'Low' }
                                   onChange = { this.handleChangePriority }
                                   />
                            <label className = "custom-control-label" htmlFor = "customSwitch1"> Low </label>
                        </div>
                        <div className = "custom-control custom-switch">
                            <input className = "custom-control-input"
                                   type = "checkbox"
                                   name = "priorityOptions"
                                   id = "customSwitch2"
                                   value = "Medium"
                                   checked = { this.state.task_priority === 'Medium' }
                                   onChange = { this.handleChangePriority }
                                   />
                            <label className = "custom-control-label" htmlFor = "customSwitch2"> Medium </label>
                        </div>
                        <div className = "custom-control custom-switch">
                            <input className = "custom-control-input"
                                   type = "radio"
                                   name = "priorityOptions"
                                   id = "customSwitch3"
                                   value = "High"
                                   checked = { this.state.task_priority === 'High' }
                                   onChange = { this.handleChangePriority }
                                   />
                            <label className = "custom-control-label" htmlFor = "customSwitch3"> High </label>
                        </div>
                    </div>
                    <div className = "form-group">
                        <input type = "submit" value = "Add Task" className = "btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}