export function displayDailyForecast(data) {
    const forecastDailyData = createForecastDataObj(data);
    const forecastDailyContainer = document.querySelector(
        '#forecastDailyContainer'
    );

    forecastDailyContainer.innerHTML = '';

    forecastDailyData.forEach(
        ({ day, date, maxtemp, mintemp, condition, icon }) => {
            forecastDailyContainer.insertAdjacentHTML(
                'beforeend',
                `
            <div class="grid grid-cols-4 items-start">
                <p class="text-2xl font-bold">${day}<br>${date}</p>
                <img src="${icon}" alt="" class="w-max" />
                <p class="">
                    <span class="text-2xl">
                        <span>${maxtemp}</span><span>&#176;</span>
                    </span>
                    <span class="text-base">
                        <span>${mintemp}</span><span>&#176;</span>
                    </span>
                </p>
                <p class="text-base pl-2">${condition}</p>
            </div>
        `
            );
        }
    );
}

function createForecastDataObj(data) {
    const forecastDailyData = [];

    data.forEach((day) => {
        forecastDailyData.push({
            day: new Date(day.date).toLocaleDateString('en-US', {
                weekday: 'short',
            }),
            date: new Date(day.date).getDate(),
            maxtemp: Math.round(day.day.maxtemp_c),
            mintemp: Math.round(day.day.mintemp_c),
            condition: day.day.condition.text,
            icon: day.day.condition.icon,
        });
    });

    return forecastDailyData;
}
