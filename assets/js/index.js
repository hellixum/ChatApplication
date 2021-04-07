var userid = $("#uid").text(); 
$("#uid").hide();
var username = $("#uname").text(); 
$("#uname").hide(); 

console.log(userid);
console.log("name = "+ username); 

var socket = io(); 
var friends_status = []; 
var friend_name = []; 

allcookie = decodeURIComponent(document.cookie);
friends = JSON.parse(allcookie.substring(8));
console.log('cookies are');
console.log(allcookie);
for(var i = 0; i < friends.length ; i++){
    friends_status[friends[i].id] = ['Offline'];  
    friend_name[friends[i].id] = friends[i].name; 
}

socket.emit('new', {userid: userid}); 
$(".messages").hide();


$(document).on("submit", ".form", function(e) {
    e.preventDefault();
    reciever_id = $(this).attr("uid"); 
    var message = $(`input[uid="${reciever_id}"`).val(); 

    if(message){
        console.log(username, message, friend_name[reciever_id]);
        $(`ul[uid="${reciever_id}"]`).append(`<li class="me"><strong>${username}</strong> : ${message}</li>`);
        socket.emit('chat message', {sender_id: userid, message, reciever_id});

        $(`input[uid="${reciever_id}"`).val("");
    }
}) 


$(document).on("click", "li.online_data", function() {
    console.log("clicked");
    console.log($(this).attr("uid"))
    var user_id = ($(this).attr("uid"))

    $('.messages').hide(); 
    $(`ul[uid="${user_id}"]`).show();

})

socket.on('chat message', function(data) {
    console.log("chat message recieved "); 
    console.log(data); 

    $(`ul[uid="${data.sender_id}"]`).append(`<li class="other"><strong>${friend_name[data.sender_id]}</strong> : ${data.message}</li>`);
    $("#chatMenu").animate({ scrollTop: $("#chatMenu")[0].scrollHeight}, 1000); 
});



socket.on('new', function(data){ 
        var user = data.single;
        for(var i=0; i<data.users.length; i++){
            if(data.users[i] == userid)
                continue;
            var uid = data.users[i];
            friends_status[uid] = 'Online'; 
            $(`li[uid="${uid}"] p`).text('Online')
        }
})



socket.on('dis', function(data){

    if(data.single in friends_status){
        friends_status[data.single] = 'Offline'; 
        $(`li[uid="${uid}"] p`).text('Online')
    }
    // $(`li[uid="${data.single}"]`).remove();
    // $(`ul[uid="${data.single}"]`).remove();
    // $(`#${data.single}`).remove();

})