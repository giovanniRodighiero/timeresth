const defaultColors = require('tailwindcss/colors');
const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.jsx"],
    theme: {
        extend: {
            colors: {
                dark: defaultColors.neutral[800],
                main: '#E76F51',
                white: defaultColors.slate[50]
            },
            fontFamily: {
                serif: ['Bebas Neue', defaultTheme.fontFamily.serif],
                sans: ['Oswald', defaultTheme.fontFamily.sans],
                display: ['Bebas Neue', 'cursive']
            }
        },
    },
    plugins: [],
}
