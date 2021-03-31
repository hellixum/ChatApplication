module.exports = function(io){
    users_online = {}; 
    io.on('connection', (socket) => {

        socket.on('disconnect', () => {
            var name = socket.name; 
            delete users_online[name]; 
    
            console.log(`${socket.name} disconnected`);
            io.emit('dis', {users: Object.keys(users_online), single: socket.name}); 
            console.log(Object.keys(users_online));
    
        });
    
        socket.on('timeout', function(){
            console.log("Timeout HO gaya")
        })
    
        socket.on('chat message', (data) => {
            console.log(data);
            socket.to(users_online[data.reciever].id).emit('chat message', data);
        }); 
    
        socket.on('new', (data) => {
            if(data.user in users_online)
                return;  
    
            console.log(`${data.user} connected!!!!!!`); 
    
            socket.name = data.user;  
            users_online[socket.name] = socket;
            
            io.emit('new', {users: Object.keys(users_online), single: socket.name});
        })
    
    }); 
}