var xhr = new XMLHttpRequest();
var xhr2 =new XMLHttpRequest();


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
    var a = new Date(UNIX_timestamp * 1000);
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec;
    return time;
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
   
    var lat=Math.round(position.coords.latitude);
    var lon=Math.round(position.coords.longitude);
    
    city="lat="+lat+"&lon="+lon;
    console.log(city);
  }

function choix(main){
    switch (main) {
        case "Rain":
            var elem = document.getElementById("main-image");
            elem.style.backgroundImage = "url('images/rain.jpg')";
            audio = new Audio('son/pluieforte.mp3');
                    audio.play();
            break;
        case "Clouds":
            var elem = document.getElementById("main-image");
            elem.style.backgroundImage = "url('images/nuages2.jpg')";
            audio = new Audio('son/nuageux.mp3');
                    audio.play();
            break;
        case "Thunderstorm":
            var elem = document.getElementById("main-image");
            elem.style.backgroundImage = "url('images/thunderstorm.jpg')";
            audio = new Audio('son/orage.mp3');
                    audio.play();
            break;
        case "Clear":
            var elem = document.getElementById("main-image");
            elem.style.backgroundImage = "url('images/clear.jpg')";
            audio = new Audio('son/ensoleille.mp3');
                    audio.play();
            break;
        case "Atmosphere":
            var elem = document.getElementById("main-image");
            elem.style.backgroundImage = "url('koa.jpg')";
            audio = new Audio('son/atmosphere.mp3');
                    audio.play();
            break;
        case "Snow":
            var elem = document.getElementById("main-image");
            elem.style.backgroundImage = "url('images/snow.jpg')";
            audio = new Audio('son/neige.mp3');
                    audio.play();
            break;
        case "Drizzle":
            var elem = document.getElementById("main-image");
            elem.style.backgroundImage = "url('images/drizzle.jpg')";
            audio = new Audio('son/pluie.mp3');
                    audio.play();
            break;
        default:
            var elem = document.getElementById("main-image");
            elem.style.backgroundImage = "url('images/defaut.jpg')";
            
            
    }
}
function init_page(){
    navigator.geolocation.getCurrentPosition(showPosition);
    
    

    setTimeout (function(){
    
    //city="lat="+lat+"&lon="+lon;
    //city="lat=49&lon=6";
    prevision();
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
            document.getElementById("date").innerHTML = date;
        }
    };

    xhr.open("GET", get_url(), true);
    xhr.send();
},3000);
}


