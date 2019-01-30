<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8" />    
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Weather City</title>
    <script src="meteo.js"></script>
    <link href="style.css" rel="stylesheet">
    
    <link href="https://fonts.googleapis.com/css?family=Lato" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Oswald" rel="stylesheet">
</head>

<body onload="init_page()">

        <section class="conteneur">
               
                <div class="champ">
                          <form>
                                <div class="title"><h1>Weather City<span class="orange">.</span></h1></div>
                                <div class="saisie">
                                <label for="ville"></label>
                                <input type="text" id="ville" value="" placeholder="Recherchez une ville">
                                <button type="button" class="btn-grad" onclick="get_temperature()">OK</button>
                                </div>
                                </div>
                            </form>
                </div>
                    
                <div class="allcards">
                        <div id="main-image" class="card" >
                                <h2 class="title1" id="cit">Météo du jour</h2>
                                <hr><br>
                                <p id="date"></p><br>
                                <p id="meteo"></p>
                                <img id="icon" src=""><br>
                                <p id="vent"></p><br>
                                <p id="humidity"></p><br>
                                <p id="hPa"></p>
                                <div id="url"></div>
                            </div>
                            <div id="main-image2" class="card" >
                                <h2 class="title1" id="cit">Horaires</h2>
                                <hr><br>
                                <p id="day0" class="size"></p>
                                <img id="dayicon0" src="">
                                <p id="day1" class="size"></p>
                                <img id="dayicon1" src="">
                                <p id="day2" class="size"></p>
                                <img id="dayicon2" src="">
                                <p id="day3" class="size"></p>
                                <img id="dayicon3" src="">
                            </div>
                            <div id="main-image3" class="card" >
                                <div class="fond"></div>
                                <h2 class="title1" id="cit">Quotidien</h2>
                                <hr><br>
                                <p id ="wday7"></p>
                                <img id="dayicon7" src="">
                                <p id ="wday15"></p>
                                <img id="dayicon15" src="">
                                <p id ="wday23"></p>
                                <img id="dayicon23" src="">
                                <p id ="wday31"></p>
                                <img id="dayicon31" src="">
                            </div>
                             
                </div>
           </section>
           <footer>
                <h2>dev log 8</h2>
                <p>Franc, Sebastien, Giovanni, Fabrice</p>
                </footer>  
                   
</body>
</html>

