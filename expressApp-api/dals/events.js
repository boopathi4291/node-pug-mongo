const mongojs = require("mongojs");
const db = mongojs('eventMakers',["events"]);

class EventsDal{
    constructor(){

    }
    getAllEvents(){
        return new Promise((resolve,reject)=>{
            db.events.find((err,data)=>{
                if(err){
                    reject(err) ;
                }
                resolve(data);
            })
        });
    }
    getSingleEvent(id){
        return new Promise((resolve,reject)=>{
            db.events.findOne({eventId:Number.parseInt(id)},(err,data)=>{
                if(err){
                    reject(err);
                }
                resolve(data);
            });
        });
    }
    insertNewEvent(event){
        let newEvent={
            ...event,
            eventId:Number.parseInt(event.eventId),
            fees:Number.parseInt(event.fees),
            seatsFilled:Number.parseInt(event.seatsFilled)
        }
        return new Promise((resolve,reject)=>{
            db.events.insert(newEvent,(err,data)=>{
                if(err){
                    reject(err);
                }
                resolve(data);
            });
        });
    }
}

module.exports = new EventsDal();