<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8" />    
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Weather City</title>
    <script src="meteo.js"></script>
    <link href="style.css" rel="stylesheet">
    <link rel="stylesheet" media="screen and (max-width: 1024px)">
    <link href="https://fonts.googleapis.com/css?family=Lato" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Oswald" rel="stylesheet">
</head>

<body onload="init_page()">
    <header>

        <nav id="bar">
            <a href="projet.html">Weather City<span class="orange">.</span></span></a>
        </nav>
        </header>

        
        <form>
            <label for="city"></label>
            <input type="text" id="ville" value="" placeholder="Recherchez une ville">
            <button type="button" class="btn-grad" onclick="get_temperature()">OK</button>
            <input type="checkbox" class="check" id="url_visibility">
            </div>
        </form>
    



        <section>
            <div class="allcards">
                <div id="main-image" class="card" >
                <p class="title" id="cit"></p>
                <hr><br>
                <p id="date"></p><br>
                <p id="meteo"></p>
                <img id="icon" src=""></p><br>
                <img src="images/wind.png" id="vent"><br>
                <img src="images/humidity.png" id="humidity"></p><br>
                <img src="images/preassure.png" id="hPa"></p>
                <div id="url"></div>
            </div>
            <div id="main-image2" class="card" >
                <p class="title" id="cit">Horaires</p>
                <hr><br>
                <p id="day0" class="size"></p><br>
                <p id="day1" class="size"></p><br>
                <p id="day2" class="size"></p><br>
                <p id="day3" class="size"></p>
            </div>
            <div id="main-image3" class="card" >
                <div class="fond"></div>
                <p class="title" id="cit">Quotidien</p>
                <hr><br>
                <p id ="wday7"></p><br>
                <p id ="wday15"></p><br>
                <p id ="wday23"></p><br>
                <p id ="wday31"></p>
            </div>
        </div>
    </section>
            

       <footer>
            <div class="wrapper">
                <h2>dev log 8</h2>
                <p>Franc, Sebastien, Giovanni, Fabrice</p>
            </div>
        </footer>
</body>

</html>