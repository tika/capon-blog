import typography from '@tailwindcss/typography';
import type { Config } from 'tailwindcss';
import { withUt } from 'uploadthing/tw';

export default withUt({
	content: ['./src/**/*.{html,js,svelte,ts,tsx,mdx}'],

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
}) satisfies Config;
