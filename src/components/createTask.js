// Page for creating a task to add to the todo list

// Necessary import statements
import React, { Component } from "react";
// use fetch instead of axios

export default class createTask extends Component {
    
    // Constructor will go here
    constructor( props ) {
        super( props ); // deprecated, might want to remove

        // bind statements go here
        this.handleChangeDescription = this.handleChangeDescription.bind( this );
        this.handleChangePriority = this.handleChangePriority.bind( this );
        this.handleSubmit = this.handleSubmit.bind( this );

        // State descriptions
        this.state = {
            task_description : '',
            task_priority : '',
            task_completed : false
        }
    }

    handleChangeDescription( e ) {
        this.setState ({
            task_description : e.target.value
        });
    }

    handleChangePriority( e ) {
        this.setState ({
            task_priority : e.target.value
        });
    }

    handleSubmit( e ) {
        // Prevent page from refreshing after submission
        e.preventDefault();

        // Console log statements -- remove later 
        console.log( `Task description: ${ this.state.task_description }` );
        console.log( `Task priority: ${ this.state.task_priority}` );

        // Set states back to default values after submission
        this.setState ({
            task_description : '',
            task_priority : '',
            task_completed : false
        })
    }

    // Render function that displays form to user -- remove submit input later for submit button component
    render() {
        return (
            <div>
                <h1> Create a New Task </h1>
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