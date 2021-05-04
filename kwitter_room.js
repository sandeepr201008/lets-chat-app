var firebaseConfig = {
  apiKey: "AIzaSyBW6wtGykY2zq0nF7-NbiL23BdsglLnYlY",
  authDomain: "lets-chat-web-app-dffd6.firebaseapp.com",
  databaseURL: "https://lets-chat-web-app-dffd6-default-rtdb.firebaseio.com",
  projectId: "lets-chat-web-app-dffd6",
  storageBucket: "lets-chat-web-app-dffd6.appspot.com",
  messagingSenderId: "946176270517",
  appId: "1:946176270517:web:31625ea8f505e71d08defc",
  measurementId: "G-Y5C1N07M57"
};

firebase.initializeApp(firebaseConfig);

   function AddRoom()
  {
     room_name = document.getElementById("room_name").value;
     firebase.database().ref("/").child(room_name).update({ 
           purpose : "adding room name" 
     });
        localStorage.setItem("room_name", room_name);
        window.location = "kwitter_page.html";
  }
     
      function getData() 
      { firebase.database().ref("/").on('value',
       function(snapshot) { document.getElementById("output").innerHTML = "";
      snapshot.forEach(function(childSnapshot) { childKey = childSnapshot.key;
      Room_names = childKey; 
      console.log("Room Name - " + Room_names);
       row = "<div class='room_name' id="+Room_names+" onclick='redirectToRoomName(this.id)' >#"+ Room_names +"</div><hr>";
        document.getElementById("output").innerHTML += row;
      });
        }); 
      }

getData()

function redirectToRoomName(name)
{
     console.log(name);
     localStorage.setItem("room_name", name);
     window.location = "kwitter_page.html";
}

function logout()
{
     localStorage.removeItem("user_name");
     localStorage.removeItem("room_name");
     window.location = "index.html";
}
