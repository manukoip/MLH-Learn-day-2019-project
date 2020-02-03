var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var request = require("request");

var fakeWeatherData = require("./data/weather.json");

var API_ENDPOINT = "https://api.openweathermap.org/data/2.5/weather";
var API_KEY = "ae88b52d0bf54b3b1ee6ce01dd1435be";

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

/* GET home page. */
app.get("/", function(req, res, next) {
  res.render("index");
});

/* GET weather page. */
app.get("/weather/:city", function(req, res, next) {
  /*
  TODO: Let's use a real API to get weather data
  function: request(url, function(error, response, body){})
  url:      `${API_ENDPOINT}?q=${cityName}&units=metric&appid=${API_KEY}`
  data:     JSON.parse(body)
  */

  var cityName = req.params.city;
  var url = `${API_ENDPOINT}?q=${cityName}&units=metric&appid=${API_KEY}`;

  request(url, function(error, response, body) {
      res.json(JSON.parse(body));
  });
  
  /*
  
  var fakeWeather = fakeWeatherData.find(item => item.name == cityName);

  if (fakeWeather) {
    res.json(fakeWeather);
  } else {
    res.status(404).json({ message: "City not found" });
  } */
});

module.exports = app;
