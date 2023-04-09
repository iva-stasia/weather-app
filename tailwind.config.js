/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{html,js}'],
    theme: {
        extend: {
            fontSize: {
                '10xl': ['12rem', '1'],
                'fluid-b': ['clamp(4rem, calc(2.31rem + 8vw), 20rem)', '1'],
                'fluid-s': ['clamp(1.5rem, calc(1rem + 1vw), 2.93rem)', '1'],
                'fluid-xs': ['clamp(1rem, calc(1rem + 0.3vw), 2.93rem)', '1'],
            },
            width: {
                fluid: 'calc(100% - 12vw)',
            },
            spacing: {
                '0.1em': '0.1em',
                '0.25em': '0.25em',
                '0.5em': '0.5em',
                '1em': '1em',
                '2em': '2em',
            },
        },
        fontFamily: {
            body: ['Inter', 'sans-serif'],
        },
    },
    plugins: [require('daisyui')],
    daisyui: {
        themes: [
            {
                light: {
                    'color-scheme': 'light',
                    primary: '#570df8',
                    'primary-content': '#f3f3f3',
                    secondary: '#f000b8',
                    'secondary-content': '#f3f3f3',
                    accent: '#37cdbe',
                    'accent-content': '#163835',
                    neutral: '#f3f3f3',
                    'neutral-content': '#303030',
                    'base-100': '#303030',
                    'base-200': '#F2F2F2',
                    'base-300': '#E5E6E6',
                    'base-content': '#f3f3f3',
                },
            },
        ],
    },
};
