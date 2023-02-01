const express = require('express');
const bodyParser = require('body-parser');
const https = require("https");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

const port = 3000;

app.get("/", (req, res)  => {

    res.sendFile(__dirname + "/index.html")

});

app.post("/", (req, res) => {

    const apiKey = "ae863c78d561560f7e24295555bc87a8";
    const query = req.body.cityName;
    const units = "metric";
    const apiWeatherUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + units;

    https.get(apiWeatherUrl, (response) => {
        
        console.log(response.statusCode);
    
        response.on("data", (data) => {
    
            const weatherData = JSON.parse(data);
            const temperature = weatherData.main.temp;
            const overallWeather = weatherData.weather[0].main;
            const weatherDescription = weatherData.weather[0].description;
            const weatherSensation = weatherData.main.feels_like;
            const weatherIconCode = weatherData.weather[0].icon;
            const weatherIconLink =  "http://openweathermap.org/img/wn/" + weatherIconCode + "@2x.png";
    
            res.write("<h1>" + query + "'s Weather <img src='" + weatherIconLink + "'></h1>");
            res.write("<h3>" + query + "'s current weather is mainly described by " +  overallWeather + "</h3>");
            res.write("<h3>On the other hand, its current temperature is " + temperature + " degrees Celsius</h3>");
            res.write("<h3>However, it feels as if it were " + weatherSensation + " degrees Celsius</h3>");
            res.write("<h3>If you were to go for a walk, you would notice " + weatherDescription + "</h3>");
    
            res.send();
    
        })
    
    })

})

app.listen(port, () => {
    console.log("Server running on port 3000");
})



