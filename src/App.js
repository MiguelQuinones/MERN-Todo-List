// Landing page

// Import necessary components for linking, routing, etc.
import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import createTask from "./components/createTask";
import editTask from "./components/editTask";
import deleteTask from "./components/deleteTask"
import todoList from "./components/todoList";
import logo from "./list-task.svg";

class App extends Component {
  render() {
    return (
      <Router>
        <div className = "container" >
          <nav className = "navbar navbar-expand-lg navbar-light bg-light" >
          <img src = { logo } alt = "Logo" />
            <Link to = "/" className = "navbar-brand"> MERN Stack List </Link>
            <div className = "navbar-collapse">
              <ul className = "nav nav-tabs">
                <li className = "nav-item">
                  <Link to = "/" className = "nav-link" aria-current = "page"> Todo List </Link>
                </li>
                <li className = "nav-item">
                  <Link to = "/create" className = "nav-link"> Create Task</Link>
                </li>
              </ul>
            </div>
          </nav>
          <br />
          <Route path = "/" exact component = { todoList } />
          <Route path = "/edit/:id" component = { editTask } />
          <Route path = "/create" component = { createTask } />
          <Route path = "/delete/:id" component = { deleteTask } />
        </div>
      </Router>
    );
  }
}

export default App;
