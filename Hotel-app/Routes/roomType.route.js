const express = require('express');
const Router = express.Router();

const {createRoomType, getRoomsType, getRoomsTypes } = require('../controllers/room-type.controller');



// Routes
Router.get('/:id', getRoomsType)
Router.get('/', getRoomsTypes);

//post
Router.post('/', createRoomType);




module.exports = Router; // Ensure Router is exported