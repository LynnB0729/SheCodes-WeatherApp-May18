//for the OpenWeather API Functionality
var cityInput = document.getElementById('city');
var submitButton = document.getElementById('submit');
var apiKey = 'cff2aa1e3c91c0248805f01bed83e69c';

function getWeatherInfo() {
    var city = cityInput.value;
    if (city != '') {
        axios.get('https://api.openweathermap.org/data/2.5/weather', {
            params: {
                q: city,
                units: 'imperial',
                appid: apiKey
            }
        })
        .then(function(response) { 
            var data = response.data;
            var wind = data.wind.speed;
            var humidity = data.main.humidity;
            var clouds = data.clouds.all;
            var tempF = data.main.temp;
            var tempC = ((tempF - 32) * 5 / 9).toFixed(2);
            var weatherDescription = data.weather[0].description;
            
            //added this in for 5-day forecast-->
            var coordinates = data.coord; 
            getForecast(coordinates.lat, coordinates.lon);

            document.querySelector('.wind').innerHTML = 'wind speed: ' + wind + ' mph';
            document.querySelector('.humidity').innerHTML = 'humidity level: ' + humidity + '%';
            document.querySelector('.cloudiness').innerHTML = 'cloudiness: ' + clouds + '%';
            document.querySelector('.farenheit-temp').innerHTML = tempF + 'ºF';
            document.querySelector('.celsius-temp').innerHTML = tempC + 'ºC';
            document.querySelector('.weather-description').innerHTML = weatherDescription;
            document.getElementById('city-name').innerHTML = city;

            //these are here so I can check my own work... 
            console.log(response.data);
            //this is an object created by me called options. 
            var options = { 
                timeZone: data.timezone, //this gets the timezone from the data object, in the response object of the Open Weather API
                hour: 'numeric', 
                minute: 'numeric', 
                hour12: false, 
                year: 'numeric', 
                month: 'numeric', 
                day: 'numeric' //hour, minute, year, month, day are all options on how the date should be formatted using date() & .toLocaleString()
            };
            
            var date = new Date().toLocaleString([], options);
            document.getElementById('date').innerHTML = date;

        })
        .catch(function(error) {
            console.error(error);
        });
    } else {
        alert('Field cannot be empty');
    } 
};

submitButton.addEventListener('click', getWeatherInfo);
cityInput.addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
        getWeatherInfo();
    }
});

// here is the new, js code from other document for 5-day forecast 

function getForecast(lat, lon) {
    console.log('Latitude: ' + lat);
    console.log('Longitude: ' + lon);

    axios.get(`https://api.openweathermap.org/data/2.5/onecall`, {
            params: {
                appid: apiKey,
                lat: lat,
                lon: lon,
                units: 'imperial',
                exclude: 'current,minutely,hourly,alerts'
            }
        })
    .then(function(response) { 
        console.log("it worked")
        // Handle the response here, e.g., update the forecast
        displayForecast(response.data);
       
    })
    .catch(function(error) {
        console.error(error);
    });
    console.log("hello");
}

function displayForecast(data) {
    console.log("it worked ");
    var forecastElement = document.querySelector("#forecast");
    
    var forecastHTML = `<div class="row">`;
        for(let i = 0; i < 5; i++) {
        var date = new Date(data.daily[i].dt * 1000); // Convert from Unix timestamp to JavaScript date
        var day = date.toLocaleString('en-US', { weekday: 'long' }); // Get the day name
        var highTemp = data.daily[i].temp.max.toFixed(2);
        var lowTemp = data.daily[i].temp.min.toFixed(2);
        var icon = data.daily[i].weather[0].icon;
        var iconUrl = `http://openweathermap.org/img/wn/${icon}.png`;
        //this is what it looked like hard coded --> 
        //let days = ["Thursday", "Friday", "Saturday", "Sunday"];
        //days.forEach(function(day){

         forecastHTML = forecastHTML + `
    
    <div class="col">
                ${day}
                <img src="${iconUrl}" alt="" width="36">
                <div class="weather-forecast-temperatures">
                    <span class="weather-forecast-temperature-max">${highTemp}º</span>
                    <span class="weather-forecast-temperature-min">${lowTemp}º</span>
                </div>
            </div>
    </div>
    `; 
    }
    
    forecastHTML = forecastHTML + `</div>`;
    forecastElement.innerHTML = forecastHTML;
};

