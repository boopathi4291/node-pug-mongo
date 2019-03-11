const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const eventsRouter = require('./routes/events-routes');
const config = require('./config');
const jwt = require('jsonwebtoken');
const mongojs = require("mongojs");
const db = mongojs('eventMakers',["users"]);
const middleware = require('./middleware');
const app = express();

app.set("secretToken",config.secretKey)

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cors());
app.use(morgan("dev"));

app.post('/userAuth',(req,res)=>{
    console.log(req.body)
    db.users.findOne({name:req.body.name},(err,user)=>{
        if(user == null){
            res.json({success:false,
                message:"invalid Username"});
        }else{
        if(user.password != req.body.password){
            res.json({success:false,
                message:"invalid password"});
        }
        else{
            let token = jwt.sign(user,
                app.get("secretToken"),
            {
                expiresIn: 2222
            })
            res.json({success:true,
                message:"success",
                token});
        }
    }
    })
});

app.get('/api',(req,res)=> res.send("API working"));

app.use('/api/events',middleware.checkToken, eventsRouter);

app.listen('8080',()=>console.log("api app listening to 8080 port"));