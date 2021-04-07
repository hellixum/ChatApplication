var User_data = require('../model/model'); 

exports.homeRoute = (req, res) => {
    res.render('index');
}

exports.landingPage = (req, res) => {
    var id = req.payload.id;
    User_data.findById(id)
        .then( user => {
            if(!user){
                res.status(404).send({message: "Not found user with id="+id})
            }else{
                // console.log(JSON.stringify(user.friends)); 
                res.cookie("friends", JSON.stringify(user.friends), {secure: true, httpOnly: false}); 
                res.render('landing', {user}); 
            }
        })
        .catch( err => {
            res.status(500).send({
                message: err.message || "No username found with given id"
            })
        })

    // res.render('landing', {name}); 
}

exports.loginPage = (req, res) => {
    var token = req.cookies.jwt; 
    // console.log("LoginPage hit hua hai!!!"); 
    // console.log(token);
    if(token){
        res.redirect('/landing'); 
        return; 
    }
    
    res.render('login'); 
}

exports.signupPage = (req, res) => {
    res.render('signup'); 
}