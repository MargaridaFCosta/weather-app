let now = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let month = months[now.getMonth()];
let day = days[now.getDay()];
let date = now.getDate();
let hour = now.getHours();
let minutes = now.getMinutes();

let today = document.querySelector("#today-date");
today.innerHTML = `${day}, ${date} ${month}, ${hour}:${minutes}`;

function submittCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  let cityInput = searchInput.value.trim();
  let apiKey = "bd5b4461863eddaa6ced0a0a67989e0a";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${apiKey}&units=metric`;
  if (cityInput) {
    axios.get(url).then(showWeater);
  }
}
function showWeater(response) {
  let city = document.querySelector("#current-city");
  let temperature = Math.round(response.data.main.temp);
  let rainLocation = Math.round(response.data.rain);
  let windLocation = Math.round(response.data.wind.speed);
  let humiLocation = Math.round(response.data.main.humidity);
  let actualTemp = document.querySelector("#temp");
  let rain = document.querySelector("#rain");
  let wind = document.querySelector("#wind");
  let humidity = document.querySelector("#humidity");
  city.innerHTML = response.data.name;
  actualTemp.innerHTML = `${temperature}`;
  rain.innerHTML = `${rainLocation}`;
  wind.innerHTML = `${windLocation}`;
  humidity.innerHTML = `${humiLocation}`;
}
let form = document.querySelector("#search-form");
form.addEventListener("submit", submittCity);

function getCoords(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "bd5b4461863eddaa6ced0a0a67989e0a";
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(url).then(showWeater);
}

function getLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getCoords);
}

let button = document.querySelector("#current");
button.addEventListener("click", getLocation);
