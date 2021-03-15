/*
    Event Routes
    /api/events

*/



const {Router} = require('express');
const { getEvents, createEvent, updateEvent, removeEvent } = require('../controllers/events')
const { validateJWT } = require('../middlewares/validateJWT')
const { check } = require('express-validator')
const { fieldvalidator } = require('../middlewares/fieldValidators')
const { isDate } = require('../helpers/isDate')

const router = Router();

router.use( validateJWT );

//Every get request need a JWT validation
//Get events

router.get(
    '/',
    getEvents
 );

//create
router.post(
        '/',
        [
            check('title', 'Title is required').not().isEmpty(),
            check('start', 'Start date is required').custom( isDate ),
            check('end', 'End date is required').custom( isDate ),

            fieldvalidator,
        ],
    createEvent
)



//modify
router.put(
        '/:id',
        [
            check('title', 'Title is required').not().isEmpty(),
            check('start', 'Start date is required').custom( isDate ),
            check('end', 'End date is required').custom( isDate ),

            fieldvalidator,
        ],
    updateEvent);


//delete
router.delete('/:id', removeEvent)

module.exports = router