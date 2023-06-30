import express from 'express'

const router = express.Router()

import { createHotel, updateHotel, deleteHotel, getHotel, getHotels, countByCity, countByType, getHotelRooms } from '../controllers/hotel.js';
import { verifyAdmin } from '../utils/verifyToken.js';

//Create
router.post('/', verifyAdmin,createHotel);
//Update
router.put('/:id',verifyAdmin, updateHotel);

//Delete
router.delete('/:id',verifyAdmin ,deleteHotel);


//Get
router.get('/find/:id', getHotel);

//Get All
router.get('/', getHotels);
router.get('/countByCity', countByCity);
router.get('/countByType', countByType);
router.get('/room/:id', getHotelRooms);
export default router