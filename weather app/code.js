let lat;
let long;
const apiKey = "6719d8b7087db025c6bd235f0a108459"

function startApp(){
    
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(
            (position) => {
                lat = position.coords.latitude;
                long = position.coords.longitude;

                console.log("lat: ", lat, "logn: ", long);

                getWeatherData()
            }
        );
    };
};

function getWeatherData(){
let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=${apiKey}&lang=en`;
console.log(url)

 fetch(url).then( function(response){
    response.json().then(function(data){
        updateWeatherData(data)
        console.log(data)
    });
 });
};

function updateWeatherData(data){
    const city = data.name;
    const temp = data.main.temp;
    const airHumidity = data.main.humidity;
    const pressure = data.main.pressure;
    const cloudiness = data.clouds.all;
    const windSpeed = data.wind.speed;
    const sunrise = new Date(data.sys.sunrise * 1000);
    const sunset = new Date(data.sys.sunset * 1000);
        
    
    
    const locationLink = document.getElementById("locationLink");
    locationLink.innerHTML = city;
    locationLink.href = `https://openstreetmap.org/#map=12/${lat}/${long}`;

    document.getElementById("temp").innerHTML= temp + "&#186;" + "C";

    document.getElementById("humidity").innerHTML= airHumidity + "%";

    document.getElementById("pressure").innerHTML= pressure + " hPa";

    document.getElementById("cloudsPrec").innerHTML= cloudiness + "%";

    document.getElementById("windSpeed").innerHTML= windSpeed + " km/h";

    document.getElementById("sunrise").innerHTML= sunrise.getHours() + ":" + sunrise.getMinutes() + " AM";

    document.getElementById("sunset").innerHTML= sunset.getHours() + ":" + sunrise.getMinutes() + " AM";

    let imgUrl = "https://openweathermap.org/img/wn/"+data.weather[0].icon+"@2x.png"
    document.getElementById("currentWeatherImg").setAttribute("src", imgUrl);
};