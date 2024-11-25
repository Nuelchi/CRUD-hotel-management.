const express = require('express');
const Router = express.Router();
const {createUser, loginUser} = require('../controllers/user-controllers')

Router.post('/signup', createUser);
Router.post('/login', loginUser);




module.exports = Router;