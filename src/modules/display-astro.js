export default function displayAstroData({ sunrise, sunset }) {
  const sunriseSpan = document.querySelector('#sunrise');
  const sunsetSpan = document.querySelector('#sunset');

  sunriseSpan.innerHTML = sunrise;
  sunsetSpan.innerHTML = sunset;
}
