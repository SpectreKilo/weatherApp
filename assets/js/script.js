//form for the Input -html
//input to variable, variable used for fetch api, to generate buttons for past searches 
// search button uses event listener to generate past city buttons and creates cards for current and future weather
// 
var cityName = "";
var latitude = "";
var longitude = "";
var recentCities = [];
var currentDate = dayjs().format("MMMM DD, YYYY");
var apiKey = "5f63fb5563dc4bb7b980fcfe90a1fb82"

function getRecentCities () {
    var savedSearches = JSON.parse(localStorage.getItem("recent-cities"))
    console.log(savedSearches);

    if(savedSearches) {
    for (i=0; i<savedSearches.length; i++) {
        console.log(savedSearches[i])
        if (recentCities.indexOf(cityName) === -1) {
            var listItem =$("<li>")
            var pastCityButtons = $("<button>");
            pastCityButtons.addClass("title btn-large");
            pastCityButtons.text(savedSearches[i]);
            pastCityButtons.click(function() {
                console.log(this, "was clicked");
                console.log($(this).text());
                cityName = $(this).text();
                fillCities();
                getCityWeather();
            })
            listItem.append(pastCityButtons);
            $("#buttonList").append(listItem);
            recentCities.push(savedSearches[i]);
        }
    }
    
    }
}
function getCityWeather() {
    var url = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial&appid=" + apiKey
    fetch(url)
    .then(function (response) {
        console.log("getCityWeather works")
        console.log(response);
            return response.json();
    })
    .then(function (data) {
        console.log("data function works");
        console.log("current weather data : ", data);
        var iconData = data.weather[0].icon;
        $("#iconImg").addClass("card.small left")
        $("#iconImg").attr("src", "https://openweathermap.org/img/wn/" + iconData +"@4x.png" )

        var temp = data.main.temp
        $("#temp").text("Temperature : " + temp + " degrees")
        var windSpeed = data.wind.speed
        $("#wind").text("Wind Speed: " + windSpeed )
        console.log(data.name);
        latitude = data.coord.lat;
        longitude = data.coord.lon;
        console.log("lat : " + latitude, "lon: " + longitude);
        foreCast(latitude, longitude);
        //does this dayjs work?
        $("#date").text(currentDate);

        localStorage.setItem("cityName", data.name)
        
    }
    );
};

function foreCast(lat, lon){
    console.log("forecast function")
    
    var forecastUrl = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey
    console.log(forecastUrl);
//console log outputs correct url but then the fetch gives error code 400
    fetch(forecastUrl)
    .then(function (response){
        console.log("this is the forecast response function too");
        console.log(response);
            return response.json();
    })
    .then(function (data) {
        console.log("forecast data function");
        console.log("current forecast weather data: ", data);
        
        for (i = 1; i < 5; i++) {
            console.log("here is data: ", data)
            console.log("this is the forecast ", data.list[i])
            var forecastDates = dayjs(data.list[i].dt).format("MMMM DD, YYYY")
            $("date" + i).text(forecastDates);
            var iconImgFC = data.list[i].weather[0].icon
            $("#iconImg" + i).attr("src", "https://openweathermap.org/img/wn/" + iconImgFC + "@2x.png")
            var tempFC = data.list[i].temp.day;
            $("temp" + i).text(tempFC + "degrees");
            var humidityFC = data.list[i].humidity
            $("#humidity" + i).text(humidityFC + "% humidity")
            var windSpeedFC = data.list[i].wind_speed;
            $("#wind" + i).text(windSpeedFC + " Wind Speed")

        }
    })
}

function fillCities () {
    console.log("filledCities");
    $("#cityTitle").text(cityName);
    if (recentCities.indexOf(cityName) === -1) {
        var listItem = $("<li>")
        var pastCityButtons = $("<button>");
        pastCityButtons.addClass("title btn-large")
        pastCityButtons.text(cityName);
        pastCityButtons.click(function() {
            console.log(this, " : clicked")
            console.log($(this).text())
            cityName = $(this).text()
            fillCities();
            getCityWeather();
        })
        listItem.append(pastCityButtons);
        $("#buttonList").append(listItem);
        recentCities.push(cityName);
        localStorage.setItem("recent-cities", JSON.stringify(recentCities))
    }

}
$("#city-input").submit(function (event) {
    $("#currentWeatherCard").removeClass("hide");
    $(".forecastWeatherCard").removeClass("hide");
    event.preventDefault();
    cityName = $("#cityName").val();
    console.log(cityName);
    fillCities();
    // foreCast();
    getCityWeather();

})

getRecentCities();
