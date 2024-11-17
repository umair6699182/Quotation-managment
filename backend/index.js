
// Importing Files 

import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import bodyParser from 'body-parser';
import Connection from './database/Connection.js';
import Router from './routes/Route.js';
import path from 'path'


// Initlizing Files

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'frontend', 'dist')));
app.use(bodyParser.json({extended : true}));
app.use(bodyParser.urlencoded({extended : true}))
dotenv.config();
app.use('/' , Router);



// Env Files And Listen Ports

const port = process.env.PORT
app.listen(port , ()=>{
    console.log(`App is Running On ${port} Ports`)
})


// Important Function 

Connection();
