const { response } = require("express");
const Event = require('../models/event');

const getEvents = async(req, res = response) => {

  const events = await Event.find().populate('user', 'name');

  res.json({
    ok: true,
    events
  })
};

const createEvent = async(req, res = response) => {

  const event = new Event(req.body);
  try {

    event.user = req.uid
    
    const saveEvent =  await event.save();

    res.json({
      ok: true,
      event: saveEvent
    })

  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Contacte a un administrador'
    })
  }
};

const updateEvent = async(req, res = response) => {

  const eventId = req.params.id;
  const uid = req.uid;


  const event = await Event.findById(eventId)

  try {
    if (!event) {
      return res.status(404).json({
        ok: false,
        msg: 'Evento no existe con ese id'
      })
    }
  
    if ( event.user.toString() != uid) {
      return res.status(401).json({
        ok: false,
        msg: 'No tiene priviligios de editar este evento'
      })
    }

    const newEvent = {
      ...req.body,
      user: uid
    }

    const eventUpdated = await Event.deleteOne(eventId, newEvent, { new: true });

    res.json({
      ok: true,
      event: eventUpdated
    })

  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Contacte a un administrador'
    })
  }
};

const deleteEvent = async(req, res = response) => {
  const eventId = req.params.id;
  const uid = req.uid;


  const event = await Event.findById(eventId)

  try {
    if (!event) {
      return res.status(404).json({
        ok: false,
        msg: 'Evento no existe con ese id'
      })
    }
  
    if ( event.user.toString() != uid) {
      return res.status(401).json({
        ok: false,
        msg: 'No tiene priviligios de eliminar este evento'
      })
    }

    // await event.deleteOne();

    await Event.findByIdAndDelete(eventId);

    res.json({
      ok: true,
    })

  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Contacte a un administrador'
    })
  }
};

module.exports = {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
}