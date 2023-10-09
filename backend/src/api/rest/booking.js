import express     from 'express'

import controllers from '../../controllers/index.js'


const router = express.Router()

// booking
router.post('/create', controllers.booking.create);
router.get('/list', controllers.booking.list);
router.post('/delete', controllers.booking.delete);


export default router
