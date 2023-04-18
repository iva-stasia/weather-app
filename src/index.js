import showAvailableCities from './modules/show-cities-list';
import setBg from './modules/set-bg';
import displayMainData from './modules/display-main-data';
import displayDailyForecast from './modules/display-forecast';
import displayAstroData from './modules/display-astro';

const URL_FORECAST =
  'https://api.weatherapi.com/v1/forecast.json?key=5d1433c0927249158fb111723230504&q=';

const findCityBtn = document.querySelector('#findCityBtn');
const moreBtn = document.querySelector('#moreBtn');
const closeForecastModalBtn = document.querySelector('#closeForecastModalBtn');

function closeModal(modal) {
  if (!modal.classList.contains('visible')) {
    return;
  }

  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
      modal.classList.remove('visible', 'opacity-100');
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.keyCode === 27) {
      modal.classList.remove('visible', 'opacity-100');
    }
  });
}

function getData(URL) {
  fetch(URL)
    .then((response) => response.json())
    .then((data) => {
      setBg(data);
      displayMainData(data);
      displayDailyForecast(data.forecast.forecastday);
      displayAstroData(data.forecast.forecastday[0].astro);
    })
    .catch((error) => {
      console.log(error);
      alert("Ops, something's wrong. Please try again!");
    });
}

function getDataByCity() {
  const selectCityModal = document.querySelector('#modalCity');
  const selectCityInput = document.querySelector('#selectedCity');
  const showWeatherBtn = document.querySelector('#showWeatherBtn');

  selectCityModal.classList.add('visible', 'opacity-100');

  showAvailableCities(selectCityInput);

  showWeatherBtn.addEventListener('click', () => {
    if (selectCityInput.value) {
      selectCityModal.classList.remove('visible', 'opacity-100');
      const URL = `${URL_FORECAST + selectCityInput.value}&days=7`;
      getData(URL);
      selectCityInput.value = '';
    }
  });

  closeModal(selectCityModal);
}

function showForecastModal() {
  const forecastSection = document.querySelector('#forecastSection');
  forecastSection.classList.toggle('lg:-right-96');
  forecastSection.classList.toggle('-right-full');
  forecastSection.classList.toggle('right-0');

  document.querySelector('#mainSection').classList.toggle('lg:mr-96');
  document.querySelector('#moreBtnArrow').classList.toggle('rotate-180');
}

function update() {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      const URL = `${URL_FORECAST + position.coords.latitude},${
        position.coords.longitude
      }&days=7`;
      getData(URL);
    },
    (error) => {
      console.log(error);
      getDataByCity();
    }
  );
}

update();
findCityBtn.addEventListener('click', getDataByCity);
moreBtn.addEventListener('click', showForecastModal);
closeForecastModalBtn.addEventListener('click', showForecastModal);
