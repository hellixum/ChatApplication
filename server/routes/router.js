const express = require('express'); 
const route = express.Router(); 

const services = require('../services/render');
const controller = require('../controller/controller'); 
const auth = require('../controller/auth'); 


const fileUpload = require('../services/fileUpload'); 


route.get('/', services.homeRoute); 
route.get('/login', services.loginPage); 
route.get('/signup', services.signupPage); 
route.get('/landing',auth.auth, services.landingPage); 

    
route.post('/api/signup', fileUpload.upload.single('image'), controller.signup)
route.post('/api/login', controller.login)
route.get('/api/logout', controller.logout)
route.post('/api/addFriend', controller.addFriend)
module.exports = route;