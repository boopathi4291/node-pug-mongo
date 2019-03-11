const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const request = require("request");

const app = express();

const data = require('./dummydata');
/**
 * configure the template engine
 */
app.set("views", './views');
app.set('view engine', 'pug');
/**
 * configure the body parsers for the app
 */

app.use(morgan("dev")); // logging in the development mode
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(`${__dirname}/public`));



/**
 * router navigation configuration
 */

 app.get('/',(req,res)=>{
     //res.sendFile(`${__dirname}/views/index.html`)  only for .html exptensions
     res.render("index",{
         title:"Event Makers",
         subTitle:"we are here to help you to organise Events"
     })
});

app.get('/home',(req,res)=>{
    //res.sendFile(`${__dirname}/views/index.html`)  only for .html exptensions
    res.render("home",{
        title:"Event Makers",
        subTitle:"we are here to help you to organise Events"
    })
});
app.get('/events',(req,res)=>{
    //res.sendFile(`${__dirname}/views/index.html`)  only for .html exptensions
    request.get('http://localhost:8080/api/events',(err,response,body)=>{
        res.render("events",{
            title:"Upcoming Events",
            events:JSON.parse(body)
        })
    })
    
});
app.get('/events/:id',(req,res)=>{
    //res.sendFile(`${__dirname}/views/index.html`)  only for .html exptensions
    request.get('http://localhost:8080/api/events/'+req.params.id,(err,response,body)=>{
        console.log(body)
        res.render("event",{
            title:" Event Details of ",
            event:JSON.parse(body)
        })
    })
    
});

app.get('/newEvent',(req,res)=>{
    //res.sendFile(`${__dirname}/views/index.html`)  only for .html exptensions
    res.render('newEvent',{
        title:"Create New Event",
        subTitle:"we are here to help you to organise Events"
    })
});
app.listen(3300,()=> console.log("app listening on port 3300"));