$(document).ready(function() {
    $("#searchForm").submit(function(event) {
        var cityName= $("#enterCity").val(); 
        if (cityName) {

            var newCityBtn = $("<button>").addClass("btn btn-outline-dark cityPresetBtn").attr("id", cityName).html(cityName);
            
            $("#cityButtonsDiv").append(newCityBtn);

            $("#cityButtonsDiv").append("<br />");

            $("#enterCity").val("");

            event.preventDefault();
        }

        $(".cityPresetBtn").click(function(event) {
                var city = $(this).attr("id");
                
            getCurrentCityWeather(city);

            event.preventDefault();
          });
    });
});

//function gets the current city weather chosen in search input area using open weather api
function getCurrentCityWeather(city) {
var apiKey = "bd55605769e4e7d335524fe5139d15d4";
var cityWeatherInfo = {};
$.ajax({
    method: 'GET',
    url: 'https://api.openweathermap.org/data/2.5/weather?q='+city+',us&appid='+apiKey,
    dataType: 'jsonp',
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    },
    success: function(result) {
        cityWeatherInfo = {
                thisCity: result.name,
                date: result.dt,
                longitude: result.coord.lon,
                latitude: result.coord.lat,
                temperature: result.main.temp,
                humidity: result.main.humidity,
                windSpeed: result.wind.speed,                    
            }
    },
    error: function(error) {
        throw(error);
    },
    complete: function() { 
        getCityWeather(city, apiKey, cityWeatherInfo);
        getCityUVIndex(apiKey,cityWeatherInfo);
    }
});
};

// gets the 5 day forecast from open weather api
function getCityWeather(city, apiKey, cityWeatherInfo) {
    
    $.ajax({
    method: 'GET',
    url: 'https://api.openweathermap.org/data/2.5/forecast?q='+city+',us&appid='+apiKey,
    dataType: 'jsonp',
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    },
    success: function(result) {
        cityWeatherInfo.fiveDayForecast = {
                day1: {
                    date: result.list[4].dt_txt,
                    weather: result.list[4].weather[0].main,
                    temperature: result.list[4].main.temp,
                    humidity: result.list[4].main.humidity,
                },
                day2: {
                    date: result.list[12].dt_txt,
                    weather: result.list[12].weather[0].main,
                    temperature: result.list[12].main.temp,
                    humidity: result.list[12].main.humidity,
                },
                day3: {
                    date: result.list[20].dt_txt,
                    weather: result.list[20].weather[0].main,
                    temperature: result.list[20].main.temp,
                    humidity: result.list[20].main.humidity,
                },
                day4: {
                    date: result.list[28].dt_txt,
                    weather: result.list[28].weather[0].main,
                    temperature: result.list[28].main.temp,
                    humidity: result.list[28].main.humidity,
                },
                day5: {
                    date: result.list[36].dt_txt,
                    weather: result.list[36].weather[0].main,
                    temperature: result.list[36].main.temp,
                    humidity: result.list[36].main.humidity,
                },
            };
    },        
    error: function(error) {
        throw(error);
    },
    complete: function() { 
       console.log(cityWeatherInfo);
        renderForecast(cityWeatherInfo);
    }   
});
}

//function gets the UV Index for chosen city using longitude and latitude and api open weather
function getCityUVIndex(apiKey, cityWeatherInfo) {
var cityLongitude = (cityWeatherInfo.longitude);
var cityLatitude = (cityWeatherInfo.latitude);
$.ajax({
method: 'GET',
url: 'https://api.openweathermap.org/data/2.5/uvi?appid='+apiKey+'&lat='+cityLatitude+'&lon='+cityLongitude,

success: function(result) {
    cityWeatherInfo.UvIndex = {
                cityUVIndex: result.value,
        };
},        
error: function(error) {
    throw(error);
},
complete: function() { 
                
    renderForecast(cityWeatherInfo);
}   
});
}

var renderForecast = function(cityWeatherInfo) {

var day1 = cityWeatherInfo.fiveDayForecast.day1;
var day2 = cityWeatherInfo.fiveDayForecast.day2;
var day3 = cityWeatherInfo.fiveDayForecast.day3;
var day4 = cityWeatherInfo.fiveDayForecast.day4;
var day5 = cityWeatherInfo.fiveDayForecast.day5;

//display current day weather
$("#currentCityWeather").html(cityWeatherInfo.thisCity + " " + formatUnixToDate(cityWeatherInfo.date));
$("#currentTemp").html("Temperature: " + convertToFahrenheit(cityWeatherInfo.temperature) + "&#176;F");
$("#currentHumidity").html("Humidity: " + cityWeatherInfo.humidity + "%");
$("#currentWind").html("Wind Speed: " + cityWeatherInfo.windSpeed + " mph");
$("#currentUVIndex").html("UV Index: " + cityWeatherInfo.UvIndex.cityUVIndex + "").css("color", pickUVIndexColor(cityWeatherInfo.UvIndex.cityUVIndex));
//day 1 forecast
render5DayForecastDay("#day1Date", "#day1Weather", "#day1Temp", "#day1Humidity", day1);

//day 2 forecast
render5DayForecastDay("#day2Date", "#day2Weather", "#day2Temp", "#day2Humidity", day2);

//day 3 forecast
render5DayForecastDay("#day3Date", "#day3Weather", "#day3Temp", "#day3Humidity", day3);

//day 4 forecast
render5DayForecastDay("#day4Date", "#day4Weather", "#day4Temp", "#day4Humidity", day4);

//day 5 forecast
render5DayForecastDay("#day5Date", "#day5Weather", "#day5Temp", "#day5Humidity", day5);

$("#currentWeatherDisplayArea").show();
}

var render5DayForecastDay = function(dateDiv, weatherDiv, temperatureDiv, humidityDiv, dayObj) {
$(dateDiv).html(cardDate(dayObj.date));
$(weatherDiv).attr("src", pickWeatherImage(dayObj.weather));
$(temperatureDiv).html(convertToFahrenheit(dayObj.temperature) + "&#176;F");
$(humidityDiv).html(dayObj.humidity + "% humidity");
}

//function to choose needed weather image displayed in 5 day forecast
var pickWeatherImage = function(weather) {
switch (weather) {
    case 'Clear':
        return "./assets/images/snowy.png";
    case 'Clouds':
        return "./assets/images/cloudy.png";
    case 'Rain':
        return "./assets/images/sunny.png";
    case 'Snow':
        return "./assets/images/rainy.png"
    default:
        return "";
}
}

//needed for correct date on the 5 day forecast cards
var cardDate = function(dateString) {
var newDate;
var removeHours = dateString.slice(0, 10);
var dateArray = removeHours.split("-")
newDate = dateArray[1] + "/" + dateArray[2] + "/" + dateArray[0];
return newDate;
}

var formatUnixToDate = function(timestamp) {
var a = new Date(timestamp * 1000);
var date = a.getDate();
var month = a.getMonth() + 1;
var year = a.getFullYear();
var timeString = month + "/" + date + "/" + year;
return timeString; 
}

//simple formula conversion from kelvin to Fahrenheit so people know the "real world" temp
var convertToFahrenheit = function(k) {
var f = Math.round(((k - 273.15) * 9/5) + 32);
return f;
}

//shows the UV dangers outside, red is severe, yellow is moderate, and green is favorable
var pickUVIndexColor = function(cityUVIndex) {
if (cityUVIndex >= 6) {
    return 'red';
} else if (cityUVIndex >= 3) {
    return 'yellow';
} else {
    return 'green';
}
}
