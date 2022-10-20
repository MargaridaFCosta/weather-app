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
if (hour < 10) {
  hour = `0${hour}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let today = document.querySelector("#today-date");
today.innerHTML = `${day}, ${date} ${month}, ${hour}:${minutes}`;

function submittCity(searchInput) {
  let apiKey = "ato2b04e4f46da013787d91355bf798f";
  let url = `https://api.shecodes.io/weather/v1/current?query=${searchInput}&key=${apiKey}&units=metric`;
  axios.get(url).then(showWeater);
}

function handleSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input").value;
  submittCity(searchInput);
}

function showWeater(response) {
  let city = document.querySelector("#current-city");
  let temperature = Math.round(response.data.temperature.current);
  let descriptionLocation = response.data.condition.description;
  let windLocation = Math.round(response.data.wind.speed);
  let humiLocation = Math.round(response.data.temperature.humidity);
  let actualTemp = document.querySelector("#temp");
  let description = document.querySelector("#description");
  let wind = document.querySelector("#wind");
  let humidity = document.querySelector("#humidity");
  city.innerHTML = response.data.city;
  actualTemp.innerHTML = `${temperature}`;
  description.innerHTML = `${descriptionLocation}`;
  wind.innerHTML = `${windLocation}`;
  humidity.innerHTML = `${humiLocation}`;
}

function getCoords(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "ato2b04e4f46da013787d91355bf798f";
  let url = `https://api.shecodes.io/weather/v1/current?lon=${lon}&lat=${lat}&key=${apiKey}&units=metric`;
  axios.get(url).then(showWeater);
}

function getLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getCoords);
}
let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let button = document.querySelector("#current");
button.addEventListener("click", getLocation);

submittCity("Lisboa");
