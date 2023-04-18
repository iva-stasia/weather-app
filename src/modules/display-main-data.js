function generateGreeting(time) {
  const hours = time.split(' ')[1].split(':')[0];

  if (hours < 12) {
    return `
            <i class="fa-solid fa-mug-saucer text-2xl"></i>
            <span>good morning, it's currently</span>
            `;
  }
  if (hours < 18) {
    return `
            <i class="fa-solid fa-sun text-2xl"></i>
            <span>good afternoon, it's currently</span>
            `;
  }
  return `
            <i class="fa-solid fa-moon text-2xl"></i>
            <span>good evening, it's currently</span>
            `;
}

function createMainDataObj(data) {
  return {
    temp: Math.round(data.current.temp_c),
    icon: data.current.condition.icon,
    condition: data.current.condition.text,
    city: data.location.name,
    country: data.location.country,
    greeting: generateGreeting(data.location.localtime),
  };
}

export default function displayMainData(data) {
  const mainData = createMainDataObj(data);

  const temperatureSpan = document.querySelector('#temperature');
  const citySpan = document.querySelector('#city');
  const countrySpan = document.querySelector('#country');
  const conditionIcon = document.querySelector('#conditionIcon');
  const conditionText = document.querySelector('#conditionText');
  const greetingDiv = document.querySelector('#greeting');
  const mainInfoContainer = document.querySelector('#mainInfoContainer');

  temperatureSpan.innerHTML = mainData.temp;
  conditionIcon.src = mainData.icon;
  conditionText.innerHTML = mainData.condition;
  citySpan.innerHTML = mainData.city;
  countrySpan.innerHTML = mainData.country;
  greetingDiv.innerHTML = mainData.greeting;

  mainInfoContainer.classList.remove('opacity-0');
}
