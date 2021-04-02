exports.homeRoute = (req, res) => {
    res.render('index');
}

exports.landingPage = (req, res) => {
    var name = req.payload.name; 
    res.render('landing', {name}); 
}

exports.loginPage = (req, res) => {
    var token = req.cookies.jwt; 
    console.log("LoginPage hit hua hai!!!"); 
    console.log(token);
    if(token){
        res.redirect('/landing'); 
        return; 
    }
    
    res.render('login'); 
}

exports.signupPage = (req, res) => {
    res.render('signup'); 
}