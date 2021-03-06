var xhr = new XMLHttpRequest();
var xhr2 =new XMLHttpRequest();
var lat;
var lon;


var base_url_5days = "http://api.openweathermap.org/data/2.5/forecast";
var base_url = "http://api.openweathermap.org/data/2.5/weather";
var city = "q=Metz";
var units = "metric";
var appid = "621266adac915fdb1f3b829394fd097d";
var date;
var audio = new Audio('./son/default.mp3');

function get_url() {
    return base_url + "?" +
         city + "&" +
        "units=" + units + "&" +
        "appid=" + appid;
}

function get_url_5days(){
    return base_url_5days + "?" +
    city + "&" +
    "units=" + units + "&" +
    "appid=" + appid;
}

function timeConverter(UNIX_timestamp) {
    a = new Date(UNIX_timestamp * 1000);
    months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    year = a.getFullYear();
    month = months[a.getMonth()];
    date = a.getDate();
    hour = a.getHours();
    min = a.getMinutes();
    sec = a.getSeconds();
    var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec;
    console.log(time);
    document.getElementById('date').innerHTML = time;
    prevision();
	}


function heure(UNIX_timestamp) {
        let a = new Date(UNIX_timestamp * 1000);
        let hour = a.getHours();
        return hour;
}


function jour(UNIX_timestamp) {
    let a = new Date(UNIX_timestamp * 1000);
    let jours=["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];
    let jour = jours[a.getDay()];
    return jour;
}

function showPosition(position) {
   
    lat=Math.round(position.coords.latitude);
    lon=Math.round(position.coords.longitude);
    
    city="lat="+lat+"&lon="+lon;
    console.log(city);
  }

function choix(main){
    switch (main) {
        case "Rain":
            var elem = document.getElementById("main-image");
            elem.style.backgroundImage = "url('images/backpluieforte.png')";
            audio = new Audio('son/pluieforte.mp3');
                    audio.play();
            break;
        case "Clouds":
            var elem = document.getElementById("main-image");
            elem.style.backgroundImage = "url('images/backnuageux.png')";
            audio = new Audio('son/nuageux.mp3');
                    audio.play();
            break;
        case "Thunderstorm":
            var elem = document.getElementById("main-image");
            elem.style.backgroundImage = "url('images/backorageux.png')";
            audio = new Audio('son/orage.mp3');
                    audio.play();
            break;
        case "Clear":
            var elem = document.getElementById("main-image");
            elem.style.backgroundImage = "url('images/backensoleille.png')";
            audio = new Audio('son/ensoleille.mp3');
                    audio.play();
            break;
        case "Atmosphere":
            var elem = document.getElementById("main-image");
            elem.style.backgroundImage = "url('images/backbrouillard.png')";
            audio = new Audio('son/atmosphere.mp3');
                    audio.play();
            break;
        case "Snow":
            var elem = document.getElementById("main-image");
            elem.style.backgroundImage = "url('images/backneigeux.png')";
            audio = new Audio('son/neige.mp3');
                    audio.play();
            break;
        case "Drizzle":
            var elem = document.getElementById("main-image");
            elem.style.backgroundImage = "url('images/backpluiefaible.png')";
            audio = new Audio('son/pluie.mp3');
                    audio.play();
            break;
        default:
            var elem = document.getElementById("main-image");
            elem.style.backgroundImage = "url('images/backcielbleu.png')";
            audio = new Audio('son/default.mp3');
                    audio.play();
            
    }
}
function init_page(){
    navigator.geolocation.getCurrentPosition(showPosition);
    
    

    setTimeout (function(){
    
    //city="lat="+lat+"&lon="+lon;
    //city="lat=49&lon=6";
    //audio.pause();
    //audio.currentTime = 0;
    

    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            //document.getElementById("url").innerHTML = get_url();

            var response = JSON.parse(this.responseText);
            var temperature = Math.round(response.main.temp);
            var vent = response.wind.speed;
            var humidity = response.main.humidity;
            var hPa = response.main.pressure;
            var cit = response.name;
            var country = response.sys.country;
            var dt = response.dt;
            var date = timeConverter(dt);
            var icon = response.weather[0].icon;
            var src = "http://openweathermap.org/img/w/" + icon + ".png";
            var main = response.weather[0].main;

            choix(main);

            document.getElementById("meteo").innerHTML = temperature+'°C';
            document.getElementById("vent").innerHTML = vent + "km/h";
            document.getElementById("humidity").innerHTML = humidity + "%";
            document.getElementById("hPa").innerHTML = hPa + "mbar";
            //document.getElementById("icon").src = src;
            document.getElementById("cit").innerHTML = cit;
            document.getElementById("cit").innerHTML += ", " + country;
            //document.getElementById("date").innerHTML = date;
        }
    };

    xhr.open("GET", get_url(), true);
    xhr.send();
},3000);
}


