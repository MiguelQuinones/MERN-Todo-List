// This file contains the schema being used for the Mongoose DB

// Creating constants to use Mongoose and create a schema
const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;

// Schema will hold types for task_description and so on
let Task = new Schema ({
    task_description: {
        type: String
    },
    task_priority: {
        type: String
    },
    task_completed: {
        type: Boolean
    }
});

// Export the schema to the project
module.exports = mongoose.model( 'Task', Task );