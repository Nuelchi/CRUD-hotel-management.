const express = require('express');
const Router = express.Router();
const {createUser, loginUser, resetPassword} = require('../controllers/user-controllers');

Router.post('/signup', createUser);
Router.post('/login', loginUser);
Router.put('/:id', resetPassword)




module.exports = Router;