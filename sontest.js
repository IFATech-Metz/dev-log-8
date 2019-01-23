var audio = new Audio('orage.mp3');
function timeConverter(UNIX_timestamp){
    var a = new Date(UNIX_timestamp * 1000);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
    return time;
  }

function init(){
var date = timeConverter(1548064750);
document.getElementById("timestamp").innerHTML = date;
}

document.addEventListener("DOMContentLoaded", (event) => {
  var playPromise = audio.play();
  if (playPromise !== undefined) {
    playPromise.then(_ => {
    })
    .catch(error => {
    });
  }
});
