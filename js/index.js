let search = document.querySelector("#search");
let btn = document.querySelector(".btn");
let alert = document.querySelector(".alert");

let weather = [];

async function getWeather(location) {
  try {
    const api = await fetch(
      `https://api.weatherapi.com/v1/search.json?key=e57f09f23d8b472fa05140714242812&q=${location}`
    );
    const response = await api.json();
    console.log(response); // تأكد من الاستجابة في الـ console
    
    if (response.length === 0) {
      alert.classList.remove("d-none");
      alert.innerHTML = "No Matching Location";
      return;
    }

    // اختيار أول مدينة في القائمة
    const city = response[0]; // أول مدينة في القائمة
    getWeatherForCity(city);
    
  } catch (error) {
    console.error(error);
    alert.classList.remove("d-none");
    alert.innerHTML = "API Error or No Matching Location!";
  }
}

async function getWeatherForCity(city) {
  try {
    const api = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=e57f09f23d8b472fa05140714242812&q=${city.lat},${city.lon}&days=7`
    );
    const response = await api.json();
    console.log(response); // تأكد من استجابة الطقس في الـ console
    weather = response;
    display();
    alert.classList.add("d-none");
  } catch (error) {
    console.error(error);
    alert.classList.remove("d-none");
    alert.innerHTML = "Unable to fetch weather data!";
  }
}

function display() {
  alert.classList.add("d-none");
  let forecast = weather.forecast.forecastday[0];
  let week = ``;
  let todayWeather = weather.forecast;
  for (let i = 0; i < 7; i++) {
    let todaye = todayWeather.forecastday[i];
    let todayDateObj = new Date(todaye.date);
    let todayDay = todayDateObj.getDate();
    let todayWeek = todayDateObj.toLocaleString("en-us", { weekday: "long" });
    let todayMonth = todayDateObj.toLocaleString("en-us", { month: "long" });

    week += `
    <div class="text-center pt-3 bg-transparent text-light">
                    <div class="border-bottom">
                        <div class="cont-data d-flex justify-content-around align-items-baseline">
                            <div class="day w-25">
                                <h5 class="h6">
                                    ${todayWeek}
                                </h5>
                            </div>
                            <div class="icon">
                                <img src="${todaye.day.condition.icon}" alt="${todaye.day.condition.text}">
                            </div>
                            <div class="date">
                                ${todayDay} /  ${todayMonth}
                            </div>
                        </div>
                    </div>
                </div>
    `;
  }

  let cartona = `
        <div class="col-6">
        <h1 class="h2">${weather.location.name}</h1>
                     <p class="text-dark-emphasis lead">Chance of rain: ${forecast.day.daily_chance_of_rain}%</p>
                    <div class="d-flex  justify-content-between">
                    <div>
                    <h2 class="h5 pt-4">Max Temp</h2>
                    <p class="text-dark-emphasis lead">
                    ${forecast.day.maxtemp_c}°C
                    </p>
                    </div>
                     <div>
                    <h3 class="h5 pt-4">Min Temp</h3>
                    <p class="text-dark-emphasis lead">
                    ${forecast.day.mintemp_c}°C
                    </p>
                    </div>
                    </div>
                </div>
                 </div>
                <div class="col-lg-6 text-center">
                <h3>${weather.current.condition.text}</h3>
                <img src="${weather.current.condition.icon}" class="w-50" alt="temp icon" />
                </div>
        `;
  let content = `
                        <h3 class="h6 text-dark-emphasis">AIR CONDITIONS</h3>
                        <div class="content row">
                        <div class="card col-6 bg-transparent text-light border-0">
                        <div class="card-header border-0">
                            <h4 class="text-dark-emphasis h6">
                             <i class="fa-solid fa-temperature-three-quarters"></i> Real Feel
                            </h4>
                            <h5 class="card-title">
                            ${forecast.day.avgtemp_c}°C
                            </h5>
                        </div>
                        <div class="card-body border-0">
                            <h4 class="text-dark-emphasis h6">
                             <i class="fa-solid fa-snowflake"></i> Chance of Snow
                            </h4>
                            <h5 class="card-title">
                            ${forecast.day.daily_chance_of_snow}%
                            </h5>
                        </div>
                    </div>
                    <div class="card col-6 bg-transparent text-light border-0">
                        <div class="card-header border-0">
                            <h4 class="text-dark-emphasis h6">
                             <i class="fa-solid fa-wind"></i> Wind
                            </h4>
                            <h5 class="card-title">
                            ${forecast.day.maxwind_mph} Km/h
                            </h5>
                        </div>
                        <div class="card-body border-0">
                            <h4 class="text-dark-emphasis h6">
                             <i class="fa-solid fa-sun"></i> UV index
                            </h4>
                            <h5 class="card-title">
                            ${forecast.day.uv}
                            </h5>
                        </div>
                    </div>
                    </div>
        `;
  let astro = `
                        <div class="card col-6 bg-transparent text-light border-0">
                        <div class="card-header border-0">
                            <h4 class="h6">
                             sunrise
                            </h4>
                            <h5 class="card-title text-dark-emphasis">
                            ${forecast.astro.sunrise}
                            </h5>
                        </div>
                        <div class="card-body border-0">
                            <h4 class="h6">
                             sunset
                            </h4>
                            <h5 class="card-title text-dark-emphasis">
                            ${forecast.astro.sunset}
                            </h5>
                        </div>
                    </div>
                    <div class="card col-6 bg-transparent text-light border-0">
                        <div class="card-header border-0">
                            <h4 class="h6">
                             moonrise
                            </h4>
                            <h5 class="card-title text-dark-emphasis">
                            ${forecast.astro.moonrise}
                            </h5>
                        </div>
                        <div class="card-body border-0">
                            <h4 class="h6">
                             moonset
                            </h4>
                            <h5 class="card-title text-dark-emphasis">
                            ${forecast.astro.moonset}
                            </h5>
                        </div>
                    </div>
                    </div>
        `;
  document.querySelector(".location").innerHTML = cartona;
  document.querySelector(".AIR").innerHTML = content;
  document.querySelector(".cont").innerHTML = week;
  document.querySelector(".astro").innerHTML = astro;
}

btn.addEventListener("click", function (eventInfo) {
  alert.classList.add("d-none");
  let city = search.value;
  getWeather(city);
  clear();
});

function clear() {
  search.value = "";
  alert.classList.add("d-none");
}

document.querySelector("form").addEventListener("submit", function (event) {
  event.preventDefault();
});

if (navigator.geolocation) {
  alert.classList.add("d-none");
  navigator.geolocation.getCurrentPosition((position) => {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    let q = `${latitude},${longitude}`;
    getWeather(q);
  });
}
