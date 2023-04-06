/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{html,js}'],
    theme: {
        extend: {
            fontSize: {
                '10xl': ['12rem', '1'],
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
            'dark',
        ],
    },
};
