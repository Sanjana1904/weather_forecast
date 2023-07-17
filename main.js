var locationInput = document.getElementById('location-input');
var weatherInfoDiv = document.getElementById('weather-info');
var button = document.querySelector('.submit');

button.addEventListener('click', function(event) {
  event.preventDefault(); // Prevent form submission
  
  fetch('https://api.openweathermap.org/data/2.5/weather?q=' + locationInput.value + '&appid=f4a0b5f21aac35f00417836bc5a1c59c')
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('City not found');
      }
    })
    .then(data => {
      var tempKelvin = data['main']['temp'];
      var tempCelsius = (tempKelvin-275.15).toFixed(2);
      var nameValue = data['name'];
      var humidityValue = data['main']['humidity'];
      var descValue = data['weather'][0]['description']; 

      
      weatherInfoDiv.innerHTML = "<p>Location -" +nameValue + "</p>";
      weatherInfoDiv.innerHTML += "<p>Temp - " + tempCelsius + "&deg;C</p>";
      weatherInfoDiv.innerHTML += "<p>Desc - " + descValue + "</p>";
      weatherInfoDiv.innerHTML += "<p>Humidity - " + humidityValue + "</p>";

      locationInput.value = '';
    })
    .catch(error => {
      weatherInfoDiv.innerHTML = "<p>" + error.message + "</p>";
    });
});
