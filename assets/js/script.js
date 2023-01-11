//form for the Input -html
//input to variable, variable used for fetch api, to generate buttons for past searches 
// search button uses event listener to generate past city buttons and creates cards for current and future weather
// 
var cityName = "";
var latitude = "";
var longitude = "";
var recentCities = [];
var apiKey = "5f63fb5563dc4bb7b980fcfe90a1fb82"

function getRecentCities () {
    var savedSearches = JSON.parse(localStorage.getItem("recent-cities"))
    console.log(savedSearches);

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
    $("#currentWeatherCard").removeClass("hide");
    $(".forecastWeatherCard").removeClass("hide");
}
function getCityWeather() {
    var url = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial&appid=" + apiKey
    fetch(Url)
    .then(function (response) {
        console.log("getCityWeather works")
        console.log(response);
            return response.json();
    })
    .then(function (data) {
        console.log("data function works");
        console.log("current weather data : ", data);
        var iconData = data.weather[0].icon;
        $("#iconImg")
    }
    )
}

function fillCities () {
    console.log("filledCities");
    $("#cityTitle").text(cityName);

}
$("city-input").submit(function (event) {
    $("#currentWeatherCard").removeClass("hide");
    $(".forecastWeatherCard").removeClass("hide");
    event.preventDefault();

})