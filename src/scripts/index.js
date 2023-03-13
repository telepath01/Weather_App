'use strict';
const locationSubmitBtn = document.querySelector('.location-submit');
const locations = document.querySelector('.location-input');

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
      ferenhitConverter(response.main.temp);
    });
}

function ferenhitConverter(kelvin) {
  const converter = ((kelvin - 273.15) * 9) / 5 + 32;
  let ferenhitValue = converter;
  console.log(ferenhitValue);
}
