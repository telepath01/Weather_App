'use strict';
const locationSubmitBtn = document.querySelector('.location-submit');
const locations = document.querySelector('.location-input');
const mainValue = document.querySelector('.main-value');
const speedValue = document.querySelector('.speed-value');
const minValue = document.querySelector('.min-value');
const maxValue = document.querySelector('.max-value');
const humidityValue = document.querySelector('.humidity-value');
const pressureValue = document.querySelector('.pressure-value');
const locationValue = document.querySelector('.location-heading');
const arrowImg = document.querySelector('.arrow-img');
const cardTransition = document.querySelector('.weather-cards');
const sliderBall = document.querySelector('.ball');
const riddleTitle = document.querySelector('.riddle-title');
const riddleQuestion = document.querySelector('.riddle-question');
const riddleAnswer = document.querySelector('.riddle-answer');

const tempValue = 'f';

locationSubmitBtn.addEventListener('click', (event) => {
  weatherLookUp();
  quoatLookUp();
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
        windSpeedConverter(response.wind.speed),
        ferenhitConverter(response.main.temp_min),
        ferenhitConverter(response.main.temp_max),
        response.main.humidity,
        response.main.pressure,
        locations.value,
        response.wind.deg
      );
      appTransitions();
      sliderActivation(
        ferenhitConverter(response.main.temp),
        ferenhitConverter(response.main.temp_min),
        ferenhitConverter(response.main.temp_max),
        windSpeedConverter(response.wind.speed),
        response.main.humidity,
        response.main.pressure,
        locations.value,
        response.wind.deg
      );
    });
}

async function quoatLookUp() {
  fetch('https://api.api-ninjas.com/v1/riddles', {
    mode: 'cors',
  })
    .then(function (respons) {
      return respons.json();
    })
    .then(function (respons) {
      console.log(respons);
      riddleDisplay(respons[0].title, respons[0].question, respons[0].answer);
    });
}

function celciusConverter(tempature) {
  const converter = ((tempature - 32) * 5) / 9;
  let celciusValue = converter.toFixed(2);
  return celciusValue;
}

function ferenhitConverter(kelvin) {
  const converter = ((kelvin - 273.15) * 9) / 5 + 32;
  let ferenhitValue = converter.toFixed(2);
  return Number(ferenhitValue);
}
function windSpeedConverter(windspeed) {
  const converter = windspeed * 2.237;
  let windspeedValue = converter.toFixed(1);
  console.log(windspeedValue);
  return Number(windspeedValue);
}
function appTransitions() {
  cardTransition.style.opacity = 1;
  cardTransition.style.transform = 'translateY(0)';
}
function mainValueData(
  mainTemp,
  speedVal,
  minTemp,
  maxTemp,
  humidityVal,
  pressureVal,
  locationVal,
  directionVal
) {
  mainValue.textContent = `${mainTemp}°`;
  minValue.textContent = `${minTemp}°`;
  maxValue.textContent = `${maxTemp}°`;
  humidityValue.textContent = `${humidityVal}%`;
  pressureValue.textContent = `${pressureVal} hPa`;
  locationValue.textContent = locationVal;
  arrowImg.style.transform = `rotate(${directionVal}deg)`;
  speedValue.textContent = `${speedVal} mph`;
}
function sliderActivation(
  maintempature,
  minTemprature,
  maxTemprature,
  speedVal,
  humidityVal,
  locationVal,
  directionVal
) {
  sliderBall.addEventListener('click', (event) => {
    if (sliderBall.style.transform === '') {
      mainValueData(
        celciusConverter(maintempature),
        speedVal,
        celciusConverter(minTemprature),
        celciusConverter(maxTemprature),
        humidityVal,
        locationVal,
        directionVal
      );
      sliderBall.style.transform = 'translateX(30px)';
    } else if (sliderBall.style.transform === 'translateX(30px)') {
      mainValueData(
        maintempature,
        speedVal,
        minTemprature,
        maxTemprature,
        humidityVal,
        locationVal,
        directionVal
      );
      sliderBall.style.transform = '';
    }
  });
}
function riddleDisplay(title, question, answer) {
  riddleTitle.textContent = title;
  riddleQuestion.textContent = question;
  riddleAnswer.textContent = answer;
}
