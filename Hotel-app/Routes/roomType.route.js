const express = require('express');
const Router = express.Router();

const {createRoomType, getRoomsType, getRoomsTypes } = require('../controllers/room-type.controller');
const protection = require('../controllers/user-controllers');

// Routes
Router.get('/:id', getRoomsType)
Router.get('/', getRoomsTypes);

//post
Router.post('/',protection.protectPath, protection.restriction('admin'),createRoomType);




module.exports = Router; // Ensure Router is exported