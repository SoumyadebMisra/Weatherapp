require('dotenv').config();
const express = require("express");
const app = express();
const https = require("https");
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));

app.get('/', function(req, res){
    res.sendFile(__dirname + "/index.html");
});
app.post('/', function(req, res){
    query = req.body.cityName;
    appid= process.env.APP_ID;
    unit="metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query +"&appid="+ appid +"&units="+ unit
    https.get(url,(response)=>{
        console.log(response.statusCode);
        response.on('data',(data)=>{
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const weatherDesc = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const iconsrc = "http://openweathermap.org/img/wn/"+ icon +"@2x.png";
            res.write("<p>The weather is "+weatherDesc+"</p>");
            res.write("<h1>The temperature in "+query+" is "+temp+" degree celcius</h1>");
            res.write('<img src="' + iconsrc +'">');
            res.send();
        });
    });
});



app.listen(3000,function(){
    console.log("Server running on port 3000");
});