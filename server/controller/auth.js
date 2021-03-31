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
        // console.log("acces token2 = "+process.env.ACCESS_TOKEN_SECRET);
        let payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        next(); 
    }catch(e){
        console.log("sahi sahi password daal bhadwe");
        res.cookie("jwt", "", {secure: true, httpOnly: true})
        res.redirect('/'); 
    }

}