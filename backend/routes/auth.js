/* 
    Auth routes
    Host + /api/auth

*/


const {Router} = require('express');
const { check } = require('express-validator');
const { fieldvalidator } = require('../middlewares/fieldValidators')
const router = Router();

const { createUser, loginUser, renewToken } = require('../controllers/auth')
const {validateJWT} = require('../middlewares/validateJWT')
router.post(
        '/', 
        [
            check('email', 'Email is not correct').isEmail(),
            check('password', 'Password should have at leat 6 characters').isLength({ min:6 }),
            fieldvalidator
        ],
        loginUser
);

router.post(
        '/new',
        [
            check('name', 'Name is required').not().isEmpty(),
            check('email', 'Email is not correct').isEmail(),
            check('password', 'Password should have at leat 6 characters').isLength({ min:6 }),
            fieldvalidator

        ], 
        createUser
        );

router.get(
        '/renew',
        validateJWT, 
        renewToken
        );




module.exports = router;