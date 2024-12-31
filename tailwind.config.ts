import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
const config = {
	content: [
		'./src/**/*.{html,js,svelte,ts,tsx,mdx}',
		'./node_modules/@uploadthing/svelte/dist**' // <-- add this lin
	],

	theme: {
		extend: {
			fontFamily: {
				amulya: ['Amulya-Variable'],
				panchang: ['Panchang-Variable']
			}
		}
	},

	plugins: [typography],
	darkMode: 'class'
};

export default config;
