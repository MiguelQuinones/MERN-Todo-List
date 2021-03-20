// Creating constants to utilize the backend dependencies
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const router = express.Router();
const port = 4000;

let Task = require('./todo.model');

// Implementing the cors and body-parser dependencies
app.use( cors() );
app.use( bodyParser.json() );

// Establishing connection to the Mongoose DB
mongoose.connect('mongodb://127.0.0.1:27017/tododb', { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
})

// Express routing middleware for every GET request made to router 
// if an error occurs, logs it; otherwise, return JSON response of all tasks in list
router.get( '/', ( req, res, next ) => {
    Task.find( ( error, tasks ) => {
        if ( error ) {
            console.log( error );
        } else {
            res.json( tasks );
        }
    });
});

// Routing for id path used to retrieve a task with the requested id
// If no such task exists, return an error message to the user
router.get( '/:id', ( req, res, next ) => {
    let id = req.params.id;
    Task.findById(id, ( error, task ) => {
        if( error ) {
            console.log( error )
        } else {
            res.json( task );
        }
    });
});

// Routing for update path -- when a user wants to update a task already on the list
// If the task they want to update is not there, return error message
// Else, update that task with the new input from the user
router.post( '/update/:id', ( req, res, next ) => {
    Task.findById( req.params.id, ( error, task ) => {
        if ( !task )
            res.status(404).send("Task could not be found.");
        else
            task.task_description = req.body.task_description;
            task.task_priority = req.body.task_priority;
            task.task_completed = req.body.task_completed;

            task.save().then( task => {
                res.json( 'Task updated.' );
            })
            .catch( error => {
                res.status( 400 ).send( "Update not possible." );
            });
    });
});

// Routing for add path -- when a user adds a new task to the list
router.post( '/add', ( req, res, next ) => {
    let task = new Task( req.body );
    task.save().then( task => {
        res.status( 200 ).json( {'Task': 'Task added successfully'} );
    }).catch( error => {
        res.status( 400 ).send( "Task could not be added to list." );
    });
});

// Routing for delete path -- when a user deletes a task from the list
// router.delete( '/remove/:id', ( req, res, next ) => {
//     Task.findById( req.params.id, ( error, task ) => {
//         if( !task ) {
//             res.status( 400 ).send( "Task could not be found");
//         } else {
//             task.save().then( task => {
//                 res.json( "Task successfully removed." );
//             })
//             .catch( error => {
//                 res.status( 400 ).send( "Task could not be removed." );
//             });
//         }
//     });
// });

// Mounting the router to the application
app.use( '/tododb', router );

// Backend server using port 4000
app.listen( port, () => {
    console.log( "Server is running on Port: " + port );
});