const express = require('express'); 
const dotenv = require('dotenv'); 
const morgan = require('morgan'); 
const path = require('path'); 
const cookieParser = require('cookie-parser'); 

const connectDB = require('./server/database/connection'); 

const app = express(); 
const http = require('http').Server(app); 
const io = require('socket.io')(http); 

dotenv.config({path: 'config.env'})
const PORT = process.env.PORT || 8080

app.use(morgan('tiny')); 

connectDB(); 

app.use(express.urlencoded({extended: true})); 
app.use(express.json()); 
app.use(cookieParser()); 

app.set("view engine", "ejs"); 

app.use('/css', express.static(path.resolve(__dirname, "assets/css")))
app.use('/js', express.static(path.resolve(__dirname, "assets/js")))


app.use('/', require('./server/routes/router'))

const socket_con = require('./server/controller/socket_con')(io); 

http.listen(PORT, ()=> { 
    console.log(`Server is running on http://localhost:${PORT}`)
});