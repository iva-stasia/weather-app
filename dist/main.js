(()=>{"use strict";const e="https://api.weatherapi.com/v1/search.json?key=5d1433c0927249158fb111723230504&q=",{location:t}=document;let n=-1;function o(e){e.forEach((e=>e.classList.remove("bg-[#505050]"))),e[n].classList.add("bg-[#505050]")}function c(e){const t=e.split(" ")[1].split(":")[0];return t<12?'\n            <i class="fa-solid fa-mug-saucer text-2xl"></i>\n            <span>good morning, it\'s currently</span>\n            ':t<18?'\n            <i class="fa-solid fa-sun text-2xl"></i>\n            <span>good afternoon, it\'s currently</span>\n            ':'\n            <i class="fa-solid fa-moon text-2xl"></i>\n            <span>good evening, it\'s currently</span>\n            '}const i="https://api.weatherapi.com/v1/forecast.json?key=5d1433c0927249158fb111723230504&q=",s=document.querySelector("#findCityBtn"),r=document.querySelector("#moreBtn"),a=document.querySelector("#closeForecastModalBtn");function l(e){fetch(e).then((e=>e.json())).then((e=>{!function(e){const t=document.querySelector("#mainSection"),n=e.current.condition.text.toLowerCase(),o={condition:"",time:e.current.is_day?"day":"night"};[{sunny:/sunny/},{clear:/clear/},{cloudy:/cloudy|overcast/},{rain:/rain|thundery outbreaks|drizzle/},{snow:/snow|sleet|blizzard|ice pellets/},{fog:/mist|fog/}].forEach((e=>{Object.values(e)[0].test(n)&&([o.condition]=Object.keys(e))})),t.style.backgroundImage=`url('./src/assets/images/${o.time}/${o.condition}.jpg')`}(e),function(e){const t=function(e){return{temp:Math.round(e.current.temp_c),icon:e.current.condition.icon,condition:e.current.condition.text,city:e.location.name,country:e.location.country,greeting:c(e.location.localtime)}}(e),n=document.querySelector("#temperature"),o=document.querySelector("#city"),i=document.querySelector("#country"),s=document.querySelector("#conditionIcon"),r=document.querySelector("#conditionText"),a=document.querySelector("#greeting"),l=document.querySelector("#mainInfoContainer");n.innerHTML=t.temp,s.src=t.icon,r.innerHTML=t.condition,o.innerHTML=t.city,i.innerHTML=t.country,a.innerHTML=t.greeting,l.classList.remove("opacity-0")}(e),function(e){const t=function(e){const t=[];return e.forEach((e=>{t.push({day:new Date(e.date).toLocaleDateString("en-US",{weekday:"short"}),date:new Date(e.date).getDate(),maxtemp:Math.round(e.day.maxtemp_c),mintemp:Math.round(e.day.mintemp_c),condition:e.day.condition.text,icon:e.day.condition.icon})})),t}(e),n=document.querySelector("#forecastDailyContainer");n.innerHTML="",t.forEach((({day:e,date:t,maxtemp:o,mintemp:c,condition:i,icon:s})=>{n.insertAdjacentHTML("beforeend",`\n            <div class="grid grid-cols-4 items-start">\n                <p class="text-2xl font-bold">${e}<br>${t}</p>\n                <img src="${s}" alt="" class="w-max" />\n                <p class="">\n                    <span class="text-2xl">\n                        <span>${o}</span><span>&#176;</span>\n                    </span>\n                    <span class="text-base">\n                        <span>${c}</span><span>&#176;</span>\n                    </span>\n                </p>\n                <p class="text-base pl-2">${i}</p>\n            </div>\n        `)}))}(e.forecast.forecastday),function({sunrise:e,sunset:t}){const n=document.querySelector("#sunrise"),o=document.querySelector("#sunset");n.innerHTML=e,o.innerHTML=t}(e.forecast.forecastday[0].astro)})).catch((e=>{console.log(e),alert("Ops, something's wrong. Please try again!")}))}function d(){const c=document.querySelector("#modalCity"),s=document.querySelector("#selectedCity"),r=document.querySelector("#showWeatherBtn");var a;c.classList.add("visible","opacity-100"),function(c){const i=document.querySelector("#autocompleteContainer");c.addEventListener("input",(()=>{const{value:o}=c;n=-1,o.length?function(n,o){fetch(e+n).then((e=>e.json())).then((e=>{!function(e,t){t.innerHTML="",e.forEach((({city:e,region:n,country:o})=>{t.insertAdjacentHTML("beforeend",`\n            <li class="p-4 hover:bg-[#505050] hover:cursor-pointer" data-city="${e}">\n                ${e}, ${n}, ${o}\n            </li>\n        `)}))}(e.map((e=>({city:e.name,region:e.region,country:e.country}))),o)})).catch((e=>{console.log(`Ops! \n${e}`),alert("Oops, something's wrong. Please try again!"),t.reload()}))}(o,i):i.innerHTML=""})),i.addEventListener("click",(e=>function(e,t,n){const o=t,c=n;e.target.dataset.city&&(o.value=e.target.dataset.city,c.innerHTML="")}(e,c,i))),c.addEventListener("keyup",(e=>function(e,t,c){const i=document.querySelectorAll("li"),s=document.querySelectorAll("li").length,r=t,a=c;s&&(40===e.keyCode&&n<s-1?(n+=1,o(i)):38===e.keyCode&&n>0?(n-=1,o(i)):13===e.keyCode&&-1!==n&&(a.innerHTML=""),-1!==n&&(r.value=i[n].dataset.city))}(e,c,i)))}(s),r.addEventListener("click",(()=>{s.value&&(c.classList.remove("visible","opacity-100"),l(`${i+s.value}&days=7`),s.value="")})),(a=c).classList.contains("visible")&&(document.addEventListener("click",(e=>{e.target.classList.contains("modal")&&a.classList.remove("visible","opacity-100")})),document.addEventListener("keydown",(e=>{27===e.keyCode&&a.classList.remove("visible","opacity-100")})))}function u(){const e=document.querySelector("#forecastSection");e.classList.toggle("lg:-right-96"),e.classList.toggle("-right-full"),e.classList.toggle("right-0"),document.querySelector("#mainSection").classList.toggle("lg:mr-96"),document.querySelector("#moreBtnArrow").classList.toggle("rotate-180")}navigator.geolocation.getCurrentPosition((e=>{l(`${i+e.coords.latitude},${e.coords.longitude}&days=7`)}),(e=>{console.log(e),d()})),s.addEventListener("click",d),r.addEventListener("click",u),a.addEventListener("click",u)})();