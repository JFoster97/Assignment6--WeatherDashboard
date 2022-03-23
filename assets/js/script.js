var apiKey = "1c5a8875c0ef6e356265df7b0a88878a";

var searchFormEl = document.querySelector('#search-form');

function handleSearchFormSubmit(event) {
  event.preventDefault();

  var searchInputVal = document.querySelector('#search-input').value;
  var formatInputVal = document.querySelector('#format-input').value;

  if (!searchInputVal) {
    alert('please search for a city')
    console.error('You need a search input value!');
    return;
  }

  var queryString = './search-results.html?q=' + searchInputVal + '&format=' + formatInputVal;

  location.assign(queryString);
}

searchFormEl.addEventListener('submit', handleSearchFormSubmit);

function listForecast(city){
  var apiCallURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey;

  $.ajax({
      url: apiCallURL,
      method: "GET"
  }).then(function(response){
      var weatherIcon = response.weather[0].icon;
      var date = $("<h2>").text(moment().format('l'));
      var icon = $("<img>").attr("src", "https://openweathermap.org/img/wn/" + weatherIcon + "@2x.png"); 
      var farenheit = (response.main.temp - 273.15) * 1.80 + 32;

      $("mainCityName").text(response.name);
      $("mainCityName").append(date);
      $("mainCityName").append(icon);
      $("mainCityTemp").text(farenheit.toFixed(2) + " \u00B0F");
      $("mainCityHumidity").text(response.main.humidity + "%");
      $("mainCityWind").text(response.wind.speed + "MPH");

      $.ajax({
        url: apiCallURL,
        method: "GET"
      }).then(function(response) {
        $("#mainCityUV").text(response.value);});
      })
}
