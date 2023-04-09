export function displayAstroData({ sunrise, sunset, moonrise, moonset }) {
    const astroData = createAstroDataObj(sunrise, sunset, moonrise, moonset);
    const sunriseSpan = document.querySelector('#sunrise');
    const sunsetSpan = document.querySelector('#sunset');

    sunriseSpan.innerHTML = sunrise;
    sunsetSpan.innerHTML = sunset;
}

function createAstroDataObj(sunrise, sunset, moonrise, moonset) {
    return {
        sunrise,
        sunset,
    };
}
