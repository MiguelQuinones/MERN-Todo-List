// Page for editing a task on the todo list

// Necessary import statement
import axios from "axios";
import React, { Component } from "react";

export default class editTask extends Component {
    
    // Constructor will go here
    constructor( props ) {
        super( props );

        // Bind user inputs to functions
        this.handleChangeDescription = this.handleChangeDescription.bind( this );
        this.handleChangePriority = this.handleChangePriority.bind( this );
        this.handleChangeCompleted = this.handleChangeCompleted.bind( this );
        this.handleSubmit = this.handleSubmit.bind( this );

        // States of a task are empty by default
        this.state = {
            task_description: "",
            task_priority: "",
            task_completed: false
        }
    }

    // Fetch specific task to be edited from DB via its id, then set its states according to edits from user
    componentDidMount() {
        axios.get( "http://localhost:4000/tododb/" + this.props.match.params.id )
        .then( response => {
            this.setState( {
                task_description: response.data.task_description,
                task_priority: response.data.task_priority,
                task_completed: response.data.task_completed
            })
        })
        .catch( ( error ) => {
            console.error( "Error:", error )
        })
    }

    // Ensures the state of the description is always up to date
    handleChangeDescription( e ) {
        this.setState( {
            task_description: e.target.value
        } );
    }

    // Ensures the state of the priority is always up to date
    handleChangePriority( e ) {
        this.setState( {
            task_priority: e.target.value
        } );
    }

    // Sets completion state to opposite of current value
    handleChangeCompleted() {
        this.setState( {
            task_completed: !this.state.task_completed
        } );
    }

    // Handles submission -- sends edited task to DB to be displayed back to user
    handleSubmit( e ) {
        e.preventDefault();

        // Object to hold current states of edited task
        const editedTask = {
            task_description: this.state.task_description,
            task_priority: this.state.task_priority,
            task_completed: this.state.task_completed
        }

        // Send edited task back to DB to update the task
        axios.post( "http://localhost:4000/tododb/update/" + this.props.match.params.id, editedTask)
        .then( response => console.log( response.data ) );

        // Return user to list after task has been updated
        this.props.history.push( '/' );
    }

    // Render page that displays edit form to user
    render() {
        return (
            <div>
                <h1> Edit This Task </h1>
                <form onSubmit = { this.handleSubmit } >
                    <div className = "form-group">
                        <label className = "form-label"> New Task Description: </label>
                        <input type = "text"
                               className = "form-control"
                               placeholder = "Enter the task you'd like to add here"
                               value = { this.state.task_description }
                               onChange = { this.handleChangeDescription }
                               />
                    </div>
                    <div>
                        <label> Set Priority: </label>
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
                        <div className = "form-check">
                            <input className = "form-check-input"
                                   type = "checkbox"
                                   name = "completedCheckbox"
                                   id = "customSwitch4"
                                   onChange = { this.handleChangeCompleted }
                                   checked = { this.state.task_completed }
                                   value = { this.state.task_completed }
                                   />
                            <label className = "form-check-label" htmlFor = "completedCheckbox"> Completed </label>
                        </div>
                    </div>
                    <div className = "form-group">
                        <input type = "submit" value = "Update Task" className = "btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }

}