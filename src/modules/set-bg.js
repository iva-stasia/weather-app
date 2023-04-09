export function setBg(data) {
    const mainSection = document.querySelector('#mainSection');
    const condition = data.current.condition.text.toLowerCase();

    const conditions = [
        { sunny: /sunny/ },
        { clear: /clear/ },
        { cloudy: /cloudy|overcast/ },
        { rain: /rain|thundery outbreaks|drizzle/ },
        { snow: /snow|sleet|blizzard|ice pellets/ },
        { fog: /mist|fog/ },
    ];

    const current = {
        condition: '',
        time: data.current.is_day ? 'day' : 'night',
    };

    conditions.forEach((item) => {
        if (Object.values(item)[0].test(condition)) {
            current.condition = Object.keys(item)[0];
        }
    });

    mainSection.style.backgroundImage = `url('./src/assets/images/${current.time}/${current.condition}.jpg')`;
}
