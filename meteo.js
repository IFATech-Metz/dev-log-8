var xhr = new XMLHttpRequest();
var audio = new Audio('default.mp3');

// Forme générale du lien :
// http://api.openweathermap.org/data/2.5/weather?q=Metz&3c084bd74c2f77f02d6d6c30c2018bf0

var base_url = "http://api.openweathermap.org/data/2.5/weather";
var city = "Metz";
var units = "metric";
var appid = "621266adac915fdb1f3b829394fd097d";
var date ;

function get_url() {
    return base_url + "?"
        + "q=" + city + "&"
        + "units=" + units + "&"
        + "appid=" + appid;
}

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

function init_page() {
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("url").innerHTML = get_url();

            var response = JSON.parse(this.responseText);
            var temperature = response.main.temp;

            var icon = response.weather[0].icon;
            var src = "http://openweathermap.org/img/w/" + icon + ".png";

            document.getElementById("meteo").innerHTML = temperature;
            document.getElementById("icon").src = src;
        }
    };
    
    xhr.open("GET", get_url(), true);
    xhr.send();
}

function get_temperature() {
    city = document.getElementById("ville").value;
    audio.pause();
    audio.currentTime = 0;

    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("url").innerHTML = get_url();

            if(document.getElementById("url_visibility").checked) {
                document.getElementById("url").style.display = "block";
            }
            else {
                document.getElementById("url").style.display = "none";
            }

            var response = JSON.parse(this.responseText);
            var temperature = response.main.temp;
            var cit = response.name;
            var country = response.sys.country;
            var dt = response.dt;
            var date = timeConverter(dt);
            var icon = response.weather[0].icon;
            var main = response.weather[0].main;
            
            switch (main){
                case "Rain" :
                    var elem = document.getElementById("main-image");
                    elem.style.backgroundImage = "url('images/rain.jpg')";
                    audio = new Audio('pluieforte.mp3');
                    audio.play();
                    break;
                case "Clouds" :
                    var elem = document.getElementById("main-image");
                    elem.style.backgroundImage = "url('images/cloud.jpg')";
                    audio = new Audio('nuageux.mp3');
                    audio.play();
                    break;
                case "Thunderstorm" :
                    var elem = document.getElementById("main-image");
                    elem.style.backgroundImage = "url('images/thunderstorm.jpg')";
                    audio = new Audio('orage.mp3');
                    audio.play();
                    break;
                case "Clear" :
                    var elem = document.getElementById("main-image");
                    elem.style.backgroundImage = "url('images/clear.jpg')";
                    audio = new Audio('ensoleille.mp3');
                    audio.play();
                    break;
                case "Atmosphere" :
                    var elem = document.getElementById("main-image");
                    elem.style.backgroundImage = "url('koa.jpg')";
                    audio = new Audio('atmosphere.mp3');
                    audio.play();
                    break;
                case "Snow":
                    var elem = document.getElementById("main-image");
                    elem.style.backgroundImage = "url('images/snow.jpg')";
                    audio = new Audio('neige.mp3');
                    audio.play();
                    break;
                case "Drizzle":
                    var elem = document.getElementById("main-image");
                    elem.style.backgroundImage = "url('images/drizzle.jpg')";
                    audio = new Audio('pluie.mp3');
                    audio.play();
                    break;
                default :
                    var elem = document.getElementById("main-image");
                    elem.style.backgroundImage = "url('images/defaut.jpg')";
                    audio = new Audio('default.mp3');
                    audio.play();
                    /*Ensoleillé*/


            }
            var src = "http://openweathermap.org/img/w/" + icon + ".png";
            
            document.getElementById("meteo").innerHTML = temperature;
            document.getElementById("cit").innerHTML = cit;
            document.getElementById("cit").innerHTML += ", " + country;
            document.getElementById("date").innerHTML = date;
            document.getElementById("icon").src = src;
            document.getElementById("ma").innerHTML = main;
            
        }
    };
    
    xhr.open("GET", get_url(), true);
    xhr.send();
}
