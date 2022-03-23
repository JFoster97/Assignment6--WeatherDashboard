var apiKey = "1c5a8875c0ef6e356265df7b0a88878a";

// Function to display weather in

// Function for getting info of searched city

function searchCity() {
  var cityCase = titleCase($("#mainCityName")[0].value.trim());

  var apiCall = "https://api.openweathermap.org/data/2.5/weather?q=" + cityCase + "&appid=" + apiKey;

  fetch(apiCall).then(function(response) {
    if (response.ok) {
      response.json().then(function(data) {

        $("#mainCityName")[0].textContent = cityCase + " (" + moment().format('M/D/YYYY') + ")";
        $("#searchedCities").append('<li><button type="button" class="list-group-item list-group-item-light list-group-item-action cityName"></li>' + cityName);

        const lat = data.coord.lat;
        const long = data.coord.lon;

        var latLong = lat.tostring() + "" + long.tostring();

        localStorage.setItem(cityCase, latLong);

        apiCall = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + long + "&exclude=minutely,hourly&units=imperial&appid=" + apiKey;

        fetch(apiCall).then(function(newResponse) {
          if(newResponse.ok) {
            newResponse.json().then(function (newData) {
              getCurrentWeather(newData);
            })
          }
        })
      })
    }else{
      alert("an error occured, cannot find the searched city");
    }
  })
}

$("#submitBtn").on("click", function (i) {
  i.preventDefault();

  searchCity();

  $("main")[0].reset();
})

