const express = require('express');
require('dotenv').config();
const { dbConnection } = require('./db/config');
const cors = require('cors');

//Create express server
const app = express();

//DB
dbConnection();


//Cors

app.use(cors())


//Public directory

app.use( express.static('public') );

//Lecture and parse

app.use( express.json() );


//Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));


//CRUD events



//Listen requests
app.listen( process.env.PORT, () => {
    console.log(`Server running in port ${ process.env.PORT }`);
})