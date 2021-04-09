var User_data = require('../model/model'); 

exports.homeRoute = (req, res) => {
    res.render('index');
}

exports.landingPage = (req, res) => {
    var id = req.payload.id;
    User_data.findById(id)
        .populate({
            path: 'friends', 
            populate: {
                path: 'user'
            }
        })
        .then( data => {
            if(!data){
                res.status(404).send({message: "Not found user with id="+id})
            }else{
                var friends =[]; 
                for(var i = 0; i<data.friends.length; i++){
                    var obj = {id: data.friends[i].user._id, name: data.friends[i].user.name}; 
                    friends.push(obj);
                }
                res.cookie("friends", JSON.stringify(friends), {secure: true, httpOnly: false}); 
                res.render('landing', {user: data}); 
            }
        })
        .catch( err => {
            res.status(500).send({
                message: err.message || "No username found with given id"
            })
        })
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