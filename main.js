$(document).ready(function() {
    const cityName = `Paris`;
    const apiKey = `92a52f12ad88e0808bda69b30af7592e`;
    const queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`
    
    let location = "";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response);
    });

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response);
    });
})
// FIRST API
// response.name => Location name
// response.weather[0].main =>
// response.weather[0].icon

// response.main.temp => Temperature
// response.main.humidity => Humidity
// response.wind.speed => Wind Speed
// response.main

// SECOND API
// response.coord.lon => longtitude
// response.coord.lat => Lattitude


// http://openweathermap.org/img/wn/${iconID}@2x.png => ICON LINK

// moment.js for 5 all dates in the app ("Calendar Time" section for adding days for 5 day forecast)
