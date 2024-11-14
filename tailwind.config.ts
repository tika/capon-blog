import type { Config } from 'tailwindcss';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			fontFamily: {
				zodiak: ['Zodiak-Variable']
			}
		}
	},

	plugins: [],
	darkMode: 'class'
} satisfies Config;
