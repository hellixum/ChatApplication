const mongoose = require('mongoose');
const bcrypt = require('bcrypt');  

var schema = new mongoose.Schema({
    name : {
        type: String, 
        required: true,
        unique: true
    }, 
    email: {
        type: String, 
        required: true
    }, 
    password: {
        type: String, 
        required: true
    }, 
    img : {
        data: Buffer, 
        contentType: String
    }, 
    friends : [{
        type: mongoose.Schema.ObjectId, ref: 'User_data'
    }]  
})

schema.pre('save', async function(next){
    try{
        const salt = await bcrypt.genSalt(10); 
        const hashedPassword = await bcrypt.hash(this.password, salt); 
        this.password = hashedPassword; 
        next(); 
    }catch(err){
        next(err); 
    }
})

// var friend_schema = mongoose.Schema({
//     user: {
//         type : mongoose.Schema.Types.ObjectId, 
//         ref : 'User_data',  
//     }
// })

const User_data = mongoose.model('User_data', schema); 
// const Friends = mongoose.model('friends', friend_schema); 

module.exports = User_data; 