var xhr = new XMLHttpRequest();

// Forme générale du lien :
// http://api.openweathermap.org/data/2.5/weather?q=Metz&3c084bd74c2f77f02d6d6c30c2018bf0

var base_url = "http://api.openweathermap.org/data/2.5/weather";
var city = "";
var units = "metric";
var appid = "a7f4ab5088bee3f40a1779b0b9fdf06e";
var lat = 0;
var lon = 0;

function get_url() {
    return base_url + "?"
        + "q=" + city + "&"
        + "units=" + units + "&"
        + "appid=" + appid;
}

function get_urlpos() {
    return base_url + "?"
       // + "lat=" + lat + "&" + "lon=" + lon + "&"
        + "q=" + city + "&"
        + "units=" + units + "&"
        + "appid=" + appid;
}

function init_page() {
    
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            navigator.geolocation.getCurrentPosition(maPosition);
            document.getElementById("url").innerHTML = get_url();
   //         document.getElementById("url").style.display = "block";

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
            var humiditee = response.main.humidity;

            var icon = response.weather[0].icon;
            var src = "http://openweathermap.org/img/w/" + icon + ".png";
            
            document.getElementById("meteo").innerHTML = temperature;
            document.getElementById("humiditee").innerHTML = humiditee;
            document.getElementById("icon").src = src;

        }
    };
    
    xhr.open("GET", get_url(), true);
    xhr.send();
}


function maPosition(position) {
    var infopos = "Position déterminée :\n";
    infopos += "Latitude : "+Math.round(position.coords.latitude) +"\n";
    infopos += "Longitude: "+Math.round(position.coords.longitude)+"\n";
    document.getElementById("infoposition").innerHTML = infopos;
    lat = Math.round(position.coords.latitude);
    lon = Math.round(position.coords.longitude);
}
  
  
    