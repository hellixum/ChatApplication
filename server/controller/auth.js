const jwt = require('jsonwebtoken'); 

exports.auth = (req, res, next) => {
    var token = req.cookies.jwt;
    console.log("token = "+ token); 
    console.log("Ab hoga Authorization"); 

    if(!token){
        console.log("Login to kar !!!!");
        res.redirect('/'); 
        return ;
    }

    try{
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
            if(err) {
                console.log("sahi sahi password daal bhadwe");
                console.log(err);
                res.cookie("jwt", "", {secure: true, httpOnly: true})
                res.redirect('/');
                return;
            }
            req.payload = payload;
            next();
        })
        
    }catch(e){
        console.log("sahi sahi password daal bhadwe");
        res.cookie("jwt", "", {secure: true, httpOnly: true})
        res.redirect('/'); 
    }

}