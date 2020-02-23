window.onload = function() {
    const apiKey = "b26deda1e0958c486669400ec01f8a57";
    //Буде знаходити погоду по вашому місці розташування
    let long;
    let lat;
    navigator.geolocation.getCurrentPosition(function(data) {
        long = data.coords.longitude;
        lat = data.coords.latitude;

        const defaultQueryString = `lat=${lat}&lon=${long}`;
        const api = createApi(defaultQueryString);

        function createApi(defaultQueryString) {
            return `https://api.openweathermap.org/data/2.5/weather?${defaultQueryString}&appid=${apiKey}`;
        }





        const deg = document.getElementById("degree");
        deg.innerHTML = "°";

        function transformTemperature(temp) {
            return (temp - 273.15).toFixed();
        }

        const tempDiv = document.getElementById("temp");
        const speed = document.getElementById("speed");
        const humidity = document.getElementById("humidity");
        const clouds = document.getElementById("clouds");
        const city = document.getElementById("default-city");
        const country = document.getElementById('country');
        const icon = document.getElementById("weather-icons");
        const description = document.getElementById("description");
        const button = document.getElementById('search');


        function getData(api) {
            return fetch(api)
                .then(res => res.json())
                .then(res => {
                    tempDiv.innerHTML = transformTemperature(res.main.temp); //main в консоле
                    speed.innerHTML = res.wind.speed;
                    humidity.innerHTML = res.main.humidity;
                    city.innerHTML = res.name;
                    country.innerHTML = res.sys.country;
                    clouds.innerHTML = res.clouds.all;
                    description.innerHTML = res.weather[0].description;

                    console.log(res);

                    //іконки автоматично міняються
                    icon.innerHTML = `<img src=  https://openweathermap.org/img/wn/${res.weather[0].icon}.png class='weather-icons'>`;
                });
        }
        getData(api);


        const result = document.getElementById("clock");

        function getInterval() {
            const data = new Date();
            let hours = data.getHours();
            let minutes = data.getMinutes();
            let seconds = data.getSeconds();
            if (hours < 10) {
                hours = `0${hours}`;
            }
            if (minutes < 10) {
                minutes = `0${minutes}`;
            }
            if (seconds < 10) {
                seconds = `0${seconds}`;
            }
            result.innerHTML = `${hours}:${minutes}:${seconds}`;
        }
        setInterval(getInterval, 1000);

        button.addEventListener('click', function() {
            const search = document.querySelector('input'); //input.value
            const api = createApi(`q=${search.value}`);
            getData(api); //вызвали функцию fetch

        });
    });
}