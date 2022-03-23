var apiKey = "1c5a8875c0ef6e356265df7b0a88878a";

// Function to display weather

function displayWeather(data) {

  $("#mainCityTemp")[0].textContent = data.current.temp + " \u2109";
  $("#mainCityHumidity")[0].textContent = data.current.humidity + "% ";
  $("#mainCityWind")[0].textContent = data.current.wind_speed.toFixed(1) + " MPH";
  $("#mainCityUV")[0].textContent = data.current.uvi;
}

// Function for getting info of searched city

function searchCity() {
  var cityCase = titleCase($("#location")[0].value.trim());

  var apiCall = "https://api.openweathermap.org/data/2.5/weather?q=" + cityCase + "&appid=" + apiKey;

  fetch(apiCall).then(function(response) {
    if (response.ok) {
      response.json().then(function(data) {

        $("#mainCityName")[0].textContent = cityCase + " (" + moment().format('M/D/YYYY') + ")";
        $("#searchedCities").append('<button type="button" class="list-group-item list-group-item-light list-group-item-action cityCase">' + cityCase);

        const lat = data.coord.lat;
        const long = data.coord.lon;

        var latLong = lat.toString() + "" + long.toString();

        localStorage.setItem(cityCase, latLong);

        apiCall = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + long + "&exclude=minutely,hourly&units=imperial&appid=" + apiKey;

        fetch(apiCall).then(function (newResponse) {
          if(newResponse.ok) {
            newResponse.json().then(function (newData) {
              displayWeather(newData);
            })
          }
        })
      })
    }else{
      alert("an error occured, cannot find the searched city");
    }
  })
}

$(".submitBtn").on("click", function(button) {
  button.preventDefault();

  searchCity();
})

// Function to make sure entered city is put in api call properly
function titleCase(city) {
  var updatedCity = city.toLowerCase().trim(" ");
  var returnedCity = "";
  for (var i = 0; i < updatedCity.length; i++) {
      updatedCity[i] = updatedCity[i][0].toUpperCase() + updatedCity[i].slice(1);
      returnedCity += " " + updatedCity[i];
  }
  return returnedCity;
}

function getFiveDayForecast () {
  let apiCallURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityCase + "&units=imperial&appid=" + apiKey;

  fetch(apiCallURL)
  .then(function(response){
    response.json().then(function(data){
      displayFiveDayForecast(data);
    })
  })
}