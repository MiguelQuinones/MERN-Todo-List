// Page for deleting a task from the list

// Necessary import statements
import axios from "axios";
import React, { Component } from "react";

export default class deleteTask extends Component {
    
    // Constructor will go here
    constructor( props ) {
        super( props ); 

        // Bind user inputs to functions
        this.handleChangeDescription = this.handleChangeDescription.bind( this );
        this.handleChangePriority = this.handleChangePriority.bind( this );
        this.handleChangeCompleted = this.handleChangeCompleted.bind( this );
        this.handleSubmit = this.handleSubmit.bind( this );

        // Default state descriptions
        this.state = {
            task_description: "",
            task_priority: "",
            task_completed: false
        }
    }

    // Fetch task to be deleted from DB via its id
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

    // Sends delete request to DB and removes it from the list
    handleSubmit( e ) {
        // Prevent page from refreshing after submission
        e.preventDefault();

        // Send delete request to database comprised of url holding ID of task to be removed
        console.log( "Deleting now..." );
        axios.post( "http://localhost:4000/tododb/remove/" + this.props.match.params.id )
        .then( response => {
            console.log( "Sent to /remove. ");
        })
        console.log( "Deleted!" );

        // Return user to list after deletion
        this.props.history.push( '/' );
    }

    // Render function that displays form to user -- remove submit input later for submit button component
    render() {
        return (
            <div>
                <h1> Delete This Task? </h1>
                <form onSubmit = { this.handleSubmit } >
                    <div className = "form-group">
                        <label className = "form-label"> Task Description: </label>
                        <input type = "text"
                               className = "form-control"
                               value = { this.state.task_description }
                               readOnly
                               onChange = { this.handleChangeDescription }
                               />
                    </div>
                    <div>
                        <label> Task Priority: </label>
                    </div>
                    <div className = "form-group">
                        <div className = "custom-control custom-switch">
                            <input className = "custom-control-input"
                                   type = "checkbox"
                                   name = "priorityOptions"
                                   id = "customSwitch1"
                                   value = "Low"
                                   readOnly
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
                                   readOnly
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
                                   readOnly
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
                                   readOnly
                                   onChange = { this.handleChangeCompleted }
                                   checked = { this.state.task_completed }
                                   value = { this.state.task_completed }
                                   />
                            <label className = "form-check-label" htmlFor = "completedCheckbox"> Completed </label>
                        </div>
                    </div>
                    <div className = "form-group">
                        <input type = "submit" value = "Delete Task" className = "btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}