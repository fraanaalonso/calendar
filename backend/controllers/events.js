const { response } = require('express');
const Event = require('../models/Event');

const getEvents = async(req, resp = response) => {
    
    const events = await Event.find()
                            .populate('user', 'name');

    
    resp.json({
        ok: true,
        events
    })
}

const createEvent = async(req, resp = response) => {
    
    const event = new Event( req.body );

    try{
        event.user= req.uuid;
        const savedEvent = await event.save();
        resp.json({
            ok: true,
            event: savedEvent
        })
    }catch(error){
        resp.status(500).json({
            ok: false,
            msg: 'Contact the administrator'
        })
    }
    
}

const updateEvent = async(req, resp = response) => {
    
    const eventID = req.params.id;
    const uuid = req.uuid;
    try{
        const event = await Event.findById(eventID);
     
        if( !event ){
            return resp.status(404).json({
                ok: false,
                msg: 'Event does not exist'
            });
        }
        
        if( event.user.toString() !== uuid){
            return resp.status(401).json({
                ok: false,
                msg: 'You are not allowed'
            });
        }

        const newEvent = {
            ...req.body,
            user: uuid
        }

        const modifiedEvent = await Event.findByIdAndUpdate( eventID, newEvent, {new: true} );

        resp.json({
            ok: true,
            event: modifiedEvent
        })
    }catch( error ){
        console.log( error );
        resp.status(500).json({
            ok: false,
            msg: 'Contact the administrator'
        })
    }
    
    
}

const removeEvent = async(req, resp = response) => {
    const eventID = req.params.id;
    const uuid = req.uuid;
    try{
        const event = await Event.findById(eventID);
     
        if( !event ){
            return resp.status(404).json({
                ok: false,
                msg: 'Event does not exist'
            });
        }
        
        if( event.user.toString() !== uuid){
            return resp.status(401).json({
                ok: false,
                msg: 'You are not allowed'
            });
        }

        const deletedEvent = await Event.findByIdAndDelete( eventID, {filter: true} );

        resp.json({
            ok: true,
            event: deletedEvent
        })
    }catch( error ){
        console.log( error );
        resp.status(500).json({
            ok: false,
            msg: 'Contact the administrator'
        })
    }
    
    
}

module.exports = {
    getEvents,
    createEvent,
    updateEvent,
    removeEvent
}