function get_temperature() {
    city = "q="+document.getElementById("ville").value;
    audio.pause();
    audio.currentTime = 0;

    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            
            
            response = JSON.parse(this.responseText);
            var temperature = Math.round(response.main.temp);
            var cit = response.name;
            var country = response.sys.country;
            var hPa = response.main.pressure;
            var dt = response.dt;
            var date = timeConverter(dt);
            var icon = response.weather[0].icon;
            var main = response.weather[0].main;
            var vent = response.wind.speed;
            var humidity = response.main.humidity;

            choix(main);


            
            var src = "http://openweathermap.org/img/w/" + icon + ".png";

            document.getElementById("meteo").innerHTML = temperature + "°";
            document.getElementById("cit").innerHTML = cit;
            document.getElementById("cit").innerHTML += ", " + country;
            //document.getElementById("date").innerHTML = date;
            //document.getElementById("icon").src = src;
            document.getElementById("hPa").innerHTML = hPa + "mbar";
            document.getElementById("vent").innerHTML = vent + "km/h";
            document.getElementById("humidity").innerHTML = humidity + "%";
         
            }
    };

    xhr.open("GET", get_url(), true);
    xhr.send();
}

function prevision(){
    
   // city = document.getElementById("ville").value;

    xhr2.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {

            var response5days = JSON.parse(this.responseText);
            var temp5days;
            var temp5days2;
            var heuredt2;
            var icon2;
            var src2;
            
            if (response5days.list[0].dt <= 15 && response5days.list[0] > 8) {
                var elem = document.getElementById("main-image2");
                elem.style.backgroundImage = "url('images/backcard2morning2.png')";
            } else if (response5days.list[0].dt < 24 && response5days.list[0] > 15) {
                var elem = document.getElementById("main-image2");
                elem.style.backgroundImage = "url('images/backcard2night.png')";
            } else {
                var elem = document.getElementById("main-image2");
                elem.style.backgroundImage = "url('images/backcard2night.jpg')";
            }
           
            for (i=0 ; i<4 ; i++){
                temp5days = Math.round(response5days.list[i].main.temp); 
                heuredt=   response5days.list[i].dt;
                icon2 = response5days.list[i].weather[0].icon;
                src2 = "http://openweathermap.org/img/w/" + icon2 + ".png";
                document.getElementById("day"+i).innerHTML = heure(heuredt)+":00 : "+temp5days +"°C";
                document.getElementById("dayicon"+i).src = src2;
            }

            for (i=7 ; i<32 ; i+=8){
                temp5days2 = Math.round(response5days.list[i].main.temp); 
                heuredt2=   response5days.list[i].dt;
                icon2 = response5days.list[i].weather[0].icon;
                src2 = "http://openweathermap.org/img/w/" + icon2 + ".png";
                document.getElementById("dayicon"+i).src = src2;
                document.getElementById("wday"+i).innerHTML = jour(heuredt2)+": "+temp5days2 +"°C";
            }

            

        }
    }

    xhr2.open("GET", get_url_5days(), true);
    xhr2.send();
}


