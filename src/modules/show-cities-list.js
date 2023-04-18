const URL_SEARCH =
  'https://api.weatherapi.com/v1/search.json?key=5d1433c0927249158fb111723230504&q=';
const { location } = document;

let currentFocus = -1;

function addActive(cities) {
  cities.forEach((li) => li.classList.remove('bg-[#505050]'));
  cities[currentFocus].classList.add('bg-[#505050]');
}

function handleKeyup(e, input, container) {
  const cities = document.querySelectorAll('li');
  const citiesNum = document.querySelectorAll('li').length;
  const inputField = input;
  const listContainer = container;

  if (!citiesNum) {
    return;
  }

  if (e.keyCode === 40 && currentFocus < citiesNum - 1) {
    currentFocus += 1;
    addActive(cities, currentFocus);
  } else if (e.keyCode === 38 && currentFocus > 0) {
    currentFocus -= 1;
    addActive(cities, currentFocus);
  } else if (e.keyCode === 13 && currentFocus !== -1) {
    listContainer.innerHTML = '';
  }

  if (currentFocus !== -1) {
    inputField.value = cities[currentFocus].dataset.city;
  }
}

function handleClick(e, input, container) {
  const inputField = input;
  const listContainer = container;

  if (e.target.dataset.city) {
    inputField.value = e.target.dataset.city;
    listContainer.innerHTML = '';
  }
}

function displayCitiesList(list, container) {
  const listContainer = container;

  listContainer.innerHTML = '';

  list.forEach(({ city, region, country }) => {
    container.insertAdjacentHTML(
      'beforeend',
      `
            <li class="p-4 hover:bg-[#505050] hover:cursor-pointer" data-city="${city}">
                ${city}, ${region}, ${country}
            </li>
        `
    );
  });
}

function createCitiesList(value, container) {
  fetch(URL_SEARCH + value)
    .then((response) => response.json())
    .then((data) => {
      const citiesList = data.map((obj) => ({
        city: obj.name,
        region: obj.region,
        country: obj.country,
      }));

      displayCitiesList(citiesList, container);
    })
    .catch((error) => {
      console.log(`Ops! \n${error}`);
      alert("Oops, something's wrong. Please try again!");
      location.reload();
    });
}

export default function showAvailableCities(input) {
  const listContainer = document.querySelector('#autocompleteContainer');

  input.addEventListener('input', () => {
    const { value } = input;

    currentFocus = -1;

    if (!value.length) {
      listContainer.innerHTML = '';
      return;
    }

    createCitiesList(value, listContainer);
  });

  listContainer.addEventListener('click', (e) =>
    handleClick(e, input, listContainer)
  );

  input.addEventListener('keyup', (e) => handleKeyup(e, input, listContainer));
}
