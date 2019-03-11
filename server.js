const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const request = require("request");
const session = require('express-session');//to store token n session

const app = express();

const data = require('./dummydata');
let appSession={};
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
app.use(session({
    secret:'pugnodeexpressmongo',
    resave:false,
    saveUninitialized:true
}))

 app.get('/',(req,res)=>{
     //res.sendFile(`${__dirname}/views/index.html`)  only for .html exptensions
     res.render("index",{
         title:"Event Makers",
         subTitle:"we are here to help you to organise Events"
     })
});
app.get('/login',(req,res)=>{
    //res.sendFile(`${__dirname}/views/index.html`)  only for .html exptensions
    res.render("login",{
        title:"Login"
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
    let options={
        url:'http://localhost:8080/api/events',
        headers:{
            "x-access-token":appSession.token,
        }
    }
    request.get(options,(err,response,body)=>{
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

app.post('/register',(req,res)=>{
    let options={
        method:"POST",
        body:req.body,
        json:true,
        url:'http://localhost:8080/api/events/insertEvent'
    }
    request.post(options,(err,response)=>{
        if(err){
            res.redirect('/newEvent');
        }
        res.redirect('/events');
    })
});
app.post('/userAuth',(req,res)=>{
    console.log(req.body)
    let body ={
        name:req.body.name,
        password:req.body.password
    }
    let options={
        method:"POST",
        form:body,
        headers:{
            "Content-Type":"application/x-www-form-urlencoded"
        },
        url:'http://localhost:8080/userAuth'
    }
    request.post(options,(err,response,body)=>{

        if(err){
            res.redirect('/login');
        }
        console.log(body)
        appSession= req.session;
        appSession.token = JSON.parse(body).token;
        res.redirect('/home');
    })
})
app.listen(3300,()=> console.log("app listening on port 3300"));