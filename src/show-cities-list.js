export function showAvailableCities(input) {
    const listContainer = document.querySelector('#autocompleteContainer');

    input.addEventListener('input', () => {
        const value = input.value;

        if (!value.length) {
            listContainer.innerHTML = '';
            return;
        }

        createCitiesList(value, listContainer);
    });

    listContainer.addEventListener('click', (e) =>
        handleClick(e, input, listContainer)
    );

    handleKeyup(input, listContainer);
}

function handleKeyup(input, container) {
    let currentFocus = -1;

    input.addEventListener('keyup', (e) => {
        const cities = document.querySelectorAll('li');
        const citiesNum = document.querySelectorAll('li').length;

        if (!citiesNum) {
            return;
        }

        if (e.keyCode == 40 && currentFocus < citiesNum - 1) {
            currentFocus++;
            addActive(cities, currentFocus);
        } else if (e.keyCode == 38 && currentFocus > 0) {
            currentFocus--;
            addActive(cities, currentFocus);
        } else if (e.keyCode == 13 && currentFocus != -1) {
            container.innerHTML = '';
        }

        if (currentFocus != -1) {
            input.value = cities[currentFocus].dataset.city;
        }
    });
}

function addActive(cities, currentFocus) {
    cities.forEach((li) => li.classList.remove('bg-[#505050]'));
    cities[currentFocus].classList.add('bg-[#505050]');
}

function handleClick(e, input, container) {
    if (e.target.dataset.city) {
        input.value = e.target.dataset.city;
        container.innerHTML = '';
    }
}

function createCitiesList(value, container) {
    fetch(
        `http://api.weatherapi.com/v1/search.json?key=5d1433c0927249158fb111723230504&q=${value}`
    )
        .then((response) => response.json())
        .then((data) => {
            const citiesList = data.map((obj) => {
                return {
                    city: obj.name,
                    region: obj.region,
                    country: obj.country,
                };
            });

            displayCitiesList(citiesList, container);
        })
        .catch((error) => {
            console.log('Ops! \n' + error);
            alert("Oops, something's wrong. Please try again!");
            location.reload();
        });
}

function displayCitiesList(list, container) {
    container.innerHTML = '';

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
