/*
  Rutas de Usuarios / Auth
  host + /api/auth
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { registerUser, loginUser, renewToken, } = require('../controllers/auth.controller');
const { fieldsValidator } = require('../middlewares/fields-validator');
const { jwtValidator } = require('../middlewares/jwt-validator');


const router = Router();


router.post(
  `/new`,
  [//Middleware
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password debe tener mas de 6 caracteres').isLength({ min: 6, }),
    fieldsValidator
  ],
  registerUser
);

router.post(
  `/`, 
  [
    check('email', 'El email es obligatorio').isEmail(), 
    check('password', 'El password debe tener mas de 6 caracteres').isLength({ min: 6, }),
    fieldsValidator
  ],
  loginUser,
);

router.get(`/renew`, jwtValidator, renewToken);




module.exports = router;