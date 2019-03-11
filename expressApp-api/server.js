const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const eventsRouter = require('./routes/events-routes');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cors());
app.use(morgan("dev"));

app.get('/api',(req,res)=> res.send("API working"));

app.use('/api/events', eventsRouter);

app.listen('8080',()=>console.log("api app listening to 8080 port"));