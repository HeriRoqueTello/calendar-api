/*
  Rutas de Eventos
  host + /api/events
*/

const { Router } = require('express');
const { check } = require('express-validator');

const { isDate } = require('../helpers/isDate');
const { deleteEvent, updateEvent, createEvent, getEvents } = require("../controllers/events.controller");
const { jwtValidator } = require('../middlewares/jwt-validator');
const { fieldsValidator } = require('../middlewares/fields-validator');

const router = Router();

router.use( jwtValidator );

router.get('/', getEvents);

router.post(
  '/', 
  [
    check('title', 'El titulo es requerido').not().isEmpty(),
    check('start', 'Fecha de inicio es requerido').custom(isDate),
    check('end', 'Fecha final es requerido').custom(isDate),
    fieldsValidator
  ],
  createEvent
);

router.put(
  '/:id',
  [
    check('title', 'El titulo es requerido').not().isEmpty(),
    check('start', 'Fecha de inicio es requerido').custom(isDate),
    check('end', 'Fecha final es requerido').custom(isDate),
    fieldsValidator
  ], 
  updateEvent
);

router.delete('/:id', deleteEvent);

module.exports = router;