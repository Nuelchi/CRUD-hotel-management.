const express = require('express');
const Router = express.Router();

const {getRoom, getRooms, createRoom, updateRoom, deleteRoom} = require('../controllers/room-controllers')



// Define routes
//Get
Router.get('/', getRooms);
Router.get('/:id', getRoom);

//post
Router.post('/', createRoom);

//update
Router.patch('/:id', updateRoom);

//delete
Router.delete('/:id', deleteRoom)

module.exports = Router; // Ensure Router is exported