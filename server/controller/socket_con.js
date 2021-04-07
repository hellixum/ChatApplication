module.exports = function(io){
    users_online = {}; 
    io.on('connection', (socket) => {

        socket.on('disconnect', () => {
            var userid = socket.userid; 
            delete users_online[userid]; 
    
            console.log(`${socket.userid} disconnected`);
            io.emit('dis', {users: Object.keys(users_online), single: socket.userid}); 
            console.log(Object.keys(users_online));
    
        });
    
        socket.on('chat message', (data) => {
            console.log(data);
            socket.to(users_online[data.reciever_id].id).emit('chat message', data);
        }); 
    
        socket.on('new', (data) => {
            if(data.userid in users_online)
                return;  
    
            console.log(`${data.userid} connected!!!!!!`); 
    
            socket.userid = data.userid;  
            users_online[socket.userid] = socket;
            
            io.emit('new', {users: Object.keys(users_online), single: socket.userid});
        })
    
    }); 
}