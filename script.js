//to display current, date and time to user 
window.addEventListener('load', function() {
  // Get the current date and time
  var currentDate = new Date();
  var currentLocation = window.location;
  var currentTime = currentDate.toLocaleTimeString();

  // Update the HTML elements with the current date, location, and time
  document.getElementById('date').textContent = 'Current Date: ' + currentDate.toDateString();
  document.getElementById('location').textContent = 'Current Location: ' + currentLocation;
  document.getElementById('time').textContent = 'Current Time: ' + currentTime;
});




//for the OpenWeather API Functionality
$(document).ready(function () {
    $('#submit').click(function () {
        var city = $('#city').val();
        var apiKey = 'cff2aa1e3c91c0248805f01bed83e69c';  // Put your API key here

        if (city != '') {
            $.ajax({
                url: 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=imperial&appid=' + apiKey,
                type: 'GET',
                dataType: 'jsonp',
                success: function (data) {
                    var wind = data.wind.speed;
                    var humidity = data.main.humidity;
                    var clouds = data.clouds.all;
                    var tempF = data.main.temp;
                    var tempC = ((tempF - 32) * 5 / 9).toFixed(2);
                    var weatherDescription = data.weather[0].description;

                    $('.wind').html('wind speed: ' + wind);
                    $('.humidity').html('humidity: ' + humidity);
                    $('.cloudiness').html('cloudiness: ' + clouds);
                    $('.farenheit-temp').html(tempF + 'ºF');
                    $('.celsius-temp').html(tempC + 'ºC');
                    $('.weather-description').html(weatherDescription);

                    var options = { timeZone: data.timezone, hour: 'numeric', minute: 'numeric', hour12: false, year: 'numeric', month: 'numeric', day: 'numeric' };
                    var date = new Date().toLocaleString([], options);
                    $('.date').html(date);
                }
            });
        } else {
            alert('Field cannot be empty');
        }
    });
});
