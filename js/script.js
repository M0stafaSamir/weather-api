var search = document.getElementById("searchInput");
var city;
var weatherList;
var showBtn = document.getElementById("ShowAllWeek");
var rowData = document.getElementById("rowData");

search.addEventListener("input", function () {
  city = search.value;
  getWeather(city);
  showBtn.innerHTML = `<a><i class="fa-solid fa-plus"></i> show whole week</a>`;
  rowData.classList.remove("h-full");
  rowData.classList.add("h-0");
});

async function getWeather(city) {
  var response = await fetch(
    `http://api.weatherapi.com/v1/forecast.json?key=7411098327b74a02af3103454241706&q=07112&days=7`
  );
  var finalData = await response.json();

  weatherList = finalData;
  console.log(weatherList);
  display();
}
getWeather("cairo");

function display() {
  document.getElementById(
    "todayTemp"
  ).innerHTML = `  <i class="fa-solid fa-temperature-three-quarters"></i> ${weatherList.current.temp_c}&deg;C`;
  document.getElementById(
    "city"
  ).innerHTML = `<i class="fa-solid fa-location-dot"></i> ${weatherList.location.name}`;
  document.getElementById(
    "conditionImg"
  ).innerHTML = `<img src="https://${weatherList.current.condition.icon}" alt="condition" />`;
  document.getElementById(
    "condition"
  ).innerHTML = `${weatherList.current.condition.text}`;
  document.getElementById(
    "humidity"
  ).innerHTML = `<i class="fa-solid fa-umbrella"></i> ${weatherList.current.humidity}%`;
  document.getElementById(
    "windSpeed"
  ).innerHTML = `<i class="fa-solid fa-wind"></i> ${weatherList.current.wind_kph}km/h`;
  document.getElementById(
    "windDir"
  ).innerHTML = `<i class="fa-regular fa-compass"></i> ${weatherList.current.wind_dir}`;

  /* change numerical date to date name  */
  const last_updated = `${weatherList.current.last_updated}`;
  const dateOnly = last_updated.split(" ")[0];
  const dateObject = new Date(dateOnly);
  const dayName = dateObject.toLocaleDateString("en-US", { weekday: "long" });
  const options = { day: "numeric", month: "long" };
  const dayMonth = dateObject.toLocaleDateString("en-GB", options);
  document.getElementById("today").innerHTML = dayName;
  document.getElementById("todayDate").innerHTML = dayMonth;
  /********************/

  document.getElementById(
    "conditionImgNextDay"
  ).innerHTML = `<img src="https://${weatherList.forecast.forecastday[1].day.condition.icon}" alt="Condition tomorrow" />`;
  document.getElementById(
    "maxTempNextDay"
  ).innerHTML = `${weatherList.forecast.forecastday[1].day.maxtemp_c}&deg;C`;
  document.getElementById(
    "minTempNextDay"
  ).innerHTML = `${weatherList.forecast.forecastday[1].day.mintemp_c}&deg;C`;
  document.getElementById(
    "condtionNextDay"
  ).innerHTML = `${weatherList.forecast.forecastday[1].day.condition.text}`;

  /* change numerical date to date name  */
  const date1 = `${weatherList.forecast.forecastday[1].date}`;
  const date1Only = date1.split(" ")[0];
  const date1Object = new Date(date1Only);
  const tomorrow = date1Object.toLocaleDateString("en-US", { weekday: "long" });
  document.getElementById("tomorrow").innerHTML = tomorrow;
  /********************/

  document.getElementById(
    "conditionImgDayAfterTomorrow"
  ).innerHTML = `<img src="https://${weatherList.forecast.forecastday[2].day.condition.icon}" alt="Condition tomorrow" />`;
  document.getElementById(
    "maxTempDayAfterTomorrow"
  ).innerHTML = `${weatherList.forecast.forecastday[2].day.maxtemp_c}&deg;C`;
  document.getElementById(
    "minTempDayAfterTomorrow"
  ).innerHTML = `${weatherList.forecast.forecastday[2].day.mintemp_c}&deg;C`;
  document.getElementById(
    "conditionDayAfterTomorow"
  ).innerHTML = `${weatherList.forecast.forecastday[2].day.condition.text}`;

  /* change numerical date to date name  */
  const date2 = `${weatherList.forecast.forecastday[2].date}`;
  const date2Only = date2.split(" ")[0];
  const date2Object = new Date(date2Only);
  const afterTomorrow = date2Object.toLocaleDateString("en-US", {
    weekday: "long",
  });
  document.getElementById("dayAfterTomorrow").innerHTML = afterTomorrow;
  /********************/
}
