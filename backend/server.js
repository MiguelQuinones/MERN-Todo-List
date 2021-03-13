// Creating constants to utilize the backend dependencies
const express = require( 'express' );
const app = express();
const port = 4000;
const bodyParser = require( 'body-parser' );
const cors = require( 'cors' );

app.listen( port, () => {
    console.log( "Server is running on port: " + port );
})