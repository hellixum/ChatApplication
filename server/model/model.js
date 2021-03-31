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
    }
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

const User_data = mongoose.model('user_data', schema); 

module.exports = User_data; 