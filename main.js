$(document).ready(function() {
    // BEGINNING OF CODE WHEN SITE IS OPENED, START WITH RETREIVING DATA FROM LOCAL STORAGE AND PREPOPULATING FIELDS WITH LAST SEARCHED RESULT
    
    // IF there is localStorage data THEN use it
    // ELSE create localStorage data with init city

    // Every time displayWeatherData is called, end the function by assigning the given city to localStorage

    // Every time displayWeatherData is called, at the beginning it will assign the city data to a new child appended in the history section
    // A click event listener will be placed on each history item
    // The event listener will call displayWeatherData with the given city data for each history item

    const decideIcon = (a, condition, element) => {
        // Assign "d" or "n" to time variable depending on if it is day or night
        let time = "";
        let icon;
        if (a == true) {
            time = "d";
        } else {
            time = "n";
        }

        // Icon Selection Logic
        if (condition === "Thunderstorm") {
            icon = "11";
        } else if (condition === "Drizzle") {
            icon = "09";
        } else if (condition === "Rain") {
            icon = "10";
        } else if (condition === "Snow") {
            icon = "13";
        } else if (condition === "Clear") {
            icon = "01";
        } else if (condition === "Clouds") {
            icon = "03";
        } else {
            icon = "50";
        }

        // ELEMENT
        element.attr("src", `http://openweathermap.org/img/wn/${icon}${time}@2x.png`);
    }
    
    const evaluateIcon = (iconData, element) => {
        // Evaluating if it is day/night based on the time
        let hour = parseInt(moment().format('h'));
        let a;
        if (moment().format('a') == "pm") {
            hour += 12;
        }
        console.log(hour);

        if (hour > 7 && hour < 20) {
            a = true;
        } else {
            a = false;
        }
        decideIcon(a, iconData, element);
    }

    const displayWeatherData = (city) => {
        // API KEY
        const apiKey = `92a52f12ad88e0808bda69b30af7592e`;

        // DAILY API URL
        const queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`; 

        // DAILY FORECAST API CALL
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {
            // Set search to localStorage
            const cityName = response.name;
            localStorage.setItem('cityData', cityName);
            
            const lon = response.coord.lon;
            const lat = response.coord.lat;
            const todayDate = moment().format('l');
            const todayIconData = response.weather[0].main;
            const todayTemp = Math.round(((response.main.temp-273.15)*1.8)+32);
            const todayHumidity = response.main.humidity;
            const todayWind = response.wind.speed;

            console.log(response);
            console.log(todayTemp);

            // FORECAST API URL
            const queryURL2 = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}`;

            $.ajax({
                url: queryURL2,
                method: "GET"
            }).then(function(response) {
                // TODAY'S WEATHER APPENDS
                const todayUV = response.daily[0].uvi;
                
                $("#location-name").text(cityName);
                $(".today-weather-date").text(todayDate);
                evaluateIcon(todayIconData, $(".today-weather-icon"));

                $("#today-weather-temperature").text(`${todayTemp}°`);
                $("#today-weather-humidity").text(todayHumidity);
                $("#today-weather-windspeed").text(todayWind);
                $("#today-weather-UVindex").text(todayUV);

                // Console Log Second API Call
                console.log(response);

                // Five Day Forecast Appends
                const forecastArray = document.querySelectorAll(".forecast-card");
                for (let i = 1; i <= forecastArray.length; i++) {
                    const forecastIcon = response.daily[i].weather[0].main;
                    const forecastTemp = Math.round(((response.daily[i].temp.day-273.15)*1.8)+32);
                    const forecastHumidity = response.daily[i].humidity;
                    

                    $(`h3[data-id=${i}]`).text(moment().add(i, 'days').format('l'));
                    evaluateIcon(forecastIcon, $(`.forecast-icon[data-id=${i}]`));
                    $(`.forecast-temperature[data-id=${i}]`).text(`${forecastTemp}°`);
                    $(`.forecast-humidity[data-id=${i}]`).text(forecastHumidity);
                }
            });
        });
    }

    // Auto fill page with previous search results based on localStorage **********
    
    let cityData = localStorage.getItem('cityData');

    if (cityData === null) {
        displayWeatherData("Seattle");
    } else {
        displayWeatherData(cityData);
    }

    // Search Button "click" event listener
    $("#search-btn").on("click", (e) => {
        e.preventDefault();
        const city = $("#city-search").val().trim();
        $("#city-search").val("");
        displayWeatherData(city);
    });


    // console.log(weather);

      

    // $.ajax({
    //     url: queryURL,
    //     method: "GET"
    // }).then(function(response) {
    //     console.log(response);
    // });
});


// FIRST API
// response.name => Location name
// response.weather[0].main =>
// response.weather[0].icon

// response.main.temp => Temperature
// response.main.humidity => Humidity
// response.wind.speed => Wind Speed
// response.sys.country => Country Name

// SECOND API
// response.coord.lon => longtitude
// response.coord.lat => Lattitude


// http://openweathermap.org/img/wn/${iconID}@2x.png => ICON LINK

// moment.js for 5 all dates in the app ("Calendar Time" section for adding days for 5 day forecast)

// $(".today-weather-icon")
// $("img[data-id=${id}]")