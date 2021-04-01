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

// Enums for light/dark theme
const LIGHT_THEME_HEX = "#E2E8F0";
const DARK_THEME_HEX = "#1A202C";
const THEMES = {
  Light: LIGHT_THEME_HEX,
  Dark: DARK_THEME_HEX
};

const THEME_KEY = "THEME";

class App extends Component {

  // Saves chosen theme to web storage to persist across pages
  saveSettings( value ) {
    window.localStorage.setItem( THEME_KEY, value );
  }

  // Retrieve saved theme from web storage -- if no theme has been saved yet, default to light theme
  getSettings() {
    return window.localStorage.getItem( THEME_KEY ) ?? THEMES.Light;
  }

  // Changes theme depending on which one user wants to use
  themeSwitch( theme ) {
    document.body.style.backgroundColor = theme;
    document.body.style.color = theme === THEMES.Dark ? THEMES.Light : THEMES.Dark;
    this.saveSettings( theme );
    // Change theme of table to match -- if table exists on page, performs the changes
    var tableSwitch = document.getElementById( "table" );
    if( tableSwitch ) {
      if( theme === THEMES.Dark ) {
        tableSwitch.className = "table table-striped table-bordered table-hover table-dark"
      } else if( theme === THEMES.Light ) {
        tableSwitch.className = "table table-striped table-bordered table-hover"
      }
    }
    // Change theme of navbar to match
    var navbar = document.getElementById( "navbar" );
    if( theme === THEMES.Dark ) {
      navbar.className = "navbar navbar-expand-lg navbar-dark bg-dark"
    } else if( theme === THEMES.Light ) {
      navbar.className = "navbar navbar-expand-lg navbar-light bg-light"
    }
  }

  render() {
    return (
      <Router>
        <div className = "container" >
          <nav id = "navbar" className = "navbar navbar-expand-lg navbar-light bg-light" >
          <img src = { logo } alt = "Logo" />
            <Link to = "/" className = "navbar-brand"> </Link>
            <div className = "navbar-collapse">
              <ul className = "nav nav-tabs">
                <li className = "nav-item">
                  <Link to = "/" className = "nav-link" aria-current = "page"> Task List </Link>
                </li>
                <li className = "nav-item">
                  <Link to = "/create" className = "nav-link"> Create Task</Link>
                </li>
                <div className = "nav-item ml-auto">
                  <div className = "button-holder">
                    <div className = "theme-dark" onClick = { () => this.themeSwitch( THEMES.Dark ) } > </div>
                    <div className = "theme-light" onClick = { () => this.themeSwitch( THEMES.Light ) } > </div>
                  </div>
                </div>
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
