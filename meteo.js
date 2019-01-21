var xhr = new XMLHttpRequest();

// Forme générale du lien :
// http://api.openweathermap.org/data/2.5/weather?q=Metz&3c084bd74c2f77f02d6d6c30c2018bf0

var base_url = "http://api.openweathermap.org/data/2.5/weather";
var city = "Metz";
var units = "metric";
var appid = "3c084bd74c2f77f02d6d6c30c2018bf0";

function get_url() {
    return base_url + "?"
        + "q=" + city + "&"
        + "units=" + units + "&"
        + "appid=" + appid;
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
            var date = response.dt;

            var icon = response.weather[0].icon;
            var main = response.weather[0].main;
            
            switch (main){
                case "Rain" :
                    var elem = document.getElementById("main-image");
                    elem.style.backgroundImage = "url('images/rain.jpg')";
                    break;
                case "Clouds" :
                    var elem = document.getElementById("main-image");
                    elem.style.backgroundImage = "url('images/cloud.jpg')";
                    break;
                case "Thunderstorm" :
                    var elem = document.getElementById("main-image");
                    elem.style.backgroundImage = "url('images/thunderstorm.jpg')";
                    break;
                case "Clear" :
                    var elem = document.getElementById("main-image");
                    elem.style.backgroundImage = "url('images/clear.jpg')";
                    break;
                case "Atmosphere" :
                    var elem = document.getElementById("main-image");
                    elem.style.backgroundImage = "url('koa.jpg')";
                    break;
                case "Snow":
                    var elem = document.getElementById("main-image");
                    elem.style.backgroundImage = "url('images/snow.jpg')";
                    break;
                case "Drizzle":
                    var elem = document.getElementById("main-image");
                    elem.style.backgroundImage = "url('images/drizzle.jpg')";
                    break;
                default :
                    var elem = document.getElementById("main-image");
                    elem.style.backgroundImage = "url('images/defaut.jpg')";
                    /*Ensoleillé*/


            }
            var src = "http://openweathermap.org/img/w/" + icon + ".png";
            
            
            document.getElementById("cit").innerHTML = cit;
            document.getElementById("cit").innerHTML += ", " + country;
            document.getElementById("date").innerHTML = date;
            document.getElementById("meteo").innerHTML = temperature;
            document.getElementById("icon").src = src;
            document.getElementById("ma").innerHTML = main;
            
        }
    };
    
    xhr.open("GET", get_url(), true);
    xhr.send();
}