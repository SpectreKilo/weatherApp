//form for the Input -html
//input to variable, variable used for fetch api, to generate buttons for past searches 
// search button uses event listener to generate past city buttons and creates cards for current and future weather
// 
var apiKey = "5f63fb5563dc4bb7b980fcfe90a1fb82"


function getCityWeather() {
    var url = "api.openweathermap.org/data/2.5/forecast?q="+ cityName + "&appid=" + apiKey

    //fetch weather
    fetch(url)
    .then(function (response) {
        console.log(response);
            return response.json();
    })
    
}