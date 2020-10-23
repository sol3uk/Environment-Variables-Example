let latLong = {};

$('button').click(function () {
    getLocation();
});

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(doWeatherSearch);
    } else {
        $('#latLongDetails').text("Geolocation is not supported by this browser.");
    }
}

function doWeatherSearch(position) {
    latLong = {
        lat: position.coords.latitude,
        long: position.coords.longitude
    };
    $('#latLongDetails').html(
        "<b>Latitude:</b> "    + position.coords.latitude + "</br>" +
        "<b>Longitude:</b> "  + position.coords.longitude);

    ajaxCall();
}


function ajaxCall() {
    const apiKey = API_KEY;
    const iconHrefStart = "http://openweathermap.org/img/wn/";
    const iconHrefEnd = "@2x.png";
    let url = "http://api.openweathermap.org/data/2.5/weather" + 
    "?lat=" + latLong.lat + "&lon=" + latLong.long + 
    "&units=metric" + 
    "&appid=" + apiKey
    $.ajax({
        url: url,
        type: "GET",
        dataType: "jsonp",
        success: function (data) {
            console.log(data);
            const w = data.weather[0];
            $("#cityName").text(data.name);
            $("#weatherDetails").html(
                '<b>Description: </b>'+ w.main + '</br>' +
                '<b>Temp: </b>'+ data.main.temp + ' °C</br>' +
                '<b>Wind Speed: </b>'+ data.wind.speed + ' meter/sec </br>' +
                '<img src="' + iconHrefStart + w.icon + iconHrefEnd + '">'
                )
        },
        error: function(){
            $("#weatherDetails").text("Something went wrong!");
        }
    });
        
}