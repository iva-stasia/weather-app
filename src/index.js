import { showAvailableCities } from './show-cities-list.js';

// TODO change background
// TODO forecast

const findCityBtn = document.querySelector('#findCityBtn');

update();
findCityBtn.addEventListener('click', findDataByCity);

function update() {
    navigator.geolocation.getCurrentPosition(
        function success(position) {
            const URL = `http://api.weatherapi.com/v1/current.json?key=5d1433c0927249158fb111723230504&q=${position.coords.latitude},${position.coords.longitude}`;
            findData(URL);
        },
        function error(error) {
            console.log(error);
            findDataByCity();
        }
    );
}

function findDataByCity() {
    const selectCityModal = document.querySelector('#modalCity');
    const selectCityInput = document.querySelector('#selectedCity');
    const showWeatherBtn = document.querySelector('#showWeatherBtn');

    selectCityModal.classList.add('visible', 'opacity-100');

    showAvailableCities(selectCityInput);

    showWeatherBtn.addEventListener('click', () => {
        if (selectCityInput.value) {
            selectCityModal.classList.remove('visible', 'opacity-100');
            const URL = `http://api.weatherapi.com/v1/current.json?key=5d1433c0927249158fb111723230504&q=${selectCityInput.value}`;
            findData(URL);
            selectCityInput.value = '';
        }
    });
}

function findData(URL) {
    fetch(URL)
        .then((response) => response.json())
        .then((data) => {
            // console.log(data);

            const mainData = createMainDataObj(data);
            displayData(mainData);
        })
        .catch((error) => {
            console.log('Ops! \n' + error);
            alert("Oops, something's wrong. Please try again!");
            location.reload();
        });
}

function createMainDataObj(data) {
    const mainData = {};

    mainData.temp = data.current.temp_c;
    mainData.icon = data.current.condition.icon;
    mainData.condition = data.current.condition.text;
    mainData.city = data.location.name;
    mainData.country = data.location.country;
    mainData.currentTime = data.location.localtime;

    return mainData;
}

function displayData({ temp, icon, condition, city, country, currentTime }) {
    const temperatureSpan = document.querySelector('#temperature');
    const citySpan = document.querySelector('#city');
    const countrySpan = document.querySelector('#country');
    const conditionIcon = document.querySelector('#conditionIcon');
    const conditionText = document.querySelector('#conditionText');
    const greetingDiv = document.querySelector('#greeting');
    const mainInfoContainer = document.querySelector('#mainInfoContainer');

    temperatureSpan.innerHTML = temp;
    conditionIcon.src = icon;
    conditionText.innerHTML = condition;
    citySpan.innerHTML = city;
    countrySpan.innerHTML = country;
    greetingDiv.innerHTML = generateGreeting(currentTime);

    mainInfoContainer.classList.remove('opacity-0');
}

function generateGreeting(time) {
    const hours = time.split(' ')[1].split(':')[0];

    if (hours < 12) {
        return `
            <i class="fa-solid fa-mug-saucer text-2xl"></i>
            <span>good morning, it's currently</span>
            `;
    } else if (hours < 18) {
        return `
            <i class="fa-solid fa-sun text-2xl"></i>
            <span>good afternoon, it's currently</span>
            `;
    } else {
        return `
            <i class="fa-solid fa-moon text-2xl"></i>
            <span>good evening, it's currently</span>
            `;
    }
}