function get_temperature() {
    city = "q="+document.getElementById("ville").value;
    prevision();
    audio.pause();
    audio.currentTime = 0;

    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            
            
            var response = JSON.parse(this.responseText);
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
            document.getElementById("date").innerHTML = date;
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
                elem.style.backgroundImage = "url('images/back16.png')";
            } else if (response5days.list[0].dt < 24 && response5days.list[0] > 15) {
                var elem = document.getElementById("main-image2");
                elem.style.backgroundImage = "url('images/back18.png')";
            } else {
                var elem = document.getElementById("main-image2");
                elem.style.backgroundImage = "url('images/back18.jpg')";
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


/*----------------*/


/*var xhr = new XMLHttpRequest();
var xhr2 =new XMLHttpRequest();
var base_url_5days = "http://api.openweathermap.org/data/2.5/forecast";
// Forme générale du lien :
// http://api.openweathermap.org/data/2.5/weather?q=Metz&3c084bd74c2f77f02d6d6c30c2018bf0
var base_url = "http://api.openweathermap.org/data/2.5/weather";
var city = "Metz";
var units = "metric";
var appid = "621266adac915fdb1f3b829394fd097d";
var date;
var audio = new Audio('default.mp3');
function get_url() {
    return base_url + "?" +
        "q=" + city + "&" +
        "units=" + units + "&" +
        "appid=" + appid;
}
function get_url_5days(){
    return base_url_5days + "?" +
    "q=" + city + "&" +
    "units=" + units + "&" +
    "appid=" + appid;
}
function heure(UNIX_timestamp) {
    let a = new Date(UNIX_timestamp * 1000);
    let hour = a.getHours();
    return hour;
}
function jour(UNIX_timestamp) {
    let jours=new Array("Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi");
    let a = new Date(UNIX_timestamp * 1000);
    let jour = jours[a.getDay()];
    return jour;
}
function timeConverter(UNIX_timestamp) {
    var a = new Date(UNIX_timestamp * 1000);
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec;
    return time;
}
function init_page() {
    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("url").innerHTML = get_url();
            var response = JSON.parse(this.responseText);
            var temperature = response.main.temp;
            var vent = response.wind.speed;
            var humidity = response.main.humidity;
            var hPa = response.main.pressure;
            var icon = response.weather[0].icon;
            var src = "http://openweathermap.org/img/w/" + icon + ".png";
            document.getElementById("meteo").innerHTML = temperature;
            document.getElementById("vent").innerHTML = vent + "km/h";
            document.getElementById("humidity").innerHTML = humidity + "%";
            document.getElementById("hPa").innerHTML = hPa + "mbar";
            document.getElementById("icon").src = src;
        }
    };
    xhr.open("GET", get_url(), true);
    xhr.send();
}
function get_temperature() {
    city = document.getElementById("ville").value;
    prevision();
    audio.pause();
    audio.currentTime = 0;
    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("url").innerHTML = get_url();
            if (document.getElementById("url_visibility").checked) {
                document.getElementById("url").style.display = "block";
            } else {
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
                    audio = new Audio('son/pluieforte.mp3');
                    audio.play();
                    break;
                case "Clouds" :
                    var elem = document.getElementById("main-image");
                    elem.style.backgroundImage = "url('images/cloud2.jpg')";
                    audio = new Audio('son/nuageux.mp3');
                    audio.play();
                    break;
                case "Thunderstorm" :
                    var elem = document.getElementById("main-image");
                    elem.style.backgroundImage = "url('images/thunderstorm.jpg')";
                    audio = new Audio('son/orage.mp3');
                    audio.play();
                    break;
                case "Clear" :
                    var elem = document.getElementById("main-image");
                    elem.style.backgroundImage = "url('images/clear.jpg')";
                    audio = new Audio('son/ensoleille.mp3');
                    audio.play();
                    break;
                case "Atmosphere" :
                    var elem = document.getElementById("main-image");
                    elem.style.backgroundImage = "url('koa.jpg')";
                    audio = new Audio('son/atmosphere.mp3');
                    audio.play();
                    break;
                case "Snow":
                    var elem = document.getElementById("main-image");
                    elem.style.backgroundImage = "url('images/snow.jpg')";
                    audio = new Audio('son/neige.mp3');
                    audio.play();
                    break;
                case "Drizzle":
                    var elem = document.getElementById("main-image");
                    elem.style.backgroundImage = "url('images/drizzle.jpg')";
                    audio = new Audio('son/pluie.mp3');
                    audio.play();
                    break;
                default :
                    var elem = document.getElementById("main-image");
                    elem.style.backgroundImage = "url('images/defaut.jpg')";
                    audio = new Audio('son/default.mp3');
                    audio.play();
                    /*Ensoleillé
            }
            var src = "http://openweathermap.org/img/w/" + icon + ".png";
            document.getElementById("meteo").innerHTML = temperature;
            document.getElementById("cit").innerHTML = cit;
            document.getElementById("cit").innerHTML += ", " + country;
            document.getElementById("date").innerHTML = date;
            document.getElementById("icon").src = src;
           // document.getElementById("ma").innerHTML = main;
        }
    };
    xhr.open("GET", get_url(), true);
    xhr.send();
}
function prevision(){
    
     city = document.getElementById("ville").value;
 
     xhr2.onreadystatechange = function () {
         if (this.readyState == 4 && this.status == 200) {
 
             if (document.getElementById("url_visibility").checked) {
                 document.getElementById("url").style.display = "block";
             } else {
                 document.getElementById("url").style.display = "none";
             }
 
             var response5days = JSON.parse(this.responseText);
             var temp5days;
            
             for (i=0 ; i<4 ; i++){
                 temp5days = Math.round(response5days.list[i].main.temp); 
                 heuredt=   response5days.list[i].dt;
                 
                 document.getElementById("day"+i).innerHTML = heure(heuredt)+":00 : "+temp5days +"°C";
             }
             for (i=7 ; i<32 ; i+=8){
                temp5days2= Math.round(response5days.list[i].main.temp,1);
                heuredt2=   response5days.list[i].dt;
                console.log(temp5days2);
 
                document.getElementById("wday"+i).innerHTML = jour(heuredt2)+": "+temp5days2 +"°C" ;
            }
 
         }
     }
 
     xhr2.open("GET", get_url_5days(), true);
     xhr2.send();
} */