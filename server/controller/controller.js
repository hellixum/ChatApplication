var User_data = require('../model/model'); 
const bcrypt = require('bcrypt'); 
const url = require('url');
const jwt = require('jsonwebtoken');

exports.signup = (req, res) => {
    if(!req.body){
        res.status(400).send({message: "Content cannot be empty"}); 
        return; 
    }

    const user = new User_data({
        name: req.body.name, 
        email: req.body.email,
        password: req.body.password 
    })

    user
        .save(user)
        .then(data => {
            res.redirect('/login');  
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occured while creating a create operation"
            })
        })
}

exports.login = (req, res) => {

    if(!req.body){
        res.status(400).send({message: "Enter name and password"}); 
        return; 
    }

    const name = req.body.name; 
    const password = req.body.password; 

    User_data.findOne({name : name})
        .then(user => {
            if(!user){
                res.status(404).send({message: "Not found user with name="+name})
            }else{
                console.log(user);
                bcrypt.compare(password, user.password, (err, result) => {
                    if(result){

                        var payload = {
                            name: user.name, 
                        }

                        // console.log("acces token1 = "+process.env.ACCESS_TOKEN_SECRET);
                        let accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
                            expiresIn: process.env.ACCESS_TOKEN_LIFE
                        })

                        res.cookie("jwt", accessToken, {secure: true, httpOnly: true}); 
                        res.redirect(url.format({
                            pathname: "/landing", 
                            query: {
                                name : user.name,  
                                email : user.email
                            }
                        }));
                    }else {
                        res.redirect('/');
                    }
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "No username found with given user"
            })
        })
}