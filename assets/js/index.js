const queryString = window.location.search; 
console.log(queryString); 

const urlParams = new URLSearchParams(queryString); 
var username = urlParams.get('name'); 
console.log(username); 

var socket = io(); 
var online_Users = [];

socket.emit('new', {user: username}); 


$(document).on("submit", "form", function(e) {
    e.preventDefault();
    reciever = $(this).attr("name"); 
    var message = $(`input[name="${reciever}"`).val(); 

    if(message){
        console.log(username, message, reciever);
        $(`ul[name="${reciever}"]`).append(`<li class="me">${username} : ${message}</li>`);
        socket.emit('chat message', {sender: username, message, reciever});

        $(`input[name="${reciever}"`).val("");
    }
}) 


$(document).on("click", "li.online_data", function() {
    console.log("clicked");
    console.log($(this).attr("name"))
    var reciever = ($(this).attr("name"))

    $('ul[class="messages"]').hide(); 
    $(`ul[name="${reciever}"]`).show();

})

socket.on('chat message', function(data) {
    // console.log("chat message recieved "); 
    // console.log(data); 

    $(`ul[name="${data.sender}"]`).append(`<li class="other">${data.sender} : ${data.message}</li>`);
    $("#chatMenu").animate({ scrollTop: $("#chatMenu")[0].scrollHeight}, 1000); 
});



socket.on('new', function(data){ 
        var user = data.single;
        if(user !== username){
            online_Users.push(user); 
            console.log(online_Users);
            $("#userslist").append(`<li class="online_data" name="${user}">${user}</li>`);
            $("#chatMenu").prepend(
                `<ul class="messages" name="${user}" class="messages">
                    <h1>${user}</h1>
                    <form class="form" action="" name="${user}">
                        <input class="input" name="${user}" autocomplete="off" />
                        <button>Send</button>
                    </form>
                    </ul>`
            )
            $(`ul[name="${user}"]`).hide(); 

        }else{
            $('#userslist').empty(); 
            for(var i=0; i<data.users.length; i++){
            var user = data.users[i];
                if(user !== username){
                    online_Users.push(user); 
                    console.log(online_Users);
                    $("#userslist").append(`<li class="online_data" name="${user}">${user}</li>`);
                    $("#chatMenu").prepend(
                        `<ul class="messages" name="${user}" class="messages">
                            <h1>${user}</h1>
                            <form class="form" action="" name="${user}">
                                <input class="input" name="${user}" autocomplete="off" /><button>Send</button>
                            </form>
                            </ul>`
                    )
                    $(`ul[name="${user}"]`).hide(); 
                }
            }
        
        }
    console.log(data.single + "connected now !!!!");
    // if(data.single !== username){
    //     $("#chatMenu").prepend(`<ul id="${data.single}" class="messages"></ul>`)
    // }
})



socket.on('dis', function(data){

    online_users = online_Users.filter((val) => {
        return val != data.single; 
    })
    $(`li[name="${data.single}"]`).remove();
    $(`ul[name="${data.single}"]`).remove();
    // $(`#${data.single}`).remove();

})