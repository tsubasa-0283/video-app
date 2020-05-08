var firebaseConfig = {
  apiKey: "AIzaSyDVuLOlDwZW7Sk1feJ6e4K5mLWd8-P8oPg",
  authDomain: "video-app-7b7ab.firebaseapp.com",
  databaseURL: "https://video-app-7b7ab.firebaseio.com",
  projectId: "video-app-7b7ab",
  storageBucket: "video-app-7b7ab.appspot.com",
  messagingSenderId: "531182152628",
  appId: "1:531182152628:web:f543a14655efcad00520e1",
  measurementId: "G-P51H701XZT"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

const newPostRef = firebase.database();
let room = "room1";


const username = document.getElementById("username");
const output = document.getElementById("output")

//時間を取得する関数
function time() {
  var date = new Date();
  var hh = ("0"+date.getHours()).slice(-2);
  var min = ("0"+date.getMinutes()).slice(-2);
  var sec = ("0"+date.getSeconds()).slice(-2);

  var time = hh + ":" + min + ":" + sec;
  return time;
 }

//Msg受信処理
function text(){
  newPostRef.ref(room).on("child_added", function (data) {
    const v = data.val();
    const k = data.key;
    let str = "";
  
    str += '<div id="' + k + '" class="msg_main">'
    str += '<div class="msg_left">';
    str += '<div class=""><img src="img/icon_person.png" alt="" class="icon ' + v.username +
      '" width="30"></div>';
    str += '<div class="msg">';
    str += '<div class="name">' + v.username + '</div>';
    str += '<div class="text">' + v.text + '</div>';
    str += '</div>';
    str += '</div>';
    str += '<div class="msg_right">';
    str += '<div class="time">' + v.time + '</div>';
    str += '</div>';
    str += '</div>';
  
    output.innerHTML += str;

    //--------------- 追加 自動スクロール機能を追加 ---------------//
    $("#output").scrollTop( $("#output")[0].scrollHeight );
  
  });

}

const speech = new webkitSpeechRecognition();
speech.lang = 'ja-JP';

const join = document.getElementById('join');
const content = document.getElementById('content');
// const btn = document.getElementById('btn');

join.addEventListener('click', function () {

  //--------------- 追加 join. ---------------//
  room = document.getElementById('join-room').value;
  speech.start();

  //--------------- 追加 text() ---------------//
  text();
});

//--------------- 追加 endcall ---------------//
const endcall = document.getElementById('end-call')
endcall.addEventListener('click', function(){
location.reload();
})

speech.onresult = function(e) {
       speech.stop();
       if(e.results[0].isFinal){
          var autotext =  e.results[0][0].transcript
          console.log(e);
          console.log(autotext);
          newPostRef.ref(room).push({
            username: username.value,

            //----textをautotextに変更----//
            text: autotext,
            time: time()
          });
        }
}
   speech.onend = () => { 
      speech.start() 
   };