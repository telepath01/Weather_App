'use strict';
const locationSubmitBtn = document.querySelector('.location-submit');
const locations = document.querySelector('.location-input');
const mainValue = document.querySelector('.main-value');
const speedValue = document.querySelector('.speed-value');

locationSubmitBtn.addEventListener('click', (event) => {
  weatherLookUp();
});

async function weatherLookUp() {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${locations.value}&appid=055c2789f657a5bf34fa699fde5bbae8`,
    { mode: 'cors' }
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (response) {
      console.log(response);
      mainValueData(
        ferenhitConverter(response.main.temp),
        windSpeedConverter(response.wind.speed)
      );
    });
}

function ferenhitConverter(kelvin) {
  const converter = ((kelvin - 273.15) * 9) / 5 + 32;
  let ferenhitValue = converter.toFixed(2);
  return ferenhitValue;
}
function windSpeedConverter(windspeed) {
  const converter = windspeed * 2.237;
  let windspeedValue = converter.toFixed(1);
  console.log(windspeedValue);
  return Number(windspeedValue);
}

function mainValueData(mainTemp, speedValue) {
  mainValue.textContent = `${Number(mainTemp)}°`;
  speedValue.textContent = `${speedValue} mph`;
}
