var firebaseConfig = {
    apiKey: "AIzaSyBW6wtGykY2zq0nF7-NbiL23BdsglLnYlY",
    authDomain: "lets-chat-web-app-dffd6.firebaseapp.com",
    databaseURL: "https://lets-chat-web-app-dffd6-default-rtdb.firebaseio.com",
    projectId: "lets-chat-web-app-dffd6",
    storageBucket: "lets-chat-web-app-dffd6.appspot.com",
    messagingSenderId: "946176270517",
    appId: "1:946176270517:web:31625ea8f505e71d08defc",
    measurementId: "G-Y5C1N07M57"
  }
  firebase.initializeApp(firebaseConfig);

  user_name = localStorage.getItem("user_name");
    room_name = localStorage.getItem("room_name")
    function send()
{
      msg = document.getElementById("msg").value;
      firebase.database().ref(room_name).push({
            name: user_name,
            message:msg,
            like:0
      });
      document.getElementById("msg").value = "";
}

function getData() { firebase.database().ref("/"+room_name).on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
      firebase_message_id = childKey;
      message_data = childData;
      console.log(firebase_message_id);
      console.log(message_data);
      name = message_data['name'];
      message = message_data['message'];
      like = message_data['like']
      name_with_tag = "<h4>"+name+"<img class = 'user_tick' src = 'tick.png'></h4>";
      message_with_tag = "<h4 class = 'message_h4'>"+ message + "</h4>";
      like_button = "<button class = 'btn btn-warning' id"+firebase_message_id+" value = "+like+" onclick = 'updateLike(this.id)'>";
      span_with_tag = "<span class = 'glyphicon gliphycon-thumbs-up'>Like:"+like+"</span></button></hr>";
      row = name_with_tag + message_with_tag + like_button + span_with_tag;
      document.getElementById("output").innerHTML+= row;
   } });  }); }
getData();

function updateLike(message_id)
{
   console.log("clicked on like button - " + message_id);
   button_id = message_id;
   likes = document.getElementById(button_id).value;
   updated_likes = Number(likes) + 1;
   console.log(update_likes);

   firebase.database().ref(room_name).child(message_id).update({
         like = updated_likes
   });
}

function logout()
{
   localStorage.removeItem("room_name");
   localStorage.removeItem("user_name");
   window.location.replace("index.html");
}