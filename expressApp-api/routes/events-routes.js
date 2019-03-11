const express = require("express");
const router = express.Router();

const eventsDal = require("./../dals/events");

router.get("/",(req,res)=>{
    let promise = eventsDal.getAllEvents();
    promise.then((data)=>res.json(data),(err)=>res.json(err)); 
});
router.get("/:id",(req,res)=>{
    let promise = eventsDal.getSingleEvent(req.params.id);
    promise.then((data)=>res.json(data),(err)=>res.json(err)); 
});
router.post("/insertEvent",(req,res)=>{
    let promise = eventsDal.insertNewEvent(req.body);
    promise.then((data)=>res.json(data),(err)=>res.json(err)); 
});


module.exports = router;