$(document).ready(function() {
    // BEGINNING OF CODE WHEN SITE IS OPENED, START WITH RETREIVING DATA FROM LOCAL STORAGE AND PREPOPULATING FIELDS WITH LAST SEARCHED RESULT
    
    const decideIcon = (a, condition, element) => {
        let time = "";
        let icon;
        if (a == true) {
            time = "d";
        } else {
            time = "n";
        }

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

    $("#search-btn").on("click", (e) => {
        e.preventDefault();

        console.log(moment().format('h'));

        // const evaluateIcon = () => {
        //     let hour = moment().format('h');
        //     console.log(typeof hour);
        //     // if ()
        // }

        const city = $("#city-search").val().trim();
        $("#city-search").val("");

        // API KEY
        const apiKey = `92a52f12ad88e0808bda69b30af7592e`;

        // DAILY API URL
        const queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`; 

        // DAILY FORECAST API CALL
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {
            const lon = response.coord.lon;
            const lat = response.coord.lat;
            const cityName = response.name;
            const todayDate = moment().format('l');
            const todayIconData = response.weather[0].main;
            const todayTemp = Math.round(((response.main.temp-273.15)*1.8)+32);
            const todayHumidity = response.main.humidity;
            const todayWind = response.wind.speed;

            console.log(response);
            console.log(todayTemp);

            // WEEKLY API URL
            const queryURL2 = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}`;

            $.ajax({
                url: queryURL2,
                method: "GET"
            }).then(function(response) {
                // TODAY'S WEATHER APPENDS
                $("#location-name").text(cityName);
                $(".today-weather-date").text(todayDate);
                evaluateIcon(todayIconData, $(".today-weather-icon"));
                // $(".today-weather-icon")
                // $("img[data-id=${id}]")

                $("#today-weather-temperature").text(`${todayTemp}°`);
                $("#today-weather-humidity").text(todayHumidity);
                $("#today-weather-windspeed").text(todayWind);
            });
        });

        // WEEKLY FORECAST API CALL


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
