/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./src/**/*.{js,jsx,ts,tsx}'
	],
	theme: {
		extend: {
			backgroundColor: {
				'custom-dark': 'rgb(19, 22, 39)'
			},
			fontFamily: {
				'outfit': ['Outfit', 'sans-serif']
			},
		},
	},
	plugins: [],
}