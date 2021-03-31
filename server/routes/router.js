const express = require('express'); 
const route = express.Router(); 

const services = require('../services/render');
const controller = require('../controller/controller'); 
const auth = require('../controller/auth'); 

route.get('/', services.homeRoute); 
route.get('/login', services.loginPage); 
route.get('/signup', services.signupPage); 
route.get('/landing',auth.auth, services.landingPage); 



route.post('/api/signup', controller.signup)
route.post('/api/login', controller.login)

module.exports = route;