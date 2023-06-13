//for the OpenWeather API Functionality
var cityInput = document.getElementById('city');
var submitButton = document.getElementById('submit');

function getWeatherInfo() {
    var city = cityInput.value;
    var apiKey = 'cff2aa1e3c91c0248805f01bed83e69c';

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

            document.querySelector('.wind').innerHTML = 'wind speed: ' + wind + ' mph';
            document.querySelector('.humidity').innerHTML = 'humidity level: ' + humidity + '%';
            document.querySelector('.cloudiness').innerHTML = 'cloudiness: ' + clouds + '%';
            document.querySelector('.farenheit-temp').innerHTML = tempF + 'ºF';
            document.querySelector('.celsius-temp').innerHTML = tempC + 'ºC';
            document.querySelector('.weather-description').innerHTML = weatherDescription;
            document.getElementById('city-name').innerHTML = city;

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
}

submitButton.addEventListener('click', getWeatherInfo);
cityInput.addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
        getWeatherInfo();
    }
});
