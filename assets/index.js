document.getElementById('city-form').addEventListener('submit', function(event) {
    event.preventDefault();
    var city = document.getElementById('city-input').value;
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=8f62f91c23e957086b5997909bf7a24e`)
        .then(response => response.json())
        .then(data => {
            var iconCode = data.weather[0].icon;
            var iconUrl = "http://openweathermap.org/img/w/" + iconCode + ".png";
            var img = document.createElement('img');
            img.src = iconUrl;
            document.getElementById('current-weather').appendChild(img);


            // Converted temperature to Celsius
            var tempC = data.main.temp - 273.15;
            // Converted temperature to Fahrenheit
            var tempF = (data.main.temp - 273.15) * 9/5 + 32;


            var weatherInfo = document.createElement('p');
            weatherInfo.textContent = `City: ${data.name}\nTemperature: ${tempC.toFixed(2)}°C (${tempF.toFixed(2)}°F)\nHumidity: ${data.main.humidity}%\nWind Speed: ${data.wind.speed} m/s`;
            document.getElementById('current-weather').appendChild(weatherInfo);
        });
    fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=8f62f91c23e957086b5997909bf7a24e`)
        .then(response => response.json())
        .then(data => {
            var forecastDiv = document.getElementById('forecast');
            forecastDiv.innerHTML = '';
            for (var i = 0; i < data.list.length; i += 8) {
                var tempC = data.list[i].main.temp - 273.15;
                var tempF = (data.list[i].main.temp - 273.15) * 9/5 + 32;
                var forecastInfo = document.createElement('p');
                forecastInfo.textContent = `Date: ${data.list[i].dt_txt}\nTemperature: ${tempC.toFixed(2)}°C (${tempF.toFixed(2)}°F)\nHumidity: ${data.list[i].main.humidity}%`;
                forecastDiv.appendChild(forecastInfo);
            }
        });
    localStorage.setItem('city', city);
});

