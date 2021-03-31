exports.homeRoute = (req, res) => {
    res.render('index');
}

exports.landingPage = (req, res) => {
    var name = req.query.name; 
    var email = req.query.email;
    res.render('landing', {name, email}); 
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